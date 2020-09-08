import React from "react";
import { Container } from "./styles";

export default function Checkbox({ label, ...attrs }) {
  return (
    <>
      <Container>
        {label}
        <input type="checkbox" />
        <span className="checkmark"></span>
      </Container>
    </>
  );
}
