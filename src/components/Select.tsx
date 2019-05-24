import {
  FormControl,
  InputLabel,
  NativeSelect,
  OutlinedInput
} from "@material-ui/core";
import React, { useEffect } from "react";

interface IOption {
  value: number | string;
  text: string;
}

interface ISelectProps {
  options: IOption[];
  value?: string | number;
  onChange: (e: any) => void;
}

export const Select = ({ options, value, onChange }: ISelectProps) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(
      inputLabel && inputLabel.current
        ? (inputLabel.current as any).offsetWidth
        : 0
    );
  }, []);

  return (
    <FormControl fullWidth variant="outlined" style={{ marginTop: "1em" }}>
      <InputLabel htmlFor="loan-term-helper" ref={inputLabel}>
        Loan Term
      </InputLabel>
      <NativeSelect
        fullWidth
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name="loan-term"
            id="loan-term-helper"
          />
        }
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
