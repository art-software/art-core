export declare class Coordinator {
    protected getWorkerCount(): number;
    private workersReady;
    protected close(): Promise<{}[]>;
    protected kill(signal: string): Promise<{}[]> | Promise<void>;
    protected killSequence(signal: string): () => Promise<any>;
    protected shutdown(): Promise<any>;
    start(): void;
}
