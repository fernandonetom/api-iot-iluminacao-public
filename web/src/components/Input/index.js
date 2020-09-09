import React from "react";
import { Container } from "./styles";

export default function Input({ label, name, width, bgColor, ...attrs }) {
  return (
    <>
      <Container width={width} bgColor={bgColor}>
        <input placeholder=" " id={name} {...attrs} />
        <label htmlFor={name}>{label}</label>
      </Container>
    </>
  );
}
