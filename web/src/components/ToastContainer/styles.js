import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import themeData from "../../assets/theme/theme";

export const Container = styled(ToastContainer).attrs({
  closeButton: false,
})`
  .Toastify__toast-container {
  }
  .Toastify__toast {
    font-size: 0.95rem;
    font-weight: 300;
    font-family: "Poppins";
    line-height: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .Toastify__toast--error {
    background-color: ${themeData.colors.redDark};
    color: ${themeData.colors.lightGray};
  }
  .Toastify__toast--warning {
    background-color: ${themeData.colors.orange};
    color: ${themeData.colors.backgroundDark};
  }
  .Toastify__toast--info {
    background-color: ${themeData.colors.blue};
    color: ${themeData.colors.background};
  }
  .Toastify__toast--success {
    background-color: ${themeData.colors.greenDark};
    color: ${themeData.colors.backgroundDark};
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;
