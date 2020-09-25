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
  ErrorBox,
  LoadingSpinner,
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import { useHistory, useParams } from "react-router-dom";
import MakerMap from "../../../components/MakerMap";
import api from "../../../services/api";
import { MqttInfo, showError, showSucess } from "../../../utils/alerts";
import { toast } from "react-toastify";
import GlobalLoading from "../../../components/GlobalLoading";
export default function UserMqttNew({ type }) {
  const standardLocation = {
    lat: -7.141959,
    lng: -34.850528,
  };
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [center, setCenter] = useState({
    status: "loading",
    lat: -7.141959,
    lng: -34.850528,
  });
  const [locationPin, setLocationPin] = useState({
    lat: null,
    lng: null,
  });
  const [useLocation, setUseLoacation] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState({
    name: null,
    location: null,
  });
  const history = useHistory();
  async function handleSubmit() {
    if (!name.trim().length) {
      return setError({ ...error, name: "O nome não pode ficar em branco" });
    }
    if (useLocation && !locationPin.lat) {
      return setError({ name: null, location: "Selecione um local no mapa" });
    }
    setError({ name: null, location: null });
    if (type === "new") {
      setLoading(true);
      try {
        const { data } = await api.post("mqttusers", {
          name,
          latitude: useLocation ? locationPin.lat : null,
          longitude: useLocation ? locationPin.lng : null,
        });
        setLoading(false);
        if (data.error) {
          return showError("Algo deu errado!", undefined, data.message);
        }
        const { mqttUserId, username, password, latitude, longitude } = data;
        return MqttInfo(
          {
            id: mqttUserId,
            name,
            username,
            password,
            latitude,
            longitude,
            title: `${name} foi cadastrado!`,
          },
          () => {
            history.push("/users/dashboard");
          }
        );
      } catch (error) {}
    }
    if (type === "edit") {
      setLoading(true);
      const { data } = await api.put(`mqttusers/${id}`, {
        name,
        latitude: useLocation ? locationPin.lat : null,
        longitude: useLocation ? locationPin.lng : null,
      });
      setLoading(false);
      if (data.error) {
        return showError("Algo deu errado!", undefined, data.message);
      }
      showSucess(data.message, 3000);
      return history.goBack();
    }
  }

  useEffect(() => {
    (async () => {
      if (type === "edit") {
        setLoadingData(true);
        const { data } = await api.get(`mqttusers/${id}`);
        setLoadingData(false);
        if (data.error) {
          toast.error(data.message);
          return history.goBack();
        }
        setName(data.mqtt.name);
        setUseLoacation(
          data.mqtt.latitude && data.mqtt.longitude ? true : false
        );
        setLocationPin({
          lat: data.mqtt.latitude,
          lng: data.mqtt.longitude,
        });
        setCenter({
          lat: data.mqtt.latitude
            ? parseFloat(data.mqtt.latitude)
            : standardLocation.lat,
          lng: data.mqtt.longitude
            ? parseFloat(data.mqtt.longitude)
            : standardLocation.lng,
        });
      }
    })();
  }, [history, id, standardLocation.lat, standardLocation.lng, type]);

  useEffect(() => {
    let isCancelled = false;

    if ("geolocation" in navigator) {
      if (useLocation) {
        navigator.geolocation.getCurrentPosition(function (location) {
          if (!isCancelled) {
            if (type === "new") {
              setCenter({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              });
            }
          }
        });
      }
    } else {
      if (!isCancelled) {
        setCenter({ ...standardLocation });
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [center, standardLocation, type, useLocation]);
  return (
    <>
      {loadingData && <GlobalLoading />}
      <Header menuType="user" active="dispositivos">
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

            <EditButton onClick={() => history.goBack()}>Cancelar</EditButton>
          </InfoLeft>
        </HeaderContent>
      </Header>
      <FormContent>
        <FormGroup>
          <FormLabel>Nome do dispositivo</FormLabel>
          <FormInput
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            error={error.name}
          />
          {error.name && <ErrorBox>{error.name}</ErrorBox>}
        </FormGroup>
        <FormGroup>
          <FormLabel>Atribuir localização</FormLabel>
          <FormLocationSelect>
            <FormLocationSelected
              selected={!useLocation}
              onClick={() => setUseLoacation(false)}
            >
              Não
            </FormLocationSelected>
            <FormLocationSelected
              selected={useLocation}
              onClick={() => setUseLoacation(true)}
            >
              Sim
            </FormLocationSelected>
          </FormLocationSelect>
        </FormGroup>
        {!loadingData && useLocation && (
          <FormGroup>
            <FormLabel status={center.status} className="inline">
              <Text>Localização</Text>
            </FormLabel>
            {error.location && <ErrorBox>{error.location}</ErrorBox>}
            {useLocation && center.lat && (
              <MapContent>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAPS_API_KEY,
                  }}
                  defaultCenter={center}
                  onClick={({ lat, lng }) => setLocationPin({ lat, lng })}
                  defaultZoom={15}
                >
                  {locationPin.lat && (
                    <MakerMap lat={locationPin.lat} lng={locationPin.lng} />
                  )}
                </GoogleMapReact>
              </MapContent>
            )}
          </FormGroup>
        )}
        <SubmitButton onClick={loading ? null : handleSubmit}>
          {!loading &&
            type &&
            (type === "edit" ? "Atualizar poste" : "Cadastrar poste")}
          {loading && <LoadingSpinner />}
        </SubmitButton>
      </FormContent>
    </>
  );
}
