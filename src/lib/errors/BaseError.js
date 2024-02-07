export class BaseError extends Error {
  constructor(message, status = 400, data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
