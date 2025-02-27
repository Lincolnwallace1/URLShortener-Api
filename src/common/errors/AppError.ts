interface IAppErrorOptions {
  name?: string;
  statusCode: number;
  errorCode?: string;
  data?: object;
}

class AppError {
  public readonly name?: string;

  public readonly statusCode: number;

  public readonly errorCode?: string;

  public readonly data?: object;

  constructor(data: IAppErrorOptions) {
    this.name = data.name;
    this.statusCode = data.statusCode;
    this.errorCode = data.errorCode;
    this.data = data.data;
  }
}

export default AppError;
