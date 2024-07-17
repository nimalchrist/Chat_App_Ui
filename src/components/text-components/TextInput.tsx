import { TextField } from "@mui/material";
import React from "react";
import TextInputProps from "../../interface/TextInputProps";

// custom text input
const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
    />
  );
};

export default TextInput;
