import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Select } from '../components/Select';
import { TextField } from '../components/TextField';
import { Calculator } from '../Calculator';

export const Home = () => {
  const [modifiedDownPayment, setModifiedDownPayment] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState();
  const [downPayment, setDownPayment] = useState();
  const [salesTaxPercentage, setSalesTax] = useState(7);
  const [annualInterestRate, setAnnualInterestRate] = useState(5.14);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyExpenseCost, setMonthlyExpenseCost] = useState();
  const [salesTaxTotal, setSalesTaxTotal] = useState(0);
  const [cashDownTotal, setCashDownTotal] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculator = new Calculator({
    purchasePrice,
    salesTaxPercentage,
    downPayment,
    annualInterestRate,
    loanTerm,
    monthlyExpenseCost,
  });

  useEffect(() => {
    setSalesTaxTotal(calculator.calculateSalesTaxTotal());
  }, [purchasePrice, salesTaxPercentage]);

  useEffect(() => {
    if (!modifiedDownPayment) {
      setDownPayment(calculator.calculateDownPayment());
    }
  }, [purchasePrice]);

  useEffect(() => {
    if (downPayment !== undefined) {
      setCashDownTotal((salesTaxTotal || 0) + (parseFloat(downPayment.toFixed(2)) || 0));
    }
  }, [downPayment, salesTaxTotal]);

  // Where the magic happens
  useEffect(() => {
    setMonthlyPayment(calculator.calculateMonthlyPayment());
  }, [
    purchasePrice,
    downPayment,
    salesTaxPercentage,
    annualInterestRate,
    loanTerm,
    monthlyExpenseCost,
  ]);

  const handlePurchasePriceChange = (e: any) => setPurchasePrice(Number(e.target.value));
  const handleDownPaymentChange = (e: any) => {
    if (!modifiedDownPayment) {
      setModifiedDownPayment(true);
    }
    setDownPayment(Number(e.target.value));
  };
  const handleSalesTaxChange = (e: any) => setSalesTax(Number(e.target.value));
  const handleInterestRateChange = (e: any) => setAnnualInterestRate(Number(e.target.value));
  const handleLoanTermChange = (e: any) => setLoanTerm(Number(e.target.value));
  const handleMonthlyExpenseCostChange = (e: any) => setMonthlyExpenseCost(Number(e.target.value));

  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" role="h1" className={classes.title}>
        Calculate estimated costs for purchasing your vehicle
      </Typography>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.container}>
            <form className={classes.form} autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    startAdornment="$"
                    label="Purchase Price"
                    value={purchasePrice !== undefined ? purchasePrice : ''}
                    onChange={handlePurchasePriceChange}
                    type="number"
                    helperText={
                      !modifiedDownPayment
                        ? 'The down payment will be calculated at 20% of purchase price unless the input is modified'
                        : undefined
                    }
                  />

                  <TextField
                    startAdornment="$"
                    label="Down Payment"
                    value={downPayment !== undefined ? downPayment : ''}
                    onChange={handleDownPaymentChange}
                    type="number"
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Sales Tax Rate"
                        value={salesTaxPercentage}
                        onChange={handleSalesTaxChange}
                        type="number"
                        endAdornment="%"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        startAdornment="$"
                        disabled
                        label="Sales Tax Total"
                        value={salesTaxTotal}
                        type="number"
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Interest Rate"
                    value={annualInterestRate}
                    onChange={handleInterestRateChange}
                    type="number"
                    endAdornment="%"
                  />

                  <Select
                    options={[
                      { value: 24, text: '2 Years' },
                      { value: 36, text: '3 Years' },
                      { value: 48, text: '4 Years' },
                      { value: 60, text: '5 Years' },
                      { value: 72, text: '6 Years' },
                    ]}
                    onChange={handleLoanTermChange}
                    value={loanTerm}
                  />

                  <TextField
                    startAdornment="$"
                    label="Other monthly expenses"
                    value={monthlyExpenseCost !== undefined ? monthlyExpenseCost : ''}
                    onChange={handleMonthlyExpenseCostChange}
                    type="number"
                    helperText="Any additional monthly costs such as insurance, maintenance, etc"
                  />
                </Grid>
              </Grid>

              <Grid container className={`${classes.container} ${classes.calculations}`}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Cash Needed</Typography>
                  <Typography variant="h4">$ {cashDownTotal.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Monthly Payment</Typography>
                  <Typography variant="h4" style={{ animation: 'spinit 0.2s 5' }}>
                    $ {monthlyPayment.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
  calculations: {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  salesTaxTotal: {
    marginLeft: theme.spacing(2),
  },
}));
