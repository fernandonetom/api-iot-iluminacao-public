import React from "react";
import Checkbox from "../../../components/Checkbox";
import Header from "../../../components/Header";
import InfoTitle from "../../../components/InfoTitle";
import { BoxItems, Container, Title, MultiSelect, SelectDiv } from "./styles";
export default function UserReports() {
  const devices = [
    { id: 1, name: "Poste 1" },
    { id: 2, name: "Poste 2" },
    { id: 3, name: "Poste 3" },
    { id: 4, name: "Poste 4" },
    { id: 5, name: "Poste 5" },
    { id: 6, name: "Poste 6" },
    { id: 7, name: "Poste 7" },
    { id: 8, name: "Poste 8" },
    { id: 9, name: "Poste 9" },
    { id: 10, name: "Poste 10" },
    { id: 11, name: "Poste 11" },
    { id: 12, name: "Poste 12" },
  ];
  const dados = [
    { id: "alerta", name: "Alerta" },
    { id: "temperatura", name: "Temperatura" },
    { id: "movimentacao", name: "Movimentação" },
    { id: "luminosidade", name: "Luminosidade" },
    { id: "umidade", name: "Umidade" },
    { id: "tensao", name: "Tensão" },
  ];
  return (
    <>
      <Header active="relatórios" menuType="user">
        <InfoTitle>Relatórios</InfoTitle>
      </Header>
      <Container>
        <SelectDiv>
          <MultiSelect
            options={devices}
            displayValue="name"
            emptyRecordMsg="Nenhum resultado encontrado"
            placeholder="Selecione os dispositivos"
            closeIcon="cancel"
          />
        </SelectDiv>
        <SelectDiv>
          <MultiSelect
            options={dados}
            displayValue="name"
            emptyRecordMsg="Nenhum resultado encontrado"
            placeholder="Selecione os dados"
            closeIcon="cancel"
          />
        </SelectDiv>
        <BoxItems>
          <Title>Período</Title>
        </BoxItems>
      </Container>
    </>
  );
}
