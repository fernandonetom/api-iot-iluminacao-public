import React from "react";
import {
  Container,
  DeviceItem,
  DeviceItemIcon,
  DeviceItemName,
} from "./styles";
import LightIcon from "../../assets/icons/lightIcon";
import { useHistory } from "react-router-dom";
export default function DevicesPanel({ data }) {
  const history = useHistory();
  function handleDeviceDetails(id) {
    history.push(`/users/device-details/${id}`);
  }
  return (
    <>
      <Container>
        {data.map((device) => (
          <DeviceItem
            onClick={() => handleDeviceDetails(device.id)}
            key={device.id}
          >
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
