import styled from "styled-components";
import { Multiselect } from "multiselect-react-dropdown";
import themeData from "../../../assets/theme/theme";

export const Container = styled.div`
  text-align: center;
  @media screen and (max-width: 700px) {
    padding: 0px 20px;
  }
`;
export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 300;
  margin: 20px auto;
  width: 100%;
  max-width: 500px;
  text-align: left;
  @media screen and (max-width: 700px) {
    margin: 20px 0;
  }
`;
export const BoxItems = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: left;
  margin: 25px auto;
`;

export const SelectDiv = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 30px auto;
  input {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: ${themeData.colors.lightGrayDark};
    font-size: 1rem;
    font-family: "Poppins";
    font-weight: 300;
    width: 100%;

    &::placeholder {
      color: ${themeData.colors.lightGrayDark};
      font-size: 1rem;
      font-family: "Poppins";
      font-weight: 300;
    }
  }
  #multiselectContainerReact {
    div {
      border: 0;
    }
    border-radius: 5px;
    border: 0;
    background-color: ${themeData.colors.gray};
  }
  ul {
    background-color: ${themeData.colors.redDark};
    font-size: 0.8rem;
  }
  li {
    background-color: ${themeData.colors.grayLight};
    font-size: 0.8rem;
  }
  li:hover {
    background-color: ${themeData.colors.greenDark};
    color: ${themeData.colors.background};
  }
  .chip {
    background: ${themeData.colors.greenDark};
    font-size: 0.9rem;
    font-weight: 500;
    color: ${themeData.colors.background};
    display: inline-flex;
    align-items: center;
    i {
      font-size: 1rem;
      margin-top: -3px;
      color: ${themeData.colors.gray};
      &:hover {
        color: ${themeData.colors.redDark};
      }
    }
  }
`;
export const MultiSelect = styled(Multiselect)``;
export const SelecPeriod = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const SubmitButton = styled.button`
  border: 0;
  outline: 0;
  height: 40px;
  width: 200px;
  text-align: center;
  line-height: 40px;
  vertical-align: center;
  color: ${themeData.colors.background};
  background-color: ${themeData.colors.greenDark};
  text-transform: uppercase;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin-top: 20px;
  @media screen and (min-width: 700px) {
    &:hover {
      background-color: ${themeData.colors.greenLight};
      transform: scale(1.05);
    }
  }
`;
export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (max-width: 700px) {
    padding: 0 20px;
    flex-direction: column;
  }
`;
export const InfoRight = styled.div``;
export const InfoLeft = styled.div`
  text-align: left;
  @media screen and (max-width: 700px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;
export const GerarPDF = styled.button`
  border: 0;
  outline: 0;
  background-color: ${themeData.colors.orange};
  padding: 5px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 300;
  margin-right: 10px;
  &:hover {
    background-color: ${themeData.colors.orangeLight};
  }
`;
export const NovaBusca = styled.button`
  border: 0;
  outline: 0;
  background-color: ${themeData.colors.greenDark};
  padding: 5px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 300;
  &:hover {
    background-color: ${themeData.colors.greenLight};
  }
`;
export const BoxData = styled.div`
  width: 100%;
  max-width: 1280px;
  background-color: ${themeData.colors.gray};
  margin: 0 auto;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 700px) {
  }
`;
export const BoxDataHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const BoxDataTitle = styled.h3`
  font-size: 1rem;
  font-weight: 300;
`;
export const BoxDataPeriod = styled.h4`
  font-size: 1rem;
  font-weight: 300;
`;
export const BoxDataContent = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  @media screen and (max-width: 1270px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const BoxDataItem = styled.div``;
export const ErrorBox = styled.div`
  color: ${themeData.colors.redLight};
  font-size: 1rem;
  text-align: left;
  text-transform: uppercase;
  font-weight: 500;
`;
