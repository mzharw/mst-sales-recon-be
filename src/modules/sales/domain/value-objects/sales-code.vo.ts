export class SalesCode {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid sales code format');
    }
  }

  private isValid(code: string): boolean {
    return /^[A-Z]{2}\d{6}$/.test(code);
  }

  toString(): string {
    return this.value;
  }
}