import React from "react";
import "./Forms.css";
export default ({
  name,
  placeholder,
  value,
  valid,
  required,
  type,
  handleInputChange
}) => {
  const classes = [];
  if (!valid) classes.push("Form-Invalid");
  return (
    <input
      className={classes.join(" ")}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={handleInputChange}
    />
  );
};
