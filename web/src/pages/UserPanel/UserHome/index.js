import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import PlusIcon from "../../../assets/icons/plusIcon";
import {
  InfoLeft,
  NewDevice,
  InfoRight,
  HeaderContent,
  Circle,
  TotalDevices,
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import DevicesPanel from "../../../components/DevicesPanel";
import LoadingComponent from "../../../components/LoadingComponent";
import api from "../../../services/api";
import { Context } from "../../../Context/AuthContext";
import socket from "../../../services/websocket";

import { toast } from "react-toastify";

export default function UserHome() {
  const { userData } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("conectando");
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  const [alreadyData, setAlreadyData] = useState(false);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("mqttusers/home");
        setLoading(false);
        if (data.error) {
          setError("Não foi possível obter a listagem dos dispositivos");
          setStatus("offline");
        }
        const newData = data.map((device) => {
          return {
            ...device,
            id: device.id.toString(),
            rele: {
              valor: device.rele.valor ? !!parseFloat(device.rele.valor) : null,
            },
          };
        });
        const idsArray = data.map((device) => device.id.toString());
        setIds(idsArray);
        setDevices(newData);
        setAlreadyData(true);
      } catch (error) {
        toast.error("Estamos com dificuldades no momento, tente mais tarde");
      }
    })();
  }, []);
  useEffect(() => {
    let active = true;
    if (active) {
      if (alreadyData) {
        socket.connect();
        socket.emit("dados", [...ids]);
        socket.on("ok", function () {
          setStatus("online");
        });
        socket.on("connect", function () {
          setStatus("online");
        });
        socket.on("disconnect", function () {
          setStatus("conectando");
        });
        socket.on("reconnecting", function () {
          setStatus("conectando");
          toast.warn("Tentando reconectar...", {
            position: "bottom-center",
            toastId: "rec",
          });
        });
        socket.on("reconnect", function () {
          setStatus("online");
          toast.success("Conexão estabilizada!", {
            position: "bottom-center",
            toastId: "rec-ok",
          });
        });
        socket.on("connect_error", function () {
          setStatus("offline");
          toast.error("Servidor offline!", {
            position: "bottom-center",
            toastId: "rec-off",
          });
        });
        socket.on("reconnect_error", function () {
          setStatus("offline");
          toast.error("Servidor offline!", {
            position: "bottom-center",
            toastId: "rec-off",
          });
        });
        socket.on("/poste", function (dados) {
          process.env.NODE_ENV === "development" &&
            console.log(`Recebeu: ${dados}`);
          const [topico, id, valor] = dados.split("/");

          if (topico === "rele") {
            const newDevices = devices.map((device) => {
              if (device.id === id) {
                return { ...device, rele: { valor: !!parseFloat(valor) } };
              } else {
                return device;
              }
            });
            setDevices(newDevices);
          }
        });
      }
    }
    return () => {
      active = false;
      socket.disconnect();
    };
  }, [alreadyData, devices, ids]);
  return (
    <>
      <Header menuType="user" active="dashboard">
        <HeaderContent>
          <InfoLeft>
            <InfoTitle>Dispositivos cadastrados</InfoTitle>
            {userData.userLevel === "admin" && (
              <NewDevice to="/users/new-device">
                <PlusIcon />
                <span>Novo dispositivo</span>
              </NewDevice>
            )}
          </InfoLeft>
          <InfoRight>
            <Circle status={status} />
            {status}
          </InfoRight>
        </HeaderContent>
      </Header>
      {loading && <LoadingComponent />}
      {!loading && devices.length > 0 && <DevicesPanel data={devices} />}
      {!loading && (
        <TotalDevices>
          {devices.length === 0
            ? error
              ? error
              : "Nenhum dispositivo cadastrado"
            : `${devices.length} dispositivo${
                devices.length > 1 ? "s" : ""
              } cadastrado${devices.length > 1 ? "s" : ""}`}
        </TotalDevices>
      )}
    </>
  );
}
