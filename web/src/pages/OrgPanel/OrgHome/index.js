import React, { useEffect, useState } from "react";
import InfoTitle from "../../../components/InfoTitle";
import Header from "../../../components/Header";
import Icons from "../../../assets/icons";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Container,
  Block,
  Title,
  Label,
  LabelText,
  DashboardTitle,
  Content,
  LoadingShimmer,
} from "./styles";
import themeData from "../../../assets/theme/theme";
import isMobile from "../../../utils/isMobile";
export default function OrgHome() {
  const [loadingDays, setLoadingDays] = useState(true);
  const [loadingMonths, setLoadingMonths] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header menuType="organization" active="dashboard"></Header>
      <DashboardTitle>
        <InfoTitle>Dashboard</InfoTitle>
      </DashboardTitle>
      <Content>
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
              width={isMobile ? 150 : 300}
              options={{
                responsive: true,
                legend: {
                  position: "bottom",
                  labels: {
                    fontColor: themeData.colors.lightGrayDark,
                    padding: 30,
                  },
                },
                animation: {
                  animateScale: true,
                  animateRotate: true,
                },
              }}
            />
          </Block>
          <Block area="access-days">
            <Title>Acessos nos últimos 7 dias</Title>
            {loadingDays && <LoadingShimmer />}
            {!loadingDays && (
              <Line
                data={{
                  datasets: [
                    {
                      data: [2, 5, 3, 6, 8, 5, 4],
                      fill: true,
                      backgroundColor: themeData.colors.orange,
                      pointBackgroundColor: "rgba(0,0,0,0)",
                      pointHoverBackgroundColor: themeData.colors.orangeDark,
                      pointHoverRadius: 10,
                    },
                  ],
                  labels: ["Seg", "ter", "qua", "qui", "sex", "sab", "dom"],
                }}
                width={isMobile ? 150 : 300}
                options={{
                  layout: {
                    padding: {
                      top: 40,
                    },
                  },
                  legend: {
                    display: false,
                  },
                  responsive: true,
                  tooltips: {
                    mode: "nearest",
                    intersect: false,
                  },
                  hover: {
                    mode: "nearest",
                    intersect: false,
                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: true,
                          drawBorder: true,
                          drawOnChartArea: false,
                        },
                        scaleLabel: {
                          display: false,
                          labelString: "data",
                          fontColor: themeData.colors.lightGray,
                          fontSize: 15,
                        },
                        ticks: {
                          fontColor: themeData.colors.lightGray,
                          fontSize: 15,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        display: true,
                        scaleLabel: {
                          display: false,
                          labelString: "valor",
                          fontColor: themeData.colors.lightGray,
                          fontSize: 15,
                        },
                        ticks: {
                          fontColor: themeData.colors.lightGray,
                          beginAtZero: true,
                          fontSize: 15,
                          display: false,
                        },
                      },
                    ],
                  },
                }}
              />
            )}
          </Block>
          <Block area="access-month">
            <Title>Acessos nos últimos meses</Title>
            {loadingMonths && <LoadingShimmer />}
            {!loadingMonths && (
              <Line
                data={{
                  datasets: [
                    {
                      data: [2, 5, 3, 6, 8, 5, 4],
                      fill: true,
                      backgroundColor: themeData.colors.blue,
                      pointBackgroundColor: "rgba(0,0,0,0)",
                      pointHoverBackgroundColor: themeData.colors.blueDark,
                      pointHoverRadius: 10,
                    },
                  ],
                  labels: ["Seg", "ter", "qua", "qui", "sex", "sab", "dom"],
                }}
                width={isMobile ? 150 : 300}
                options={{
                  layout: {
                    padding: {
                      top: 40,
                    },
                  },
                  legend: {
                    display: false,
                  },
                  responsive: true,
                  tooltips: {
                    mode: "nearest",
                    intersect: false,
                  },
                  hover: {
                    mode: "nearest",
                    intersect: false,
                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: true,
                          drawBorder: true,
                          drawOnChartArea: false,
                        },
                        scaleLabel: {
                          display: false,
                          labelString: "data",
                          fontColor: themeData.colors.lightGray,
                          fontSize: 15,
                        },
                        ticks: {
                          fontColor: themeData.colors.lightGray,
                          fontSize: 15,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        display: true,
                        scaleLabel: {
                          display: false,
                          labelString: "valor",
                          fontColor: themeData.colors.lightGray,
                          fontSize: 15,
                        },
                        ticks: {
                          fontColor: themeData.colors.lightGray,
                          beginAtZero: true,
                          fontSize: 15,
                          display: false,
                        },
                      },
                    ],
                  },
                }}
              />
            )}
          </Block>
        </Container>
      </Content>
    </>
  );
}
