/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Doughnut } from "react-chartjs-2";
import GlobalLoading from "../../../components/GlobalLoading";
import Header from "../../../components/Header";
import socket from "../../../services/websocket";
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
import { DateToStringFormat } from "../../../utils/dateFormatter";
import { MqttInfo } from "../../../utils/alerts";
import { Context } from "../../../Context/AuthContext";
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
  });
  const { userData } = useContext(Context);
  const [loadingData, setLoadingData] = useState(false);
  const [rele, setRele] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [movimentacao, setMovimentacao] = useState(null);

  const [config, setConfig] = useState({
    statusIo: "conectando",
    already: false,
  });
  useEffect(() => {
    let active = true;
    if (active) {
      (async () => {
        try {
          const { data } = await api.get(`mqttusers/${id}`);
          setLoading(false);
          if (data.error) {
            history.push("/");
            return toast.error(data.message, {
              toastId: "401",
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setRele(data.rele.valor ? !!parseFloat(data.rele.valor) : null);
          setAlerta(data.alerta.valor ? !!parseFloat(data.alerta.valor) : null);
          setMovimentacao(
            data.movimentacao.valor
              ? !!parseFloat(data.movimentacao.valor)
              : null
          );
          setData({
            mqtt: data.mqtt,
            temperatura: [
              data.temperatura.valor
                ? parseFloat(data.temperatura.valor)
                : null,
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
          });

          setConfig({ ...config, already: true });
        } catch (error) {}
      })();
    }
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    let active = true;
    if (active) {
      if (config.already) {
        socket.connect();
        socket.emit("dados", [id]);
        socket.on("ok", function () {
          setConfig({
            ...config,
            statusIo: "online",
          });
        });
        socket.on("connect", function () {
          setConfig({
            ...config,
            statusIo: "online",
          });
        });
        socket.on("disconnect", function () {
          setConfig({ ...config, statusIo: "conectando" });
        });
        socket.on("reconnecting", function () {
          setConfig({ ...config, statusIo: "conectando" });
          toast.warn("Tentando reconectar...", {
            position: "bottom-center",
          });
        });
        socket.on("reconnect", function () {
          setConfig({ ...config, statusIo: "online" });
          toast.success("Conexão estabilizada!", {
            position: "bottom-center",
          });
        });
        socket.on("connect_error", function () {
          setConfig({ ...config, statusIo: "offline" });
          toast.error("Servidor offline!", {
            position: "bottom-center",
          });
        });
        socket.on("reconnect_error", function () {
          setConfig({ ...config, statusIo: "offline" });
          toast.error("Servidor offline!", {
            position: "bottom-center",
          });
        });
        socket.on("/poste", function (dados) {
          process.env.NODE_ENV === "development" &&
            console.log(`Recebeu: ${dados}`);
          const [topico, , valor] = dados.split("/");
          process.env.NODE_ENV === "development" &&
            console.log(
              "TOPICO :: " + topico + " valor :: " + parseFloat(valor)
            );
          process.env.NODE_ENV === "development" && console.log(data);
          switch (topico) {
            case "temperatura":
            case "luminosidade":
            case "umidade":
            case "tensao":
              setData({
                ...data,
                [topico]: [
                  parseFloat(valor),
                  maximum[topico] - parseFloat(valor),
                ],
              });
              return;
            case "rele":
              setRele(!!parseFloat(valor));
              return;
            case "alerta":
              setAlerta(!!parseFloat(valor));
              return;
            case "movimentacao":
              setMovimentacao(!!parseFloat(valor));
              return;
            default:
              return;
          }
        });
      }
    }

    return () => {
      active = false;
      socket.disconnect();
    };
  }, [config.already]);
  async function handleMqttInfo() {
    try {
      setLoadingData(true);
      const { data } = await api.get(`mqttusers/credentials/${id}`);
      setLoadingData(false);
      return MqttInfo({ ...data });
    } catch (error) {}
  }
  function handleAlert() {
    socket.emit("alerta", {
      id,
      valor: alerta ? "0" : "1",
    });
  }
  return (
    <>
      {loadingData && <GlobalLoading />}
      <Header menuType="user" active="dashboard">
        <HeaderContent>
          <InfoLeft>
            <BackButton onClick={() => history.goBack()}>
              <Icons name="arrow-left" />
            </BackButton>
            {loading && <InfoTitle>Carregando...</InfoTitle>}
            {!loading && data.mqtt && <InfoTitle>{data.mqtt.name}</InfoTitle>}
            {!loading && data.mqtt && userData.userLevel === "admin" && (
              <EditButton onClick={handleMqttInfo}>ver detalhes</EditButton>
            )}
          </InfoLeft>
          <InfoRight>
            <Circle status={config.statusIo} />
            {config.statusIo}
          </InfoRight>
        </HeaderContent>
      </Header>
      <DetailsPanel>
        <DetailsPanelLeft>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Lâmpada</h3>
              {(loading || rele === null) && (
                <span className="wait">Aguardando</span>
              )}
              {!loading && rele !== null && (
                <span>{rele ? "ligada" : "desligada"}</span>
              )}
            </DetailsItemLeft>
            <DetailsItemRight type="light" status={rele}>
              <LoadingSpinner loading={loading || rele === null} />
              {!loading && rele !== null && <Icons name="light" />}
            </DetailsItemRight>
          </DetailsItem>

          <DetailsItem>
            <DetailsItemLeft>
              <h3>Alerta</h3>
              {(loading || alerta === null) && (
                <span className="wait">Aguardando</span>
              )}
              {!loading && alerta !== null && (
                <span>{alerta ? "ligado" : "desligado"}</span>
              )}
            </DetailsItemLeft>
            <DetailsItemRight
              data-tip
              data-for="alertTooltip"
              type="alert"
              status={alerta}
              onClick={handleAlert}
            >
              <LoadingSpinner loading={loading || alerta === null} />
              {!loading && alerta !== null && <Icons name="alert" />}
            </DetailsItemRight>
            <ReactTooltip
              className={alerta ? "toolTipWarn" : "toolTipSuccess"}
              id="alertTooltip"
              place="bottom"
            >
              <span>{alerta ? "Desligar alerta" : "Ligar alerta"}</span>
            </ReactTooltip>
          </DetailsItem>

          <DetailsItem>
            <DetailsItemLeft>
              <h3>Movimentação</h3>
              {(loading || movimentacao === null) && (
                <span className="wait">Aguardando</span>
              )}
              {!loading && movimentacao !== null && (
                <span>{movimentacao ? "detectada" : "não detectada"}</span>
              )}
            </DetailsItemLeft>
            <DetailsItemRight type="movimentacao" status={movimentacao}>
              <LoadingSpinner loading={loading || movimentacao === null} />
              {!loading && movimentacao !== null && <Icons name="run" />}
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
      <Footer>
        {loading && "Carregando..."}
        {!loading &&
          data.mqtt?.createdAt &&
          `cadastrado em ${DateToStringFormat(data.mqtt.createdAt)}`}
      </Footer>
    </>
  );
}
