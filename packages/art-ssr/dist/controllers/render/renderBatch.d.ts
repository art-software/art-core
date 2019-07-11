import { ServerConfig } from '../../RenderServer';
import { Request, Response } from 'express';
export declare const renderBatch: (config: ServerConfig, isClosing: () => boolean) => (req: Request, res: Response) => Promise<void>;
