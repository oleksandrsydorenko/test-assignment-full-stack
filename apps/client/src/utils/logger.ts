/* eslint-disable no-console */
interface ILogger {
  (...args: any[]): void;
}

export const error: ILogger = (...args) => console.error(...args);
export const info: ILogger = (...args) => console.log(...args);
