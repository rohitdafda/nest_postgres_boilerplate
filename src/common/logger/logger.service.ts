import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class AppLoggerService implements NestLoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, context?: string) {
    const ctx = context || this.context || 'Application';
    console.log(`[${ctx}] ${this.formatMessage(message)}`);
  }

  error(message: any, trace?: string, context?: string) {
    const ctx = context || this.context || 'Application';
    console.error(`[${ctx}] ${this.formatMessage(message)}`);
    if (trace) {
      console.error(`[${ctx}] Trace: ${trace}`);
    }
  }

  warn(message: any, context?: string) {
    const ctx = context || this.context || 'Application';
    console.warn(`[${ctx}] ${this.formatMessage(message)}`);
  }

  debug(message: any, context?: string) {
    const ctx = context || this.context || 'Application';
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${ctx}] ${this.formatMessage(message)}`);
    }
  }

  verbose(message: any, context?: string) {
    const ctx = context || this.context || 'Application';
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${ctx}] [VERBOSE] ${this.formatMessage(message)}`);
    }
  }

  private formatMessage(message: any): string {
    if (typeof message === 'object' && message !== null) {
      return JSON.stringify(message, null, 2);
    }
    return String(message);
  }
}
