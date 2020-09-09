import styled from "styled-components";
import themeData from "../../assets/theme/theme";
import { Link } from "react-router-dom";

export const Background = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  backdrop-filter: blur(10.684100151062012px);
  --webkit-backdrop-filter: blur(10.684100151062012px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  animation: fade-in-back 300ms;
  @keyframes fade-in-back {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &.close-menu {
    animation: fade-out-back 300ms forwards;
    @keyframes fade-out-back {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
`;
export const CloseButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  line {
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    line {
      stroke: ${themeData.colors.lightGrayLight};
    }
    line:first-child {
      transform: translate(1680px, 84.5px);
    }
    line:nth-child(2) {
      transform: translate(1695px, 98.25px);
    }
  }
`;
export const Aside = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: ${themeData.colors.background};
  width: 25vw;
  height: 100vh;
  overflow: hidden;
  padding: 40px;
  animation: move 300ms;
  @keyframes move {
    from {
      opacity: 0;
      transform: translateX(150px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  &.close-menu {
    animation: close 300ms forwards;
    @keyframes close {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(150px);
      }
    }
  }
  svg {
    width: 30px;
  }
  h3 {
    text-transform: uppercase;
    font-size: 1.2rem;
    margin-top: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.09rem;
  }
  hr {
    margin-bottom: 0.3rem;
  }
  span {
    font-size: 1rem;
    font-weight: 200;
  }
  ul {
    margin-top: 40px;
    list-style-type: none;
  }
  @media screen and (max-width: 700px) {
    width: 100vw;
  }
`;
export const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${(props) =>
    props.active === "true"
      ? themeData.colors.background
      : themeData.colors.lightGrayDark};
  height: 50px;
  width: 100%;
  background-color: ${(props) =>
    props.active === "true"
      ? themeData.colors.greenDark
      : themeData.colors.gray};
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  text-transform: uppercase;
  svg path {
    fill: ${(props) =>
      props.active === "true"
        ? themeData.colors.background
        : themeData.colors.lightGrayDark};
  }
  &:hover {
    color: ${themeData.colors.background};
    background-color: ${themeData.colors.greenDark};
    svg path {
      fill: ${themeData.colors.background};
    }
  }
  .menuIcon {
    margin-right: 20px;
    width: 28px;
  }
  .menuPage {
    flex: 1;
    font-weight: 500;
  }
`;

export const Logout = styled.button`
  border: 0;
  outline: 0;
  text-decoration: none;
  cursor: pointer;
  color: ${themeData.colors.lightGrayDark};
  height: 50px;
  width: 100%;
  background-color: ${themeData.colors.gray};
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  text-transform: uppercase;
  svg path {
    fill: ${themeData.colors.lightGrayDark};
  }
  &:hover {
    background-color: ${themeData.colors.orangeDark};
  }
  .menuIcon {
    margin-right: 20px;
    width: 28px;
  }
  .menuPage {
    flex: 1;
    font-weight: 500;
    text-align: left;
  }
`;
