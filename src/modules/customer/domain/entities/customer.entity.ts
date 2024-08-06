export class Customer {
  id: number;
  code: string;
  name: string;
  telp: string;

  constructor(code: string, name: string, telp: string) {
    this.code = code;
    this.name = name;
    this.telp = telp;
  }
}