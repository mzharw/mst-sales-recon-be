export class SalesException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SalesException';
  }
}