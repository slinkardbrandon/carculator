import math from 'mathjs';

export interface ICalculatorConstructorParameters {
  purchasePrice?: number;
  salesTaxPercentage?: number;
  annualInterestRate?: number;
  downPayment?: number;
  loanTerm?: number;
}

export class Calculator {
  public readonly purchasePrice: number = 0;
  public readonly salesTaxPercentage: number = 0;
  public readonly annualInterestRate: number = 0;
  public readonly loanTerm: number = 0;

  public downPayment: number = 0;

  constructor({
    purchasePrice,
    salesTaxPercentage,
    annualInterestRate,
    downPayment,
    loanTerm,
  }: ICalculatorConstructorParameters) {
    this.purchasePrice = purchasePrice || 0;
    this.salesTaxPercentage = salesTaxPercentage || 0;
    this.annualInterestRate = annualInterestRate || 0;
    this.downPayment = downPayment || 0;
    this.loanTerm = loanTerm || 60;
  }

  public calculateSalesTaxTotal(): number {
    // Sales Tax Total is (PurchasePrice * the decimal conversion of sales tax percentage)
    return this.cleanJSNumericalInaccuracies(
      math.multiply(this.purchasePrice, math.divide(this.salesTaxPercentage, 100))
    );
  }

  public calculateDownPayment(): number {
    return this.cleanJSNumericalInaccuracies(math.multiply(this.purchasePrice, 0.2));
  }

  public calculateMonthlyPayment(): number {
    const amountToBorrow = math.subtract(this.purchasePrice, this.downPayment) as number;
    const monthlyInterestRateDecimal = math.divide(this.calculateMonthlyInterestRate(), 100);

    return math.multiply(
      amountToBorrow,
      math.divide(
        math.multiply(
          monthlyInterestRateDecimal,
          math.pow(math.add(1, monthlyInterestRateDecimal), this.loanTerm)
        ) as number,
        math.subtract(math.pow(math.add(1, monthlyInterestRateDecimal), this.loanTerm), 1) as number
      )
    );
  }

  public calculateMonthlyInterestRate(): number {
    return this.cleanJSNumericalInaccuracies(math.divide(this.annualInterestRate, 12));
  }

  private cleanJSNumericalInaccuracies(
    value: number,
    precision: number = 3,
    decimalsToPreserve: number = 2
  ): number {
    return math.round(
      math.number(math.format(value, { precision })) as number,
      decimalsToPreserve
    ) as number;
  }
}
