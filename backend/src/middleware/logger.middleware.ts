import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      const user = req.user ? `User: ${req.user.email}` : 'Unauthenticated';

      this.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms - ${user}`);
    });

    next();
  }
}
