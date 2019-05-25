import math from 'mathjs';

export interface ICalculatorConstructorParameters {
  purchasePrice?: number;
  salesTaxPercentage?: number;
  interestRate?: number;
  downPayment?: number;
}

export class Calculator {
  public readonly purchasePrice: number = 0;
  public readonly salesTaxPercentage: number = 0;
  public readonly interestRate: number = 0;

  public downPayment: number = 0;

  constructor({
    purchasePrice,
    salesTaxPercentage,
    interestRate,
    downPayment,
  }: ICalculatorConstructorParameters) {
    this.purchasePrice = purchasePrice || 0;
    this.salesTaxPercentage = salesTaxPercentage || 0;
    this.interestRate = interestRate || 0;
    this.downPayment = downPayment || 0;
  }

  public calculateSalesTaxTotal(): number {
    // Sales Tax Total is (PurchasePrice * the decimal conversion of sales tax percentage)
    return math.multiply(this.purchasePrice, math.divide(this.salesTaxPercentage, 100));
  }

  public calculateDownPayment(): number {
    return math.multiply(this.purchasePrice, 0.2);
  }

  public calculateMonthlyPayment(): number {
    // =(( Total Price - Down Payment) * Monthly Interest Rate * (1 + Monthly Interest  Rate)^ Term) / ((1 + Monthly Interest Rate)^Term - 1)
    const amountToBorrow = math.subtract(this.purchasePrice, this.downPayment);

    console.log(`${this.purchasePrice} - ${this.downPayment} =`, amountToBorrow);

    return 0;
  }

  public calculateMonthlyInterestRate(): number {
    return 0;
  }
}
