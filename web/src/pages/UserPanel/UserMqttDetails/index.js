import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Doughnut } from "react-chartjs-2";
import Header from "../../../components/Header";
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
} from "./styles";
import MakerMap from "../../../components/MakerMap";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import themeData from "../../../assets/theme/theme";
import isMobile from "../../../utils/isMobile";
import { useHistory } from "react-router-dom";
export default function UserMqttDetails() {
  const history = useHistory();
  const [data, setData] = useState({
    temperatura: {
      datasets: [
        {
          data: [0, 50],
          backgroundColor: [themeData.colors.greenDark, themeData.colors.gray],
          borderWidth: 0,
        },
      ],
    },
  });
  const [center, setCenter] = useState({ lat: null, lng: null });
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
  useEffect(() => {
    setData((oldData) => ({
      ...oldData,
      temperatura: {
        datasets: [
          {
            data: [32.5, 50 - 32.5],
            backgroundColor: [
              themeData.colors.greenDark,
              themeData.colors.gray,
            ],
            borderWidth: 0,
          },
        ],
      },
    }));
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (location) {
        setCenter({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    } else {
      console.log("localização não habilitada");
    }
  }, []);
  const device = { id: 1, name: "Poste 1" };
  return (
    <>
      <Header menuType="user" active="dashboard">
        <HeaderContent>
          <InfoLeft>
            <BackButton onClick={() => history.goBack()}>
              <Icons name="arrow-left" />
            </BackButton>
            <InfoTitle>{device.name}</InfoTitle>
            <EditButton to="device-edit">editar</EditButton>
          </InfoLeft>
          <InfoRight>
            <Circle status="online" />
            online
          </InfoRight>
        </HeaderContent>
      </Header>
      <DetailsPanel>
        <DetailsPanelLeft>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              <span>
                {data.temperatura.datasets[0].data &&
                  data.temperatura.datasets[0].data[0]}{" "}
                ºC
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <Doughnut
                width={isMobile ? 30 : 40}
                data={data.temperatura}
                options={doughnutOptions}
              />
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              <span>
                {data.temperatura.datasets[0].data &&
                  data.temperatura.datasets[0].data[0]}{" "}
                ºC
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <Doughnut
                width={isMobile ? 30 : 40}
                data={data.temperatura}
                options={doughnutOptions}
              />
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              <span>
                {data.temperatura.datasets[0].data &&
                  data.temperatura.datasets[0].data[0]}{" "}
                ºC
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <Doughnut
                width={isMobile ? 30 : 40}
                data={data.temperatura}
                options={doughnutOptions}
              />
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              <span>
                {data.temperatura.datasets[0].data &&
                  data.temperatura.datasets[0].data[0]}{" "}
                ºC
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <Doughnut
                width={isMobile ? 30 : 40}
                data={data.temperatura}
                options={doughnutOptions}
              />
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              <span>
                {data.temperatura.datasets[0].data &&
                  data.temperatura.datasets[0].data[0]}{" "}
                ºC
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <Doughnut
                width={isMobile ? 30 : 40}
                data={data.temperatura}
                options={doughnutOptions}
              />
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              <span>
                {data.temperatura.datasets[0].data &&
                  data.temperatura.datasets[0].data[0]}{" "}
                ºC
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <Doughnut
                width={isMobile ? 30 : 40}
                data={data.temperatura}
                options={doughnutOptions}
              />
            </DetailsItemRight>
          </DetailsItem>
          <DetailsItem>
            <DetailsItemLeft>
              <h3>Temperatura</h3>
              <span>
                {data.temperatura.datasets[0].data &&
                  data.temperatura.datasets[0].data[0]}{" "}
                ºC
              </span>
            </DetailsItemLeft>
            <DetailsItemRight>
              <Doughnut
                width={isMobile ? 30 : 40}
                data={data.temperatura}
                options={doughnutOptions}
              />
            </DetailsItemRight>
          </DetailsItem>
        </DetailsPanelLeft>
        <DetailsPanelRight>
          {center.lat && false && (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_MAPS_API_KEY,
              }}
              defaultCenter={center}
              defaultZoom={15}
            >
              <MakerMap lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
          )}
        </DetailsPanelRight>
      </DetailsPanel>
      <Footer>cadastrado em 26/08/2020 às 13:25h</Footer>
    </>
  );
}
