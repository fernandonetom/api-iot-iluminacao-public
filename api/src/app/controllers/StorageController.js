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
          try {
            responseData = await StoragesRepositories.listAlertAndMovimentoByDate(
              `dados_${tipo}`,
              hoje,
              id
            );

            const responseHours = responseData.map(function (item) {
              return item.hora;
            });

            const start = 0;
            const end = 23;

            for (var i = start; i <= end; i = i + 1) {
              if (!responseHours.includes(i))
                responseData.push({ hora: i, valor: 0 });
            }

            const result = responseData.sort(function (a, b) {
              return a.hora < b.hora ? -1 : a.hora > b.hora ? 1 : 0;
            });

            const resultEnd = result.map((item) => {
              return { ...item, hora: `${item.hora}:00`, data: hoje };
            });

            responseData = resultEnd;
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
            const responseHours = responseData.map(function (item) {
              return item.hora;
            });

            const start = 0;
            const end = 23;

            for (var i = start; i <= end; i = i + 1) {
              if (!responseHours.includes(i))
                responseData.push({ hora: i, valor: 0 });
            }

            const result = responseData.sort(function (a, b) {
              return a.hora < b.hora ? -1 : a.hora > b.hora ? 1 : 0;
            });

            const resultEnd = result.map((item) => {
              return { ...item, hora: `${item.hora}:00`, data: hoje };
            });

            responseData = resultEnd;
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
          try {
            responseData = await StoragesRepositories.listAlertAndMovimentoByDate(
              `dados_${tipo}`,
              data,
              id
            );

            const responseHours = responseData.map(function (item) {
              return item.hora;
            });

            const start = 0;
            const end = 23;

            for (var i = start; i <= end; i = i + 1) {
              if (!responseHours.includes(i))
                responseData.push({ hora: i, valor: 0 });
            }

            const result = responseData.sort(function (a, b) {
              return a.hora < b.hora ? -1 : a.hora > b.hora ? 1 : 0;
            });

            const resultEnd = result.map((item) => {
              return { ...item, hora: `${item.hora}:00`, data };
            });

            responseData = resultEnd;
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
            const responseHours = responseData.map(function (item) {
              return item.hora;
            });

            const start = 0;
            const end = 23;

            for (var i = start; i <= end; i = i + 1) {
              if (!responseHours.includes(i))
                responseData.push({ hora: i, valor: 0 });
            }

            const result = responseData.sort(function (a, b) {
              return a.hora < b.hora ? -1 : a.hora > b.hora ? 1 : 0;
            });

            const resultEnd = result.map((item) => {
              return { ...item, hora: `${item.hora}:00`, data };
            });

            responseData = resultEnd;
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
                valor: item.valor,
                data: moment(item.createdAt).format("YYYY-MM-DD"),
              }));
            }

            var returnedDays = responseData.map(function (item) {
              return item.data;
            });

            const start = new Date(dataInicio);
            const end = new Date(dataFim);
            start.setDate(start.getDate() + 1);
            end.setDate(end.getDate() + 1);

            for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
              const date = moment(d).format("YYYY-MM-DD");
              if (!returnedDays.includes(date))
                responseData.push({ valor: 0, data: date });
            }

            responseData = responseData.sort(function (a, b) {
              return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
            });
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
                valor: item.valor,
                data: moment(item.createdAt).format("YYYY-MM-DD"),
              }));
            }

            var returnedDays = responseData.map(function (item) {
              return item.data;
            });

            const start = new Date(dataInicio);
            const end = new Date(dataFim);
            start.setDate(start.getDate() + 1);
            end.setDate(end.getDate() + 1);

            for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
              const date = moment(d).format("YYYY-MM-DD");
              if (!returnedDays.includes(date))
                responseData.push({ valor: 0, data: date });
            }

            responseData = responseData.sort(function (a, b) {
              return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
            });
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
