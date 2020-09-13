import styled from "styled-components";
import { Multiselect } from "multiselect-react-dropdown";
import themeData from "../../../assets/theme/theme";

export const Container = styled.div`
  text-align: center;
`;
export const Title = styled.span`
  font-size: 1rem;
  font-weight: 300;
`;
export const BoxItems = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: left;
  margin: 0 auto;
`;

export const SelectDiv = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 30px auto;
  @media screen and (max-width: 700px) {
    padding: 0 20px;
  }
  input {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
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
    border: none;
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
