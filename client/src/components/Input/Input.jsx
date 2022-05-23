import React from "react";

const Input = ({ type, name, placeholder, onChange, value }) => {
  return (
    <input
      className={type == "text" ? "normal" : "large"}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
