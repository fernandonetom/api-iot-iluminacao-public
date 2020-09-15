import React from "react";
import { Container } from "./styles";

export default function Input({
  label,
  name,
  width,
  bgColor,
  onChange,
  error,
  ...attrs
}) {
  return (
    <>
      <Container width={width} bgColor={bgColor} error={error}>
        <input
          placeholder=" "
          id={name}
          {...attrs}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        <label htmlFor={name}>{label}</label>
      </Container>
    </>
  );
}
