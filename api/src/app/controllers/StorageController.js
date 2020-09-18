const moment = require("moment-timezone");
const ErrorsCatalog = require("../utils/ErrorsCatalog");
const StoragesRepositories = require("../repositories/StoragesRepositories");

class StorageController {
  async index(req, res) {
    const { tipo } = req.params;
    const allowDataType = [
      "alerta",
      "temperatura",
      "movimentacao",
      "umidade",
      "tensao",
      "luminosidade",
      "rele",
    ];
    if (!allowDataType.includes(tipo)) {
      return res.json(ErrorsCatalog.storage.typeNotAllowed);
    }

    const { id, rangeType, data, dataInicio, dataFim } = req.body;

    if (!id || !rangeType) return res.json(ErrorsCatalog.storage.invalidData);

    let responseData = [];

    switch (rangeType) {
      case "hoje": {
        const hoje = moment().format("YYYY-MM-DD");

        if (tipo === "alerta" || tipo === "movimentacao" || tipo === "rele") {
          const hours = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
          ];
          try {
            responseData = await Promise.all(
              hours.map(async (item) => {
                const databaseResponse = await StoragesRepositories.listAlertAndMovimentoByDateHour(
                  `dados_${tipo}`,
                  hoje,
                  item,
                  id
                );
                return {
                  hora: `${item}:00`,
                  data: hoje,
                  quantidade: databaseResponse.count,
                };
              })
            );
          } catch (error) {
            return res.json(ErrorsCatalog.server(error));
          }
        } else {
          try {
            responseData = await StoragesRepositories.listStorageByDate(
              `dados_${tipo}`,
              hoje,
              id
            );
            if (responseData.length > 0) {
              responseData = responseData.map((item) => ({
                valor: item.valor,
                hora: moment(item.createdAt).format("HH:m"),
                data: hoje,
              }));
            }
          } catch (error) {
            return res.json(ErrorsCatalog.server(error));
          }
        }
        return res.json(responseData);
      }
      case "data": {
        if (!data) return res.json(ErrorsCatalog.storage.invalidData);
        const validateDate = moment(data, "YYYY-MM-DD", true);

        if (!validateDate.isValid())
          return res.json(ErrorsCatalog.storage.invalidData);
        if (tipo === "alerta" || tipo === "movimentacao" || tipo === "rele") {
          const hours = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
          ];
          try {
            responseData = await Promise.all(
              hours.map(async (item) => {
                const databaseResponse = await StoragesRepositories.listAlertAndMovimentoByDateHour(
                  `dados_${tipo}`,
                  data,
                  item,
                  id
                );
                return {
                  hora: `${item}:00`,
                  data,
                  quantidade: databaseResponse.count,
                };
              })
            );
          } catch (error) {
            return res.json(ErrorsCatalog.server(error));
          }
        } else {
          try {
            responseData = await StoragesRepositories.listStorageByDate(
              `dados_${tipo}`,
              data,
              id
            );
            if (responseData.length > 0) {
              responseData = responseData.map((item) => ({
                valor: item.valor,
                hora: moment(item.createdAt).format("HH:m"),
                data,
              }));
            }
          } catch (error) {
            return res.json(ErrorsCatalog.server(error));
          }
        }
        return res.json(responseData);
      }
      case "periodo": {
        if (!dataInicio || !dataFim)
          return res.json(ErrorsCatalog.storage.invalidData);
        const validateDateInicio = moment(dataInicio, "YYYY-MM-DD", true);
        if (!validateDateInicio.isValid())
          return res.json(ErrorsCatalog.storage.invalidData);
        const validateDateFim = moment(dataFim, "YYYY-MM-DD", true);
        if (!validateDateFim.isValid())
          return res.json(ErrorsCatalog.storage.invalidData);
        if (dataInicio === dataFim)
          return res.json(ErrorsCatalog.storage.dateEqual);
        if (validateDateInicio.isAfter(validateDateFim))
          return res.json(ErrorsCatalog.storage.dateAfter);

        if (tipo === "alerta" || tipo === "movimentacao" || tipo === "rele") {
          try {
            responseData = await StoragesRepositories.listAlertAndMovimentoByPeriod(
              `dados_${tipo}`,
              dataInicio,
              dataFim,
              id
            );
            if (responseData.length > 0) {
              responseData = responseData.map((item) => ({
                data: moment(item.createdAt).format("YYYY-MM-DD"),
                quantidade: item.count,
              }));
            }
          } catch (error) {
            return res.json(ErrorsCatalog.server(error));
          }
        } else {
          try {
            responseData = await StoragesRepositories.listStorageByPeriodo(
              `dados_${tipo}`,
              dataInicio,
              dataFim,
              id
            );
            if (responseData.length > 0) {
              responseData = responseData.map((item) => ({
                data: moment(item.createdAt).format("YYYY-MM-DD"),
                quantidade: parseFloat(item.count).toFixed(2),
              }));
            }
          } catch (error) {
            return res.json(ErrorsCatalog.server(error));
          }
        }
        return res.json(responseData);
      }
      default:
        return res.json(ErrorsCatalog.storage.invalidData);
    }
  }

  async store(req, res) {
    const { tipo } = req.params;
    const allowDataType = [
      "alerta",
      "temperatura",
      "movimentacao",
      "luminosidade",
      "umidade",
      "tensao",
      "rele",
    ];

    if (!allowDataType.includes(tipo)) {
      return res.json(ErrorsCatalog.storage.typeNotAllowed);
    }

    const { id, valor } = req.body;

    if (!id || !valor) return res.json(ErrorsCatalog.storage.invalidData);

    const dado = `dados_${tipo}`;

    try {
      const data = await StoragesRepositories.create({
        dado,
        id,
        valor: parseFloat(valor),
      });
      res.json({ dataId: data[0] });
    } catch (error) {
      res.json(ErrorsCatalog.server(error));
    }
  }
}
module.exports = new StorageController();
