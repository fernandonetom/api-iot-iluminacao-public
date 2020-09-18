import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Doughnut } from "react-chartjs-2";
import Header from "../../../components/Header";
import {
  HeaderContent,
  InfoLeft,
  BackButton,
  InfoRight,
  Circle,
  DetailsPanel,
  DetailsPanelLeft,
  DetailsPanelRight,
  DetailsItem,
  DetailsItemLeft,
  DetailsItemRight,
  Footer,
  EditButton,
  LoadingSpinner,
} from "./styles";
import MakerMap from "../../../components/MakerMap";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import themeData from "../../../assets/theme/theme";
import isMobile from "../../../utils/isMobile";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
const maximum = {
  temperatura: 50,
  luminosidade: 100,
  umidade: 100,
  tensao: 15,
};
const doughnutOptions = {
  responsive: true,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  title: {
    display: false,
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  cutoutPercentage: 70,
};
function dataToChart(data) {
  return {
    datasets: [
      {
        data,
        backgroundColor: [themeData.colors.greenDark, themeData.colors.gray],
        borderWidth: 0,
      },
    ],
  };
}

export default function UserMqttDetails() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    temperatura: [5, 50],
    luminosidade: [0, 100],
    umidade: [0, 100],
    tensao: [0, 15],
    rele: true,
    alerta: true,
    movimentacao: true,
  });
  const [center, setCenter] = useState({ lat: null, lng: null });

  useEffect(() => {
    setTimeout(() => {
      setData({
        temperatura: [25, maximum.temperatura - 25],
        luminosidade: [90, maximum.luminosidade - 90],
        umidade: [88, maximum.umidade - 88],
        tensao: [13.6, maximum.tensao - 13.6],
        rele: false,
        alerta: true,
        movimentacao: false,
      });
      setLoading(false);
    }, 5000);
  }, [data]);

  const device = { id: 1, name: "Poste 1" };
  return (
    <>
      <Header menuType="user" active="dashboard">
        <HeaderContent>
          <InfoLeft>
            <BackButton onClick={() => history.goBack()}>
              <Icons name="arrow-left" />
            </BackButton>
            <InfoTitle>{device.name}</InfoTitle>
            <EditButton to="device-edit">editar</EditButton>
          </InfoLeft>
          <InfoRight>
            <Circle status="online" />
            online
          </InfoRight>
        </HeaderContent>
      </Header>
      <DetailsPanel>
        <DetailsPanelLeft>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Lâmpada</h3>
              {loading && <span className="wait">Aguardando</span>}
              {!loading && <span>{data.rele ? "ligada" : "desligada"}</span>}
            </DetailsItemLeft>
            <DetailsItemRight type="light" status={data.rele}>
              <LoadingSpinner loading={loading} />
              {!loading && <Icons name="light" />}
            </DetailsItemRight>
          </DetailsItem>

          <DetailsItem>
            <DetailsItemLeft>
              <h3>Alerta</h3>
              {loading && <span className="wait">Aguardando</span>}
              {!loading && <span>{data.alerta ? "ligado" : "desligado"}</span>}
            </DetailsItemLeft>
            <DetailsItemRight
              data-tip
              data-for="alertTooltip"
              type="alert"
              status={data.alerta}
            >
              <LoadingSpinner loading={loading} />
              {!loading && <Icons name="alert" />}
            </DetailsItemRight>
            <ReactTooltip
              className={data.alerta ? "toolTipWarn" : "toolTipSuccess"}
              id="alertTooltip"
              place="bottom"
            >
              <span>{data.alerta ? "Desligar alerta" : "Ligar alerta"}</span>
            </ReactTooltip>
          </DetailsItem>

          <DetailsItem>
            <DetailsItemLeft>
              <h3>Movimentação</h3>
              {loading && <span className="wait">Aguardando</span>}
              {!loading && (
                <span>{data.movimentacao ? "detectada" : "não detectada"}</span>
              )}
            </DetailsItemLeft>
            <DetailsItemRight type="movimentacao" status={data.movimentacao}>
              <LoadingSpinner loading={loading} />
              {!loading && <Icons name="run" />}
            </DetailsItemRight>
          </DetailsItem>

          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              {loading && <span className="wait">Aguardando</span>}
              <span>
                {!loading && data.temperatura && `${data.temperatura[0]} ºC`}
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading} />
              {!loading && (
                <Doughnut
                  width={isMobile ? 30 : 40}
                  data={dataToChart(data.temperatura)}
                  options={doughnutOptions}
                />
              )}
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Luminosidade</h3>
              {loading && <span className="wait">Aguardando</span>}
              <span>
                {!loading && data.luminosidade && `${data.luminosidade[0]} %`}
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading} />
              {!loading && (
                <Doughnut
                  width={isMobile ? 30 : 40}
                  data={dataToChart(data.luminosidade)}
                  options={doughnutOptions}
                />
              )}
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>umidade</h3>
              {loading && <span className="wait">Aguardando</span>}
              <span>{!loading && data.umidade && `${data.umidade[0]} %`}</span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading} />
              {!loading && (
                <Doughnut
                  width={isMobile ? 30 : 40}
                  data={dataToChart(data.umidade)}
                  options={doughnutOptions}
                />
              )}
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Tensão</h3>
              {loading && <span className="wait">Aguardando</span>}
              <span>{!loading && data.tensao && `${data.tensao[0]} V`}</span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading} />
              {!loading && (
                <Doughnut
                  width={isMobile ? 30 : 40}
                  data={dataToChart(data.tensao)}
                  options={doughnutOptions}
                />
              )}
            </DetailsItemRight>
          </DetailsItem>
        </DetailsPanelLeft>
        <DetailsPanelRight>
          {center.lat && false && (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_MAPS_API_KEY,
              }}
              defaultCenter={center}
              defaultZoom={15}
            >
              <MakerMap lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
          )}
        </DetailsPanelRight>
      </DetailsPanel>
      <Footer>cadastrado em 26/08/2020 às 13:25h</Footer>
    </>
  );
}
