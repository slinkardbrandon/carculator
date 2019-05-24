import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Select } from "../components/Select";
import { TextField } from "../components/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: theme.spacing(2)
  },
  title: {
    paddingBottom: theme.spacing(1)
  },
  calculations: {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export const Home = (props: any) => {
  const classes = useStyles();
  const [modifiedDownPayment, setModifiedDownPayment] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState();
  const [downPayment, setDownPayment] = useState();
  const [salesTax, setSalesTax] = useState(0.07);
  const [interestRate, setInterestRate] = useState(5.14);
  const [loanTerm, setLoanTerm] = useState(60);
  const [insuranceCost, setInsuranceCost] = useState();

  const handlePurchasePriceChange = (e: any) => {
    if (!modifiedDownPayment) {
      setDownPayment((e.target.value / 100) * 20);
    }
    setPurchasePrice(e.target.value);
  };
  const handleDownPaymentChange = (e: any) => {
    if (!modifiedDownPayment) {
      setModifiedDownPayment(true);
    }
    setDownPayment(e.target.value);
  };
  const handleSalesTaxChange = (e: any) => setSalesTax(e.target.value);
  const handleInterestRateChange = (e: any) => setInterestRate(e.target.value);
  const handleLoanTermChange = (e: any) => setLoanTerm(e.target.value);
  const handleInsuranceCostChange = (e: any) =>
    setInsuranceCost(e.target.value);

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
          <Paper className={classes.container}>
            <form className={classes.form} autoComplete="off">
              <Typography variant="h5" className={classes.title}>
                Enter costs below to calculate an estimate for purchasing your
                vehicle
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Purchase Price"
                    value={purchasePrice}
                    onChange={handlePurchasePriceChange}
                    type="number"
                    helperText={
                      !modifiedDownPayment
                        ? "The down payment will be calculated at 20% of purchase price unless the input is modified"
                        : undefined
                    }
                  />

                  <TextField
                    label="Down Payment"
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    type="number"
                  />

                  <TextField
                    label="State Sales Tax Rate"
                    value={salesTax}
                    onChange={handleSalesTaxChange}
                    type="number"
                    endAdornment="%"
                  />

                  <TextField
                    label="Interest Rate"
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    type="number"
                    endAdornment="%"
                  />

                  <Select
                    options={[
                      { value: 24, text: "2 Years" },
                      { value: 36, text: "3 Years" },
                      { value: 48, text: "4 Years" },
                      { value: 60, text: "5 Years" },
                      { value: 72, text: "6 Years" }
                    ]}
                    onChange={handleLoanTermChange}
                    value={loanTerm}
                  />

                  <TextField
                    label="Monthly Insurance Cost"
                    value={insuranceCost}
                    onChange={handleInsuranceCostChange}
                    type="number"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                className={`${classes.container} ${classes.calculations}`}
              >
                <Grid item xs={6}>
                  <Typography variant="h6">Cash Down:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6"> Monthly Payment:</Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
