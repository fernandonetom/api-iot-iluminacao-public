import themeData from "../assets/theme/theme";
function randomColor() {
  const arrayColors = ["#31AD84", "#BF3719", "#237F99", "#CC8139", "#EEEEEE"];

  return arrayColors[Math.floor(Math.random() * arrayColors.length)];
}
const formatMovAler = (periodo, dados, label) => {
  const color = randomColor();
  switch (periodo) {
    case "hoje":
    case "data":
      return [
        {
          label,
          backgroundColor: color,
          borderColor: color,
          data: dados.map((item) => item.quantidade),
          fill: false,
        },
      ];
    case "periodo":
      return [
        {
          label,
          backgroundColor: color,
          borderColor: color,
          data: dados.map((item) => item.quantidade),
          fill: false,
        },
      ];
    default:
      return null;
  }
};
const formatTypesValues = (periodo, dados, label) => {
  const color = randomColor();
  switch (periodo) {
    case "hoje":
    case "data":
      return [
        {
          label,
          backgroundColor: color,
          borderColor: color,
          data: dados.map((item) => item.valor),
          fill: false,
        },
      ];
    case "periodo":
      return [
        {
          label,
          backgroundColor: color,
          borderColor: color,
          data: dados.map((item) => item.valor),
          fill: false,
        },
      ];
    default:
      return null;
  }
};
const formatLabelsMovAler = (periodo, date, dados) => {
  switch (periodo) {
    case "hoje":
    case "data":
      return dados.map((item) => item.hora);
    case "periodo":
      return dados.map((item) => dateToString(item.data));
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
export {
  formatMovAler,
  formatLabelsMovAler,
  dateToString,
  formatDateLabel,
  formatTypesValues,
};
