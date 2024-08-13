export class SalesCode {
  private static readonly CODE_PATTERN = /^\d{6}-\d{4}$/; // YYYYMM-XXXX

  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid sales code format');
    }
  }

  static generate(date: Date, salesCount: number): SalesCode {
    const yearMonth = new Date(date).toISOString().slice(0, 7).replace('-', ''); // Format as YYYYMM
    const incrementedNumber = (salesCount + 1).toString().padStart(4, '0'); // Increment and pad with zeros
    const code = `${yearMonth}-${incrementedNumber}`;
    return new SalesCode(code);
  }

  private isValid(code: string): boolean {
    return SalesCode.CODE_PATTERN.test(code);
  }

  toString(): string {
    return this.value;
  }
}
