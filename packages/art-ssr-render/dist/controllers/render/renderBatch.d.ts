import BatchRenderService from '../../services/BatchRenderService';
import { ServerConfig } from '../../RenderServer';
import { Request, Response } from 'express';
export declare const renderBatch: (config: ServerConfig, batchRenderService: BatchRenderService, isClosing: () => boolean) => (req: Request, res: Response) => Promise<void>;
