import React from "react";
import InfoTitle from "../../../components/InfoTitle";
import Header from "../../../components/Header";
import Icons from "../../../assets/icons";
import { Doughnut } from "react-chartjs-2";
import {
  Container,
  Block,
  Title,
  Label,
  LabelText,
  DashboardTitle,
} from "./styles";
import themeData from "../../../assets/theme/theme";
export default function OrgHome() {
  return (
    <>
      <Header menuType="organization" active="dashboard"></Header>
      <DashboardTitle>
        <InfoTitle>Dashboard</InfoTitle>
      </DashboardTitle>
      <Container>
        <Block area="admin">
          <Title>Administradores</Title>
          <Label>
            <Icons name="user-admin" />
            <LabelText>2</LabelText>
          </Label>
        </Block>
        <Block area="users">
          <Title>Usuários</Title>
          <Label>
            <Icons name="users" />
            <LabelText>5</LabelText>
          </Label>
        </Block>
        <Block area="dispo">
          <Title>Dispositivos</Title>
          <Label>
            <Icons name="light" />
            <LabelText>7</LabelText>
          </Label>
        </Block>
        <Block area="regis">
          <Title>Registros</Title>
          <Label>
            <Icons name="database" />
            <LabelText>245</LabelText>
          </Label>
        </Block>
        <Block area="graph">
          <Doughnut
            data={{
              datasets: [
                {
                  data: [2, 5, 3],
                  backgroundColor: [
                    themeData.colors.lightGrayDark,
                    themeData.colors.greenDark,
                    themeData.colors.blueDark,
                  ],
                  label: "Dataset 1",
                  borderWidth: 0,
                },
              ],
              labels: ["Administradores", "Usuários", "Dispositivos"],
            }}
            options={{
              responsive: true,
              legend: {
                position: "bottom",
                labels: {
                  fontColor: themeData.colors.lightGrayDark,
                  padding: 30,
                },
                fullWidth: true,
              },
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            }}
          />
        </Block>
      </Container>
    </>
  );
}
