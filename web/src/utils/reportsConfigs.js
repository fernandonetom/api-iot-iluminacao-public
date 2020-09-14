import themeData from "../assets/theme/theme";

const alertMovOptions = (periodo) => {
  switch (periodo) {
    case "hoje":
    case "data":
      return {
        legend: {
          labels: {
            fontColor: themeData.colors.lightGray,
          },
        },
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "horário",
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "quantidade",
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
        },
      };
    case "periodo":
      return {
        legend: {
          labels: {
            fontColor: themeData.colors.lightGray,
          },
        },
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "data",
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "quantidade",
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
        },
      };
    default:
      return null;
  }
};
const typeOptions = (periodo, label) => {
  switch (periodo) {
    case "hoje":
    case "data":
      return {
        legend: {
          labels: {
            fontColor: themeData.colors.lightGray,
          },
        },
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "horário",
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: label,
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
        },
      };
    case "periodo":
      return {
        legend: {
          labels: {
            fontColor: themeData.colors.lightGray,
          },
        },
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "data",
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "valor",
                fontColor: themeData.colors.lightGray,
              },
              ticks: {
                fontColor: themeData.colors.lightGrayDark,
              },
            },
          ],
        },
      };
    default:
      return null;
  }
};

export { alertMovOptions, typeOptions };
