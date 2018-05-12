export class Ingredients {
  id: number;
  constructor(public name: string, public amount: number) {
    this.name = name;
    this.amount = amount;
    this.id = Date.now();
  }
}
