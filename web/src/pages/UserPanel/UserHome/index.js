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
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("wait");
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("mqttusers");
        setLoading(false);
        if (data.error) {
          setError("Não foi possível obter a listagem dos dispositivos");
          setStatus("offline");
        }
        setDevices(data);
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
            <NewDevice to="/user/new-device">
              <PlusIcon />
              <span>Novo dispositivo</span>
            </NewDevice>
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
