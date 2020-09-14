import React from "react";
import { Container } from "./styles";

export default function Radio({ name, value, label, onChange, checked }) {
  return (
    <>
      <Container>
        {label}
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className="checkmark"></span>
      </Container>
    </>
  );
}
