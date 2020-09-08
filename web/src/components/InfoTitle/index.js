import React from "react";
import { Text } from "./styles";
export default function InfoTitle({ children }) {
  return (
    <>
      <Text>{children && children}</Text>
    </>
  );
}
