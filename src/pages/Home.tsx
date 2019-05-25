import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Select } from '../components/Select';
import { TextField } from '../components/TextField';

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
    paddingLeft: theme.spacing(2),
  },
}));

export const Home = (props: any) => {
  const classes = useStyles();
  const [modifiedDownPayment, setModifiedDownPayment] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState();
  const [downPayment, setDownPayment] = useState();
  const [salesTaxPercentage, setSalesTax] = useState(7);
  const [interestRate, setInterestRate] = useState(5.14);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyExpenseCost, setMonthlyExpenseCost] = useState();

  const [salesTaxTotal, setSalesTaxTotal] = useState(0);
  const [cashDownTotal, setCashDownTotal] = useState(0);

  useEffect(() => {
    if (salesTaxPercentage) {
      const total = (purchasePrice || 0) * (salesTaxPercentage || 0);
      setSalesTaxTotal(total / 100);
    }
  }, [purchasePrice, salesTaxPercentage]);

  useEffect(() => {
    if (!modifiedDownPayment) {
      setDownPayment(((purchasePrice / 100) * 20).toFixed(2));
    }
  }, [purchasePrice]);

  useEffect(() => {
    setCashDownTotal((salesTaxTotal || 0) + (parseFloat(downPayment) || 0));
  }, [downPayment, salesTaxTotal]);

  const handlePurchasePriceChange = (e: any) => setPurchasePrice(e.target.value);
  const handleDownPaymentChange = (e: any) => {
    if (!modifiedDownPayment) {
      setModifiedDownPayment(true);
    }
    setDownPayment(e.target.value);
  };
  const handleSalesTaxChange = (e: any) => setSalesTax(e.target.value);
  const handleInterestRateChange = (e: any) => setInterestRate(e.target.value);
  const handleLoanTermChange = (e: any) => setLoanTerm(e.target.value);
  const handleMonthlyExpenseCostChange = (e: any) => setMonthlyExpenseCost(e.target.value);

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
                    value={purchasePrice}
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
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    type="number"
                  />

                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        label="Sales Tax Rate"
                        value={salesTaxPercentage}
                        onChange={handleSalesTaxChange}
                        type="number"
                        endAdornment="%"
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Interest Rate"
                    value={interestRate}
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
                    label="Other monthly expenses"
                    value={monthlyExpenseCost}
                    onChange={handleMonthlyExpenseCostChange}
                    type="number"
                    helperText="Any additional monthly costs such as insurance, maintenance, etc"
                  />
                </Grid>
              </Grid>

              <Grid container className={`${classes.container} ${classes.calculations}`}>
                <Grid item xs={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Cash Down</TableCell>
                        <TableCell>Monthly Payment</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>$ {cashDownTotal.toFixed(2)}</TableCell>
                        <TableCell>$ {cashDownTotal.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
