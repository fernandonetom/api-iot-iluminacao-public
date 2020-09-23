import themeData from "../assets/theme/theme";

const alertMovOptions = (periodo, print) => {
  switch (periodo) {
    case "hoje":
    case "data":
      return {
        legend: {
          labels: {
            fontColor: print
              ? themeData.colors.backgroundDark
              : themeData.colors.lightGray,
            fontSize: 15,
            fontWeight: 300,
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
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                beginAtZero: true,
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "quantidade",
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                beginAtZero: true,
                fontSize: 15,
              },
            },
          ],
        },
      };
    case "periodo":
      return {
        legend: {
          labels: {
            fontColor: print
              ? themeData.colors.backgroundDark
              : themeData.colors.lightGray,
            fontSize: 15,
            fontWeight: 300,
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
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "quantidade",
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                fontSize: 15,
              },
            },
          ],
        },
      };
    default:
      return null;
  }
};
const typeOptions = (periodo, label, print) => {
  switch (periodo) {
    case "hoje":
    case "data":
      return {
        legend: {
          labels: {
            fontColor: print
              ? themeData.colors.backgroundDark
              : themeData.colors.lightGray,
            fontSize: 15,
            fontWeight: 300,
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
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: label,
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                beginAtZero: true,
                fontSize: 15,
              },
            },
          ],
        },
      };
    case "periodo":
      return {
        legend: {
          labels: {
            fontColor: print
              ? themeData.colors.backgroundDark
              : themeData.colors.lightGray,
            fontSize: 15,
            fontWeight: 300,
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
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "valor",
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGray,
                fontSize: 15,
              },
              ticks: {
                fontColor: print
                  ? themeData.colors.backgroundDark
                  : themeData.colors.lightGrayDark,
                beginAtZero: true,
                fontSize: 15,
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
