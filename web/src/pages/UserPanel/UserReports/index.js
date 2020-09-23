import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Header from "../../../components/Header";
import InfoTitle from "../../../components/InfoTitle";
import Radio from "../../../components/Radio";
import moment from "moment";
import {
  BoxItems,
  Container,
  Title,
  MultiSelect,
  SelectDiv,
  SelecPeriod,
  SubmitButton,
  HeaderContent,
  InfoLeft,
  InfoRight,
  GerarPDF,
  NovaBusca,
  BoxData,
  BoxDataHeader,
  BoxDataTitle,
  BoxDataPeriod,
  BoxDataContent,
  BoxDataItem,
  ErrorBox,
} from "./styles";
import { Line } from "react-chartjs-2";
import {
  formatLabelsMovAler,
  formatMovAler,
  formatTypesValues,
  formatDateLabel,
} from "../../../utils/dataFormatter";
import { alertMovOptions, typeOptions } from "../../../utils/reportsConfigs";
import LoadingStorage from "../../../components/LoadingStorage";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
export default function UserReports() {
  const history = useHistory();
  const [period, setPeriod] = useState("hoje");
  const [dateFilter, setDateFilter] = useState(moment().format("YYYY-MM-DD"));
  const [dateStarterFilter, setDateStarterFilter] = useState("");
  const [dateFinishFilter, setDateFinishFilter] = useState("");
  const [config, setConfig] = useState({
    showFilters: true,
    selectedDevices: [],
    selectedTypes: [],
    loadingData: false,
  });
  const [devices, setDevices] = useState([]);
  const [erros, setErros] = useState({
    devices: null,
    options: null,
  });
  const [responseData, setResponseData] = useState([]);
  const dados = [
    { id: "alerta", name: "Alerta" },
    { id: "temperatura", name: "Temperatura" },
    { id: "movimentacao", name: "Movimentação" },
    { id: "luminosidade", name: "Luminosidade" },
    { id: "umidade", name: "Umidade" },
    { id: "tensao", name: "Tensão" },
  ];

  // const responseData = [
  //   {
  //     id: 2,
  //     alerta: [
  //       { hora: "0:00", data: "2020-09-01", quantidade: 1 },
  //       { hora: "1:00", data: "2020-09-01", quantidade: 4 },
  //       { hora: "2:00", data: "2020-09-01", quantidade: 5 },
  //     ],
  //     movimentacao: [
  //       { hora: "0:00", data: "2020-09-01", quantidade: 1 },
  //       { hora: "1:00", data: "2020-09-01", quantidade: 4 },
  //       { hora: "2:00", data: "2020-09-01", quantidade: 5 },
  //     ],
  //     temperatura: [
  //       { valor: 25.6, hora: "20:00", data: "2020-09-01" },
  //       { valor: 25.6, hora: "21:00", data: "2020-09-01" },
  //     ],
  //     luminosidade: [
  //       { valor: 90, hora: "20:00", data: "2020-09-01" },
  //       { valor: 80, hora: "21:00", data: "2020-09-01" },
  //     ],
  //     umidade: [
  //       { valor: 90, hora: "20:00", data: "2020-09-01" },
  //       { valor: 91, hora: "21:00", data: "2020-09-01" },
  //       { valor: 87, hora: "22:00", data: "2020-09-01" },
  //     ],
  //     tensao: [
  //       { valor: 12.2, hora: "20:00", data: "2020-09-01" },
  //       { valor: 12.6, hora: "21:00", data: "2020-09-01" },
  //       { valor: 12.5, hora: "22:00", data: "2020-09-01" },
  //     ],
  //   },
  // ];
  const datesConfig = {
    dateFilter,
    dateStarterFilter,
    dateFinishFilter,
  };

  useEffect(() => {
    getDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getDevices() {
    try {
      setConfig({ ...config, loadingData: true });
      const { data } = await api.get("mqttusers/home");
      setConfig({ ...config, loadingData: false });
      if (data.error) {
        toast.error(data.message);
        return history.pushState("/");
      }
      return setDevices(data);
    } catch (error) {}
  }
  function handlePeriod(option) {
    setPeriod(option.target.value);
    if (option.target.value === "hoje") {
      setDateFilter(moment().format("YYYY-MM-DD"));
    }
  }
  async function handleFilters() {
    if (config.selectedDevices.length === 0) {
      return setErros({
        options: null,
        devices: "Selecione pelo menos um dispositivo",
      });
    }
    if (config.selectedTypes.length === 0) {
      return setErros({
        devices: null,
        options: "Selecione pelo menos um dado",
      });
    }
    setConfig({ ...config, loadingData: true });
    let response = [];

    await Promise.all(
      config.selectedDevices.map(async (device) => {
        let responseData = { id: device.id };
        await Promise.all(
          config.selectedTypes.map(async (tipo) => {
            const { data } = await api.post(`storage/list/${tipo.id}`, {
              id: device.id,
              rangeType: period,
              data: dateFilter,
              dataInicio: dateStarterFilter,
              dataFim: dateFinishFilter,
            });
            responseData = { ...responseData, [tipo.id]: data };
          })
        );
        response.push(responseData);
      })
    );
    setConfig({ ...config, loadingData: false });
    setResponseData(response);
    setConfig({ ...config, showFilters: false });
  }
  function handleDevicesAdd(selectedList) {
    setConfig({ ...config, selectedDevices: selectedList });
  }
  function handleDevicesRemove(selectedList) {
    setConfig({ ...config, selectedDevices: selectedList });
  }
  function handleTypesAdd(selectedList) {
    setConfig({ ...config, selectedTypes: selectedList });
  }
  function handleTypesRemove(selectedList) {
    setConfig({ ...config, selectedTypes: selectedList });
  }
  function handleNewSearch() {
    setConfig({ ...config, showFilters: true });
  }
  return (
    <>
      <Header active="relatórios" menuType="user">
        <HeaderContent>
          <InfoLeft>
            <InfoTitle>Relatórios</InfoTitle>
          </InfoLeft>
          {!config.showFilters && (
            <InfoRight>
              <GerarPDF>Exportar para PDF</GerarPDF>
              <NovaBusca onClick={handleNewSearch}>Nova busca</NovaBusca>
            </InfoRight>
          )}
        </HeaderContent>
      </Header>
      <Container>
        {!config.loadingData && config.showFilters && (
          <>
            <SelectDiv>
              {erros.devices && <ErrorBox>{erros.devices}</ErrorBox>}
              <MultiSelect
                id="devices"
                options={devices}
                displayValue="name"
                emptyRecordMsg="Nenhum resultado encontrado"
                placeholder="Selecione os dispositivos"
                closeIcon="cancel"
                onSelect={handleDevicesAdd}
                onRemove={handleDevicesRemove}
              />
            </SelectDiv>
            <SelectDiv>
              {erros.options && <ErrorBox>{erros.options}</ErrorBox>}
              <MultiSelect
                id="options-data"
                options={dados}
                displayValue="name"
                emptyRecordMsg="Nenhum resultado encontrado"
                placeholder="Selecione os dados"
                closeIcon="cancel"
                onSelect={handleTypesAdd}
                onRemove={handleTypesRemove}
              />
            </SelectDiv>
            <Title>Período</Title>
            <BoxItems>
              <SelecPeriod>
                <Radio
                  name="periodo"
                  label="Hoje"
                  value="hoje"
                  checked={period === "hoje" ? true : false}
                  onChange={handlePeriod}
                />
                <Radio
                  name="periodo"
                  label="Data"
                  value="data"
                  checked={period === "data" ? true : false}
                  onChange={handlePeriod}
                />
                <Radio
                  name="periodo"
                  label="Período"
                  value="periodo"
                  checked={period === "periodo" ? true : false}
                  onChange={handlePeriod}
                />
              </SelecPeriod>
            </BoxItems>

            {period === "data" && (
              <BoxItems>
                <Input
                  label="Data"
                  name="data"
                  type="date"
                  width="100%"
                  onChange={setDateFilter}
                />
              </BoxItems>
            )}

            {period === "periodo" && (
              <>
                <BoxItems>
                  <Input
                    label="Data de início"
                    name="data-inicio"
                    type="date"
                    width="100%"
                    onChange={setDateStarterFilter}
                  />
                </BoxItems>
                <BoxItems>
                  <Input
                    label="Data de fim"
                    name="data-fim"
                    type="date"
                    width="100%"
                    onChange={setDateFinishFilter}
                  />
                </BoxItems>
              </>
            )}
            <SubmitButton onClick={handleFilters}>Filtrar dados</SubmitButton>
          </>
        )}

        {!config.loadingData && !config.showFilters && (
          <>
            {responseData[0].alerta && (
              <BoxData>
                <BoxDataHeader>
                  <BoxDataTitle>Alertas</BoxDataTitle>
                  <BoxDataPeriod>
                    {formatDateLabel(period, datesConfig)}
                  </BoxDataPeriod>
                </BoxDataHeader>
                <BoxDataContent>
                  {responseData.map((item, index) => (
                    <BoxDataItem key={item.id}>
                      <Line
                        data={{
                          labels: formatLabelsMovAler(
                            period,
                            datesConfig,
                            item.alerta
                          ),
                          datasets: formatMovAler(
                            period,
                            item.alerta,
                            config.selectedDevices[index].name
                          ),
                        }}
                        options={alertMovOptions(period)}
                      />
                    </BoxDataItem>
                  ))}
                </BoxDataContent>
              </BoxData>
            )}

            {responseData[0].movimentacao && (
              <BoxData>
                <BoxDataHeader>
                  <BoxDataTitle>Movimentações</BoxDataTitle>
                  <BoxDataPeriod>
                    {formatDateLabel(period, datesConfig)}
                  </BoxDataPeriod>
                </BoxDataHeader>
                <BoxDataContent>
                  {responseData.map((item, index) => (
                    <BoxDataItem key={item.id}>
                      <Line
                        data={{
                          labels: formatLabelsMovAler(
                            period,
                            datesConfig,
                            item.movimentacao
                          ),
                          datasets: formatMovAler(
                            period,
                            item.alerta,
                            config.selectedDevices[index].name
                          ),
                        }}
                        options={alertMovOptions(period)}
                      />
                    </BoxDataItem>
                  ))}
                </BoxDataContent>
              </BoxData>
            )}

            {responseData[0].temperatura && (
              <BoxData>
                <BoxDataHeader>
                  <BoxDataTitle>Temperatura</BoxDataTitle>
                  <BoxDataPeriod>
                    {formatDateLabel(period, datesConfig)}
                  </BoxDataPeriod>
                </BoxDataHeader>
                <BoxDataContent>
                  {responseData.map((item, index) => (
                    <BoxDataItem key={item.id}>
                      <Line
                        data={{
                          labels: formatLabelsMovAler(
                            period,
                            datesConfig,
                            item.temperatura
                          ),
                          datasets: formatTypesValues(
                            period,
                            item.temperatura,
                            config.selectedDevices[index].name
                          ),
                        }}
                        options={typeOptions(period, "temperatura")}
                      />
                    </BoxDataItem>
                  ))}
                </BoxDataContent>
              </BoxData>
            )}

            {responseData[0].luminosidade && (
              <BoxData>
                <BoxDataHeader>
                  <BoxDataTitle>Luminosidade</BoxDataTitle>
                  <BoxDataPeriod>
                    {formatDateLabel(period, datesConfig)}
                  </BoxDataPeriod>
                </BoxDataHeader>
                <BoxDataContent>
                  {responseData.map((item, index) => (
                    <BoxDataItem key={item.id}>
                      <Line
                        data={{
                          labels: formatLabelsMovAler(
                            period,
                            datesConfig,
                            item.luminosidade
                          ),
                          datasets: formatTypesValues(
                            period,
                            item.luminosidade,
                            config.selectedDevices[index].name
                          ),
                        }}
                        options={typeOptions(period, "luminosidade")}
                      />
                    </BoxDataItem>
                  ))}
                </BoxDataContent>
              </BoxData>
            )}

            {responseData[0].umidade && (
              <BoxData>
                <BoxDataHeader>
                  <BoxDataTitle>Umidade</BoxDataTitle>
                  <BoxDataPeriod>
                    {formatDateLabel(period, datesConfig)}
                  </BoxDataPeriod>
                </BoxDataHeader>
                <BoxDataContent>
                  {responseData.map((item, index) => (
                    <BoxDataItem key={item.id}>
                      <Line
                        data={{
                          labels: formatLabelsMovAler(
                            period,
                            datesConfig,
                            item.umidade
                          ),
                          datasets: formatTypesValues(
                            period,
                            item.umidade,
                            config.selectedDevices[index].name
                          ),
                        }}
                        options={typeOptions(period, "umidade")}
                      />
                    </BoxDataItem>
                  ))}
                </BoxDataContent>
              </BoxData>
            )}

            {responseData[0].tensao && (
              <BoxData>
                <BoxDataHeader>
                  <BoxDataTitle>Tensão</BoxDataTitle>
                  <BoxDataPeriod>
                    {formatDateLabel(period, datesConfig)}
                  </BoxDataPeriod>
                </BoxDataHeader>
                <BoxDataContent>
                  {responseData.map((item, index) => (
                    <BoxDataItem key={item.id}>
                      <Line
                        data={{
                          labels: formatLabelsMovAler(
                            period,
                            datesConfig,
                            item.tensao
                          ),
                          datasets: formatTypesValues(
                            period,
                            item.tensao,
                            config.selectedDevices[index].name
                          ),
                        }}
                        options={typeOptions(period, "tensão")}
                      />
                    </BoxDataItem>
                  ))}
                </BoxDataContent>
              </BoxData>
            )}
          </>
        )}
      </Container>
      {config.loadingData && <LoadingStorage />}
    </>
  );
}
