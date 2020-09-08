import React from "react";
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
export default function UserHome() {
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
  return (
    <>
      <Header>
        <HeaderContent>
          <InfoLeft>
            <InfoTitle>Dispositivos cadastrados</InfoTitle>
            <NewDevice to="/user/new-device">
              <PlusIcon />
              Novo dispositivo
            </NewDevice>
          </InfoLeft>
          <InfoRight>
            <Circle status="online" />
            online
          </InfoRight>
        </HeaderContent>
      </Header>
      <DevicesPanel data={devices} />
      <TotalDevices>
        {devices.length === 0
          ? "Nenhum dispositivo cadastrado"
          : `${devices.length} dispositivo${
              devices.length > 1 ? "s" : ""
            } cadastrado${devices.length > 1 ? "s" : ""}`}
      </TotalDevices>
    </>
  );
}
