import React from "react";
import { Container } from "./styles";

export default function Input({ label, name, width, ...attrs }) {
  return (
    <>
      <Container width={width}>
        <input placeholder=" " id={name} {...attrs} />
        <label htmlFor={name}>{label}</label>
      </Container>
    </>
  );
}
