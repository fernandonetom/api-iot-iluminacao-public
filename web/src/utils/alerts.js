import Swal from "sweetalert2/src/sweetalert2.js";
import "../assets/theme/modalTheme.scss";
import themeData from "../assets/theme/theme";
import moment from "moment-timezone";
export const showSucess = (title, timer, message) => {
  Swal.fire({
    icon: "success",
    title: title || "Sucesso",
    text: message,
    showConfirmButton: false,
    timer: timer,
  });
};
export const showError = (title, timer, message) => {
  Swal.fire({
    icon: "error",
    title: title || "Erro",
    text: message,
    showConfirmButton: false,
    timer: timer,
  });
};
export const deleteConfirm = async (title, message, onConfirm) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: themeData.colors.greenDark,
    cancelButtonColor: themeData.colors.orange,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sim, excluir!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
export const MqttInfo = (
  { id, name, username, password, latitude, longitude, createdAt, title },
  onConfirm
) => {
  Swal.fire({
    title: title || name,
    html: `
    <div style="display:flex; justify-content:center; font-size:0.9rem; line-height: 1.5rem;">
    <table style="width:100%">
          <tr style="width:50%">
            <td style="flex:1;">Usuário MQTT</td>
            <td>${username.slice(0, 7)}</td>
          </tr>
          <tr>
            <td>Senha MQTT</td>
            <td>${password.slice(0, 7)}</td>
          </tr>
          <tr>
            <td>Latitude</td>
            <td>${latitude || "Não cadastrado"}</td>
          </tr>
          <tr>
            <td>Longitude</td>
            <td>${longitude || "Não cadastrado"}</td>
          </tr>
          <tr>
            <td>Data de inclusão</td>
            <td>${moment(createdAt || undefined).format(
              "DD/MM/YYYY [às] HH:mm[h]"
            )}</td>
          </tr>
        </table>
    </div>
    `,
    icon: title ? "success" : "info",
    showCancelButton: false,
    confirmButtonColor: themeData.colors.greenDark,
    confirmButtonText: "Ok!",
  }).then((result) => {
    onConfirm && onConfirm();
  });
};
