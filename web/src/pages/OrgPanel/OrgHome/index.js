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
import GlobalLoading from "../../../components/GlobalLoading";
import api from "../../../services/api";
import moment from "moment";
import { toast } from "react-toastify";
moment().locale("pt-br");
export default function OrgHome() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [dataDays, setDataDays] = useState([]);
  const [dataMonths, setDataMonths] = useState([]);
  const [loadingDays, setLoadingDays] = useState(true);
  const [loadingMonths, setLoadingMonths] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const { data } = await api.get("organizations/stats/cron");
        setLoading(false);
        setData(data);
      } catch (err) {
        toast.error("Ocorreu um erro, tente atualizar a página");
      }
    })();
    (async () => {
      try {
        const { data } = await api.get("organizations/stats/sessions/days");
        setLoadingDays(false);
        setDataDays(data);
      } catch (err) {
        toast.error("Ocorreu um erro, tente atualizar a página");
      }
    })();
    (async () => {
      try {
        const { data } = await api.get("organizations/stats/sessions/months");
        setLoadingMonths(false);
        setDataMonths(data);
      } catch (err) {
        toast.error("Ocorreu um erro, tente atualizar a página");
      }
    })();
  }, []);
  return (
    <>
      {loading && <GlobalLoading />}
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
              <LabelText>{data.adminUsers && data.adminUsers}</LabelText>
            </Label>
          </Block>
          <Block area="users">
            <Title>Usuários</Title>
            <Label>
              <Icons name="users" />
              <LabelText>{data.users && data.users}</LabelText>
            </Label>
          </Block>
          <Block area="dispo">
            <Title>Dispositivos</Title>
            <Label>
              <Icons name="light" />
              <LabelText>{data.devices && data.devices}</LabelText>
            </Label>
          </Block>
          <Block area="regis">
            <Title>Registros</Title>
            <Label>
              <Icons name="database" />
              <LabelText>{data.storages && data.storages}</LabelText>
            </Label>
          </Block>
          <Block area="graph">
            <Doughnut
              data={{
                datasets: [
                  {
                    data: [
                      data.adminUsers || 0,
                      data.users || 0,
                      data.devices || 0,
                    ],
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
                      data: dataDays.map((item) => parseFloat(item.valor)),
                      fill: true,
                      backgroundColor: themeData.colors.orange,
                      pointBackgroundColor: "rgba(0,0,0,0)",
                      pointHoverBackgroundColor: themeData.colors.orangeDark,
                      pointHoverRadius: 10,
                    },
                  ],
                  labels: dataDays.map((item) =>
                    moment(item.data).format("ddd")
                  ),
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
                      data: dataMonths.map((item) => parseFloat(item.valor)),
                      fill: true,
                      backgroundColor: themeData.colors.blue,
                      pointBackgroundColor: "rgba(0,0,0,0)",
                      pointHoverBackgroundColor: themeData.colors.blueDark,
                      pointHoverRadius: 10,
                    },
                  ],
                  labels: dataMonths.map((item) => item.mesNome.toLowerCase()),
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
