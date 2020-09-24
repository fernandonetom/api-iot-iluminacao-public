const formatMovAler = (periodo, dados, label, type) => {
  return dados.map((item, index) => {
    return {
      label: label[index].name,
      backgroundColor: item.color,
      borderColor: item.color,
      data: item[type].map((dado) => dado.valor),
      fill: false,
    };
  });
};
const formatLabelsMovAler = (periodo, dados, type) => {
  switch (periodo) {
    case "hoje":
    case "data":
      return dados[0][type].map((item) => item.hora);
    case "periodo":
      return dados[0][type].map((item) => dateToString(item.data));
    default:
      return null;
  }
};

const formatDateLabel = (periodo, date) => {
  switch (periodo) {
    case "hoje":
      return `${dateToString(date.dateFilter)}`;
    case "data":
      return `${dateToString(date.dateFilter)}`;
    case "periodo":
      return `de ${dateToString(date.dateStarterFilter)} à ${dateToString(
        date.dateFinishFilter
      )}`;
    default:
      return null;
  }
};

const dateToString = (date) => {
  let dateArray = date.split("-");
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
};
export { formatMovAler, formatLabelsMovAler, dateToString, formatDateLabel };
