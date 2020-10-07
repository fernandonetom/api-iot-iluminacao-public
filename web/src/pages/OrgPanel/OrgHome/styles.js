import styled from "styled-components";
import themeData from "../../../assets/theme/theme";
export const DashboardTitle = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 40px auto;
  @media screen and (max-width: 1120px) {
    padding: 0 20px;
    margin: 20px auto;
  }
`;
export const Content = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 20px auto;
  @media screen and (max-width: 770px) {
    padding: 0 20px;
  }
`;
export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "admin users graph graph"
    "dispo regis graph graph"
    "access-days access-days access-month access-month";
  grid-template-columns: 1fr 1fr 2fr;
  grid-gap: 40px;
  @media screen and (max-width: 1120px) {
    grid-gap: 20px;
  }
  @media screen and (max-width: 1000px) {
    grid-template-areas:
      "admin graph"
      "users graph"
      "dispo graph"
      "regis graph"
      "access-days access-month";
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 770px) {
    grid-template-areas:
      "admin"
      "users"
      "dispo"
      "regis"
      "graph"
      "access-days"
      "access-month";
    grid-template-columns: 100%;
  }
`;
export const Block = styled.div`
  grid-area: ${(props) => props.area};
  background-color: ${themeData.colors.gray};
  border-radius: 5px;
  padding: 15px 25px;
`;
export const Title = styled.span`
  font-size: 0.85rem;
  font-weight: 300;
`;
export const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 1rem;
  svg {
    height: 55px;
    path {
      fill: ${themeData.colors.lightGrayDark};
    }
  }
`;
export const LabelText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;
export const BlockAccess = styled.div`
  background-color: ${themeData.colors.gray};
  border-radius: 5px;
  padding: 15px 25px;
  margin-top: 40px;
`;
export const LoadingShimmer = styled.div`
  height: 280px;
  background: ${themeData.colors.gray};
  background-image: linear-gradient(
    to right,
    ${themeData.colors.gray} 0%,
    ${themeData.colors.grayLight} 20%,
    ${themeData.colors.gray} 40%,
    ${themeData.colors.gray} 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: ease-in-out;

  @keyframes placeholderShimmer {
    0% {
      background-position: -600px 0;
    }

    100% {
      background-position: 600px 0;
    }
  }
  @media screen and (max-width: 700px) {
    height: 100px;
    -webkit-animation-duration: 1.5s;
  }
`;
