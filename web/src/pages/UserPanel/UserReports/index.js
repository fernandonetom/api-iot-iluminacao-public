import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Header from "../../../components/Header";
import InfoTitle from "../../../components/InfoTitle";
import Radio from "../../../components/Radio";
//import { jsPDF } from "jspdf";
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
  formatDateLabel,
} from "../../../utils/dataFormatter";
import { alertMovOptions, typeOptions } from "../../../utils/reportsConfigs";
import GlobalLoading from "../../../components/GlobalLoading";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { randomColors } from "../../../utils/randomColors";
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
  const [print] = useState(false);
  const dados = [
    { id: "alerta", name: "Alerta" },
    { id: "temperatura", name: "Temperatura" },
    { id: "movimentacao", name: "Movimentação" },
    { id: "luminosidade", name: "Luminosidade" },
    { id: "umidade", name: "Umidade" },
    { id: "tensao", name: "Tensão" },
  ];

  const datesConfig = {
    dateFilter,
    dateStarterFilter,
    dateFinishFilter,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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

    response = response.map((item) => ({ ...item, color: randomColors() }));
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
  function handlePDF() {
    // setPrint(true);
    // var printContents = document.getElementById("dataCharts").innerHTML;
    // var originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // setPrint(false);
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
              <GerarPDF onClick={handlePDF}>Exportar para PDF</GerarPDF>
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
                selectedValues={config.selectedDevices}
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
                selectedValues={config.selectedTypes}
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
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
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
                    value={dateStarterFilter}
                    onChange={e => setDateStarterFilter(e.target.value)}
                  />
                </BoxItems>
                <BoxItems>
                  <Input
                    label="Data de fim"
                    name="data-fim"
                    type="date"
                    width="100%"
                    value={dateFinishFilter}
                    onChange={e => setDateFinishFilter(e.target.value)}
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
                  <BoxDataItem>
                    <Line
                      data={{
                        labels: formatLabelsMovAler(
                          period,
                          responseData,
                          "alerta"
                        ),
                        datasets: formatMovAler(
                          period,
                          responseData,
                          config.selectedDevices,
                          "alerta"
                        ),
                      }}
                      options={alertMovOptions(period, print)}
                    />
                  </BoxDataItem>
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
                  <BoxDataItem>
                    <Line
                      data={{
                        labels: formatLabelsMovAler(
                          period,
                          responseData,
                          "movimentacao"
                        ),
                        datasets: formatMovAler(
                          period,
                          responseData,
                          config.selectedDevices,
                          "movimentacao"
                        ),
                      }}
                      options={alertMovOptions(period, print)}
                    />
                  </BoxDataItem>
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
                  <BoxDataItem>
                    <Line
                      data={{
                        labels: formatLabelsMovAler(
                          period,
                          responseData,
                          "temperatura"
                        ),
                        datasets: formatMovAler(
                          period,
                          responseData,
                          config.selectedDevices,
                          "temperatura"
                        ),
                      }}
                      options={typeOptions(period, "temperatura", print)}
                    />
                  </BoxDataItem>
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
                  <BoxDataItem>
                    <Line
                      data={{
                        labels: formatLabelsMovAler(
                          period,
                          responseData,
                          "luminosidade"
                        ),
                        datasets: formatMovAler(
                          period,
                          responseData,
                          config.selectedDevices,
                          "luminosidade"
                        ),
                      }}
                      options={typeOptions(period, "luminosidade", print)}
                    />
                  </BoxDataItem>
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
                  <BoxDataItem>
                    <Line
                      data={{
                        labels: formatLabelsMovAler(
                          period,
                          responseData,
                          "umidade"
                        ),
                        datasets: formatMovAler(
                          period,
                          responseData,
                          config.selectedDevices,
                          "umidade"
                        ),
                      }}
                      options={typeOptions(period, "umidade", print)}
                    />
                  </BoxDataItem>
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
                  <BoxDataItem>
                    <Line
                      data={{
                        labels: formatLabelsMovAler(
                          period,
                          responseData,
                          "tensao"
                        ),
                        datasets: formatMovAler(
                          period,
                          responseData,
                          config.selectedDevices,
                          "tensao"
                        ),
                      }}
                      options={typeOptions(period, "tensão", print)}
                    />
                  </BoxDataItem>
                </BoxDataContent>
              </BoxData>
            )}
          </>
        )}
      </Container>
      {config.loadingData && <GlobalLoading />}
    </>
  );
}
