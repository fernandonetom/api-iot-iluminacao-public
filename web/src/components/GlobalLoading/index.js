import React from "react";
import { Container } from "./styles";
import LoginLogo from "../../assets/images/LoginLogo";
export default function GlobalLoading() {
  return (
    <>
      <Container>
        {/* <Icons name="light" /> */}
        <LoginLogo />
        <h1>
          Carregando<span>...</span>
        </h1>
      </Container>
    </>
  );
}
