import styled from "styled-components";
import themeData from "../../../assets/theme/theme";
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from "react-router-dom";
export const LoadingSpinner = styled(PuffLoader).attrs({
  color: themeData.colors.orangeLight,
  size: 40,
})``;
export const InfoLeft = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 700px) {
    flex: 1;
  }
`;
export const BackButton = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
  margin-right: 20px;
  svg {
    width: 20px;
  }
`;
export const EditButton = styled.button`
  border: 0;
  outline: 0;
  background-color: ${themeData.colors.greenDark};
  cursor: pointer;
  margin-left: 20px;
  padding: 5px 15px;
  border-radius: 10px;
  color: ${themeData.colors.background};
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: capitalize;
  &:hover {
    background-color: ${themeData.colors.greenLight};
  }
  @media screen and (max-width: 700px) {
    margin-left: auto;
  }
`;
export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    padding: 0 20px;
  }
`;
export const InfoRight = styled.div`
  margin-left: 20px;
  padding: 5px 10px;
  min-width: 106px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 300;
  background-color: ${themeData.colors.gray};
  color: ${themeData.colors.lightGrayDark};
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
export const Circle = styled.div`
  background-color: ${(props) =>
    props.status === "online"
      ? themeData.colors.greenLight
      : props.status === "wait"
      ? themeData.colors.orange
      : themeData.colors.redDark};
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  margin-right: 10px;
`;
export const DetailsPanel = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  @media screen and (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    padding: 0 20px;
    padding-top: 20px;
  }
  .toolTipSuccess {
    color: ${themeData.colors.background} !important;
    background-color: ${themeData.colors.greenDark} !important;
    font-size: 0.9rem !important;
    font-weight: 500;
    &.place-bottom {
      &:after {
        border-bottom-color: ${themeData.colors.greenDark} !important;
        border-bottom-style: solid !important;
        border-bottom-width: 6px !important;
      }
    }
  }
  .toolTipWarn {
    color: ${themeData.colors.background} !important;
    background-color: ${themeData.colors.blue} !important;
    font-size: 0.9rem !important;
    font-weight: 500;
    &.place-bottom {
      &:after {
        border-bottom-color: ${themeData.colors.blue} !important;
        border-bottom-style: solid !important;
        border-bottom-width: 6px !important;
      }
    }
  }
`;
export const DetailsPanelLeft = styled.div`
  width: 60%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 40px;
  margin-right: 40px;

  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 700px) {
    grid-column-gap: 20px;
    width: 100%;
  }
  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const DetailsItem = styled.div`
  height: 80px;
  background-color: ${themeData.colors.gray};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  @media screen and (max-width: 700px) {
    padding: 0 15px;
    width: 100%;
  }
`;
export const DetailsItemLeft = styled.div`
  letter-spacing: 0.06rem;
  text-transform: capitalize;
  h3 {
    font-size: 1rem;
    font-weight: 200;
  }
  span {
    font-size: 0.9rem;
    font-weight: 300;
  }
  span.wait {
    color: ${themeData.colors.orangeLight};
    font-size: 0.8rem;
  }
  @media screen and (max-width: 700px) {
    h3 {
      font-size: 0.8rem;
    }
    span {
      font-size: 0.8rem;
      line-height: 1.5rem;
    }
  }
`;
export const DetailsItemRight = styled.div`
  svg {
    ${(props) => (props.type === "light" ? "" : "cursor: pointer;")}
    width: ${(props) => (props.type === "light" ? "30px" : "40px")};
    path {
      fill: ${(props) =>
        props.status
          ? themeData.colors.greenDark
          : themeData.colors.lightGrayDark};
    }
  }
`;
export const DetailsPanelRight = styled.div`
  flex: 1;
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 250px;
    margin-top: 20px;
  }
`;
export const MapInfo = styled.div`
  flex: 1;
  background-color: ${themeData.colors.gray};
  height: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  svg {
    margin-right: 1rem;
    path {
      fill: ${themeData.colors.orangeLight};
    }
  }
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 250px;
    margin-top: 20px;
  }
`;
export const Maker = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
`;
export const Footer = styled.div`
  text-align: right;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  font-weight: 200;
  font-size: 1rem;
  margin-top: 20px;
  @media screen and (max-width: 700px) {
    padding: 0 20px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    text-align: center;
    padding: 30px 0;
  }
`;
