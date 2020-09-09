import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Header from "../../../components/Header";
import {
  HeaderContent,
  InfoLeft,
  BackButton,
  EditButton,
  FormGroup,
  FormContent,
  FormLabel,
  FormInput,
  FormLocationSelect,
  FormLocationSelected,
  Text,
  MapContent,
  SubmitButton,
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import { useHistory } from "react-router-dom";
export default function UserMqttNew({ type }) {
  const [center, setCenter] = useState({
    status: "loading",
    lat: null,
    lng: null,
  });
  const history = useHistory();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (location) {
        setCenter({
          status: "loaded",
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    } else {
      setCenter({
        ...center,
        status: "error",
      });
    }
  }, [center]);
  return (
    <>
      <Header
        menuType="user"
        active={type === "new" ? "novo dispositivo" : "dashboard"}
      >
        <HeaderContent>
          <InfoLeft>
            {type && type === "new" && (
              <BackButton onClick={() => history.goBack()}>
                <Icons name="arrow-left" />
              </BackButton>
            )}
            <InfoTitle>
              {type && type === "edit" ? "Atualizar poste" : "Cadastrar poste"}
            </InfoTitle>

            <EditButton to="device-edit">Cancelar</EditButton>
          </InfoLeft>
        </HeaderContent>
      </Header>
      <FormContent>
        <FormGroup>
          <FormLabel>Nome do dispositivo</FormLabel>
          <FormInput type="text" />
        </FormGroup>
        <FormGroup>
          <FormLabel>Atribuir localização</FormLabel>
          <FormLocationSelect>
            <FormLocationSelected>Não</FormLocationSelected>
            <FormLocationSelected selected={true}>Sim</FormLocationSelected>
          </FormLocationSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel status={center.status} className="inline">
            <Text>Localização</Text>
            <Text className="status">
              {center.status === "loading" && "buscando sua localização"}
              {center.status === "loaded" && "localização encontrada"}
              {center.status === "error" && "localização não encontrada"}
            </Text>
          </FormLabel>
          {center.lat && false && (
            <MapContent>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_MAPS_API_KEY,
                }}
                defaultCenter={center}
                defaultZoom={15}
              ></GoogleMapReact>
            </MapContent>
          )}
        </FormGroup>
        <SubmitButton>
          {type && type === "edit" ? "Atualizar poste" : "Cadastrar poste"}
        </SubmitButton>
      </FormContent>
    </>
  );
}
