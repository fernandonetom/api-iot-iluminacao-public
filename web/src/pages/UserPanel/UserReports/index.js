import React, { useState } from "react";
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
export default function UserReports() {
  const [period, setPeriod] = useState("hoje");
  const [dateFilter, setDateFilter] = useState(moment().format("YYYY-MM-DD"));
  const [dateStarterFilter, setDateStarterFilter] = useState("");
  const [dateFinishFilter, setDateFinishFilter] = useState("");
  const [config, setConfig] = useState({
    showFilters: true,
    selectedDevices: null,
    selectedTypes: null,
    loadingData: false,
  });
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
  const dados = [
    { id: "alerta", name: "Alerta" },
    { id: "temperatura", name: "Temperatura" },
    { id: "movimentacao", name: "Movimentação" },
    { id: "luminosidade", name: "Luminosidade" },
    { id: "umidade", name: "Umidade" },
    { id: "tensao", name: "Tensão" },
  ];

  const responseData = [
    {
      id: 2,
      alerta: [
        { hora: "0:00", data: "2020-09-01", quantidade: 1 },
        { hora: "1:00", data: "2020-09-01", quantidade: 4 },
        { hora: "2:00", data: "2020-09-01", quantidade: 5 },
      ],
      movimentacao: [
        { hora: "0:00", data: "2020-09-01", quantidade: 1 },
        { hora: "1:00", data: "2020-09-01", quantidade: 4 },
        { hora: "2:00", data: "2020-09-01", quantidade: 5 },
      ],
      temperatura: [
        { valor: 25.6, hora: "20:00", data: "2020-09-01" },
        { valor: 25.6, hora: "21:00", data: "2020-09-01" },
      ],
      luminosidade: [
        { valor: 90, hora: "20:00", data: "2020-09-01" },
        { valor: 80, hora: "21:00", data: "2020-09-01" },
      ],
      umidade: [
        { valor: 90, hora: "20:00", data: "2020-09-01" },
        { valor: 91, hora: "21:00", data: "2020-09-01" },
        { valor: 87, hora: "22:00", data: "2020-09-01" },
      ],
      tensao: [
        { valor: 12.2, hora: "20:00", data: "2020-09-01" },
        { valor: 12.6, hora: "21:00", data: "2020-09-01" },
        { valor: 12.5, hora: "22:00", data: "2020-09-01" },
      ],
    },
  ];
  const datesConfig = {
    dateFilter,
    dateStarterFilter,
    dateFinishFilter,
  };
  function handlePeriod(option) {
    setPeriod(option.target.value);
    if (option.target.value === "hoje") {
      setDateFilter(moment().format("YYYY-MM-DD"));
    }
  }
  function handleFilters() {
    setConfig({ ...config, loadingData: true });
    setDateFilter(dateFilter);
    setTimeout(() => {
      setConfig({ ...config, showFilters: false, loadingData: false });
    }, 500);
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
              <MultiSelect
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
              <MultiSelect
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
