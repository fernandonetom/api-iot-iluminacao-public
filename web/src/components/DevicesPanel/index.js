import React from "react";
import {
  Container,
  DeviceItem,
  DeviceItemIcon,
  DeviceItemName,
} from "./styles";
import LightIcon from "../../assets/icons/lightIcon";
export default function DevicesPanel({ data }) {
  return (
    <>
      <Container>
        {data.map((device) => (
          <DeviceItem key={device.id}>
            <DeviceItemIcon status={device.status}>
              <LightIcon />
            </DeviceItemIcon>
            <DeviceItemName>{device.name}</DeviceItemName>
          </DeviceItem>
        ))}
      </Container>
    </>
  );
}
