import math from 'mathjs';

export class Calculator {
  public readonly salesTaxTotal: number = 0;

  constructor(public purchasePrice: number = 0, public salesTaxPercentage: number = 0) {
    // Sales Tax Total is (PurchasePrice * the decimal conversion of sales tax percentage)
    this.salesTaxTotal = math.multiply(purchasePrice, math.divide(salesTaxPercentage, 100));
  }

  public calculateDownPayment(): number {
    return 0;
  }

  public calculateMonthlyPayment(): number {
    // =(( Total Price - Down Payment) * Monthly Interest Rate * (1 + Monthly Interest  Rate)^ Term) / ((1 + Monthly Interest Rate)^Term - 1)
    const amountToBorrow = math.subtract(this.purchasePrice, this.salesTaxPercentage);

    console.log(amountToBorrow);

    return 0;
  }
}
