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

export default function UserHome() {
  const { userData } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("wait");
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
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
            rele: {
              valor: device.rele.valor ? !!parseFloat(device.rele.valor) : null,
            },
          };
        });
        setDevices(newData);
        setStatus("online");
      } catch (error) {}
    })();
  }, []);
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
            {status === "wait" && "conectando"}
            {status === "offline" && status}
            {status === "online" && status}
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
