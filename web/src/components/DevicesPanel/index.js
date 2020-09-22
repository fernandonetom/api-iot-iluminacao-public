import React from "react";
import {
  Container,
  DeviceItem,
  DeviceItemIcon,
  DeviceItemName,
} from "./styles";
import LightIcon from "../../assets/icons/lightIcon";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
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
            data-tip
            data-for={`${device.id}-${device.name}`}
          >
            <DeviceItemIcon status={device.status}>
              <LightIcon />
            </DeviceItemIcon>
            <DeviceItemName>{`${device.name.toString().slice(0, 15)}${
              device.name.length > 15 ? "..." : ""
            }`}</DeviceItemName>
          </DeviceItem>
        ))}
      </Container>
      {data.map((device) => {
        if (device.name.length > 15) {
          return (
            <ReactTooltip
              //className={data.alerta ? "toolTipWarn" : "toolTipSuccess"}
              key={device.id}
              id={`${device.id}-${device.name}`}
              place="bottom"
            >
              {device.name}
            </ReactTooltip>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
