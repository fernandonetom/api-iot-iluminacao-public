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
  MapInfo,
} from "./styles";
import MakerMap from "../../../components/MakerMap";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import themeData from "../../../assets/theme/theme";
import isMobile from "../../../utils/isMobile";
import { useHistory, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import api from "../../../services/api";
import { toast } from "react-toastify";
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
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    mqtt: null,
    temperatura: [null, 50],
    luminosidade: [null, 100],
    umidade: [null, 100],
    tensao: [null, 15],
    rele: null,
    alerta: null,
    movimentacao: null,
  });
  const [center, setCenter] = useState({ lat: null, lng: null });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`mqttusers/${id}`);
        setLoading(false);
        if (data.error) {
          history.goBack();
          return toast.error(data.message);
        }
        console.log(data.mqtt);
        setData({
          mqtt: data.mqtt,
          temperatura: [
            data.temperatura.valor ? parseFloat(data.temperatura.valor) : null,
            data.temperatura.valor
              ? maximum.temperatura - parseFloat(data.temperatura.valor)
              : 0,
          ],
          luminosidade: [
            data.luminosidade.valor
              ? parseFloat(data.luminosidade.valor)
              : null,
            data.luminosidade.valor
              ? maximum.luminosidade - parseFloat(data.luminosidade.valor)
              : 0,
          ],
          umidade: [
            data.umidade.valor ? parseFloat(data.umidade.valor) : null,
            data.umidade.valor
              ? maximum.umidade - parseFloat(data.umidade.valor)
              : 0,
          ],
          tensao: [
            data.tensao.valor ? parseFloat(data.tensao.valor) : null,
            data.tensao.valor
              ? maximum.tensao - parseFloat(data.tensao.valor)
              : 0,
          ],
          movimentacao: data.movimentacao.valor
            ? !!parseFloat(data.movimentacao.valor)
            : null,
          alerta: data.alerta.valor ? !!parseFloat(data.alerta.valor) : null,
          rele: data.rele.valor ? !!parseFloat(data.rele.valor) : null,
        });
      } catch (error) {}
    })();
  }, [history, id]);

  return (
    <>
      <Header menuType="user" active="dashboard">
        <HeaderContent>
          <InfoLeft>
            <BackButton onClick={() => history.goBack()}>
              <Icons name="arrow-left" />
            </BackButton>
            {loading && <InfoTitle>Carregando...</InfoTitle>}
            {!loading && data.mqtt && <InfoTitle>{data.mqtt.name}</InfoTitle>}
            {!loading && data.mqtt && (
              <EditButton to="device-edit">editar</EditButton>
            )}
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
              {(loading || data.rele === null) && (
                <span className="wait">Aguardando</span>
              )}
              {!loading && data.rele !== null && (
                <span>{data.rele ? "ligada" : "desligada"}</span>
              )}
            </DetailsItemLeft>
            <DetailsItemRight type="light" status={data.rele}>
              <LoadingSpinner loading={loading || data.rele === null} />
              {!loading && data.rele !== null && <Icons name="light" />}
            </DetailsItemRight>
          </DetailsItem>

          <DetailsItem>
            <DetailsItemLeft>
              <h3>Alerta</h3>
              {(loading || data.alerta === null) && (
                <span className="wait">Aguardando</span>
              )}
              {!loading && data.alerta !== null && (
                <span>{data.alerta ? "ligado" : "desligado"}</span>
              )}
            </DetailsItemLeft>
            <DetailsItemRight
              data-tip
              data-for="alertTooltip"
              type="alert"
              status={data.alerta}
            >
              <LoadingSpinner loading={loading || data.alerta === null} />
              {!loading && data.alerta !== null && <Icons name="alert" />}
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
              {(loading || data.movimentacao === null) && (
                <span className="wait">Aguardando</span>
              )}
              {!loading && data.movimentacao !== null && (
                <span>{data.movimentacao ? "detectada" : "não detectada"}</span>
              )}
            </DetailsItemLeft>
            <DetailsItemRight type="movimentacao" status={data.movimentacao}>
              <LoadingSpinner loading={loading || data.movimentacao === null} />
              {!loading && data.movimentacao !== null && <Icons name="run" />}
            </DetailsItemRight>
          </DetailsItem>

          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              {(loading || data.temperatura[0] === null) && (
                <span className="wait">Aguardando</span>
              )}
              <span>
                {!loading && data.temperatura[0] && `${data.temperatura[0]} ºC`}
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading || !data.temperatura[0]} />
              {!loading && data.temperatura[0] && (
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
              <h3>luminosidade</h3>
              {(loading || data.luminosidade[0] === null) && (
                <span className="wait">Aguardando</span>
              )}
              <span>
                {!loading &&
                  data.luminosidade[0] &&
                  `${data.luminosidade[0]} %`}
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading || !data.luminosidade[0]} />
              {!loading && data.luminosidade[0] && (
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
              {(loading || data.umidade[0] === null) && (
                <span className="wait">Aguardando</span>
              )}
              <span>
                {!loading && data.umidade[0] && `${data.umidade[0]} %`}
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading || !data.umidade[0]} />
              {!loading && data.umidade[0] && (
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
              <h3>tensão</h3>
              {(loading || data.tensao[0] === null) && (
                <span className="wait">Aguardando</span>
              )}
              <span>{!loading && data.tensao[0] && `${data.tensao[0]} V`}</span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <LoadingSpinner loading={loading || !data.tensao[0]} />
              {!loading && data.tensao[0] && (
                <Doughnut
                  width={isMobile ? 30 : 40}
                  data={dataToChart(data.tensao)}
                  options={doughnutOptions}
                />
              )}
            </DetailsItemRight>
          </DetailsItem>
        </DetailsPanelLeft>
        <DetailsPanelRight
          showLoader={loading}
          showNull={!!data.mqtt?.latitude && !!data.mqtt?.longitude}
        >
          {loading && <MapInfo>{<LoadingSpinner loading />}</MapInfo>}
          {!loading && !data.mqtt?.latitude && !data.mqtt?.longitude && (
            <MapInfo>
              <Icons name="map-pin" />
              Sem localização
            </MapInfo>
          )}
          {!loading && data.mqtt?.latitude && data.mqtt?.longitude && (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_MAPS_API_KEY,
              }}
              defaultCenter={{
                lat: parseFloat(data.mqtt.latitude),
                lng: parseFloat(data.mqtt.longitude),
              }}
              defaultZoom={18}
            >
              <MakerMap
                lat={parseFloat(data.mqtt.latitude)}
                lng={parseFloat(data.mqtt.longitude)}
              />
            </GoogleMapReact>
          )}
        </DetailsPanelRight>
      </DetailsPanel>
      <Footer>cadastrado em 26/08/2020 às 13:25h</Footer>
    </>
  );
}
