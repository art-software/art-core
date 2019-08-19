import os from 'os';
import cluster from 'cluster';
import Logger from './utils/Logger';
import { raceTo } from './utils/lifecycle';
import { Termination } from './enums/Signals';

export default class Coordinator {
  protected getWorkerCount() {
    const logicCpus = os.cpus().length;
    const workersCount = logicCpus - 1;

    return workersCount;
  }

  private workersReady(workerCount: number): boolean {
    const workers = Object.values(cluster.workers);

    return workers.length === workerCount && workers.every((worker) => {
      return worker && (worker as any).isReady;
    });
  }

  protected close() {
    return Promise.all(
      Object.values(cluster.workers).map((worker) => {
        const promise = new Promise((resolve, reject) => {
          if (!worker) { reject(); return; }
          worker.once('disconnect', resolve);
          worker.on('exit', (code) => {
            if (code !== 0) { reject(); }
          });

          if (worker) { worker.send('kill'); }

          return promise;
        });
      })
    );
  }

  protected kill(signal: string) {
    const liveWorkers = Object.values(cluster.workers)
      .filter((worker: cluster.Worker) => {
        return !worker.isDead();
      });

    if (liveWorkers.length > 0) {
      Logger.info(`Coordinator killing ${liveWorkers.length} live workers with ${signal}`);

      return Promise.all(
        liveWorkers.map((worker: cluster.Worker) => {
          const promise = new Promise((resolve) => {
            worker.once('exit', () => { resolve(); });
          });

          worker.process.kill(signal);
          return promise;
        })
      );
    }

    return Promise.resolve();
  }

  protected killSequence(signal: string) {
    return () => {
      return raceTo(this.kill(signal), 2000, `Killing workers with ${signal} took too long`);
    };
  }

  protected shutdown() {
    return raceTo(this.close(), 5000, 'Closing the coordinator took too long.')
      .then(this.killSequence(Termination.SIGTERM), this.killSequence(Termination.SIGTERM))
      .then(this.killSequence(Termination.SIGKILL), this.killSequence(Termination.SIGKILL));
  }

  public start() {
    const workersCount = this.getWorkerCount();
    let isClosing = false;

    const onWorkerMessage = (msg: any) => {
      if (msg.ready) {
        // @ts-ignore
        cluster.workers[msg.workerId].isReady = true;
      }
      if (this.workersReady(workersCount)) {
        Object.values(cluster.workers).forEach((worker) => {
          return worker && worker.send('healthy');
        });
      }
    };

    cluster.on('online', (worker) => {
      Logger.info(`Worker #${worker.id} is now online`);
    });

    cluster.on('listening', (worker, address) => {
      Logger.info(`Worker #${worker.id} is now connected to ${address.address}:${address.port}`);
    });

    cluster.on('disconnect', (worker) => {
      Logger.info(`Worker #${worker.id} has disconnected`);
    });

    cluster.on('exit', (worker, code, signal) => {
      if (worker.exitedAfterDisconnect === true || code === 0) {
        Logger.info(`Worker #${worker.id} shutting down.`);
      } else if (isClosing) {
        Logger.error(
          `Worker #${worker.id} died with code ${signal || code} during close. Not restarting.`,
        );
      } else {
        // if worker died, re-fork a new one
        Logger.error(`Worker #${worker.id} died with code ${signal || code}. Restarting worker.`);
        const newWorker = cluster.fork();
        newWorker.on('message', onWorkerMessage);
      }
    });

    process.on(Termination.SIGTERM, () => {
      Logger.info('SSR render server got SIGTERM. Going down.');
      isClosing = true;
      this.shutdown()
        .then(() => {
          return process.exit(0), () => { return process.exit(1); };
        });
    });

    process.on(Termination.SIGINT, () => {
      isClosing = true;
      this.shutdown()
        .then(() => {
          return process.exit(0), () => { return process.exit(1); };
        });
    });

    // fork workers
    Array.from(
      { length: workersCount },
      () => {
        return cluster.fork();
      }
    );

    Object.values(cluster.workers)
      .forEach((worker: cluster.Worker) => {
        worker.on('message', onWorkerMessage);
      });
  }
}