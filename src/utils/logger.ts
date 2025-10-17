/**
 * نظام تسجيل الأحداث (Logger)
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, data?: any): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };

    // في بيئة التطوير، اطبع في Console
    if (this.isDevelopment) {
      const style = this.getConsoleStyle(level);
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        `%c[${level.toUpperCase()}] ${message}`,
        style,
        data || ''
      );
    }

    // في الإنتاج، يمكن إرسال اللوج إلى خدمة خارجية
    if (!this.isDevelopment && level === 'error') {
      this.sendToMonitoring(entry);
    }
  }

  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      info: 'color: #17A2B8; font-weight: bold;',
      warn: 'color: #FFC107; font-weight: bold;',
      error: 'color: #DC3545; font-weight: bold;',
      debug: 'color: #6c757d; font-weight: bold;',
    };
    return styles[level];
  }

  private sendToMonitoring(entry: LogEntry): void {
    // TODO: دمج مع خدمة مثل Sentry أو LogRocket
    // يمكن إضافة هذا في Layer 5
  }

  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: any): void {
    this.log('error', message, data);
  }

  debug(message: string, data?: any): void {
    this.log('debug', message, data);
  }
}

export const logger = new Logger();