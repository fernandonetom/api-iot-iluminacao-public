import React from "react";
import Icons from "../../assets/icons";
import { Container } from "./styles";

export default function GlobalLoading() {
  return (
    <>
      <Container>
        <Icons name="light" />
        <h1>
          Carregando<span>...</span>
        </h1>
      </Container>
    </>
  );
}
