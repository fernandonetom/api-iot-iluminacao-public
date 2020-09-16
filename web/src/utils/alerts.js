import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.scss";
import themeData from "../assets/theme/theme";

export const showSucess = (title, timer, message) => {
  Swal.fire({
    icon: "success",
    title: title || "Sucesso",
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
