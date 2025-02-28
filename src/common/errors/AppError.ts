export class AppError extends Error {
  public readonly errorCode: string;
  public readonly statusCode: number;
  public readonly data?: object;

  constructor({
    name,
    errorCode,
    statusCode,
    data,
  }: {
    name: string;
    errorCode: string;
    statusCode: number;
    data?: object;
  }) {
    super(name);
    this.name = name;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.data = data;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
