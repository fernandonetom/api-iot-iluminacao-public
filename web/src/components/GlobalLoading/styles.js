import styled from "styled-components";
import themeData from "../../assets/theme/theme";

export const Container = styled.div`
  position: fixed;
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
    stroke: ${themeData.colors.lightGrayDark};
    fill: ${themeData.colors.background};
    stroke-width: 2px;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: dash 2s linear alternate infinite;

    path,
    text {
      animation: fill 2s ease-in-out alternate infinite 700ms;
      @keyframes fill {
        to {
          fill: ${themeData.colors.lightGrayDark};
        }
      }
    }
    @keyframes dash {
      to {
        stroke-dashoffset: 0;
      }
    }

    @media screen and (max-width: 1000px) {
      width: 200px;
    }
  }
`;
