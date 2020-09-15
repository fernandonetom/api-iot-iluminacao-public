import styled from "styled-components";
import themeData from "../../assets/theme/theme";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  backdrop-filter: blur(10.684100151062012px);
  --webkit-backdrop-filter: blur(10.684100151062012px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  h1 {
    margin-top: 2.5rem;
    font-weight: 300;
    span {
      margin-left: 0.1rem;
    }
  }
  svg {
    animation: pulse 500ms infinite alternate ease-in-out;
    path {
      fill: ${themeData.colors.greenDark};
    }
    @keyframes pulse {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.2);
      }
    }
  }
`;
