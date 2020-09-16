import moment from "moment";
moment().locale("pt-br");

const DateToStringFormat = (date) => {
  return moment(date).format("DD [de] MMMM [de] YYYY [às] HH:mm[h]");
};
export { DateToStringFormat };
