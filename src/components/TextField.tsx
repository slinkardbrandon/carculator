import React from "react";
import { TextField as MuiTextField, InputAdornment } from "@material-ui/core";

interface ITextFieldProps {
  label: string;
  value: string | number;
  endAdornment?: string;
  startAdornment?: string;
  onChange: (e: any) => void;
  type?: "text" | "number";
  helperText?: string;
}

export const TextField = ({
  label,
  value,
  endAdornment,
  startAdornment,
  onChange,
  type,
  helperText
}: ITextFieldProps) => {
  return (
    <MuiTextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      variant="outlined"
      type={type}
      helperText={helperText}
      InputProps={{
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : (
          undefined
        ),
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : (
          undefined
        )
      }}
    />
  );
};
