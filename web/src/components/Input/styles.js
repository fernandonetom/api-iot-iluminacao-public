import styled from "styled-components";
import themeData from "../../assets/theme/theme";

export const Container = styled.div`
  position: relative;
  input {
    border: 0;
    background-color: ${themeData.colors.backgroundLight};
    border-bottom: 1px solid transparent;
    outline: none;
    width: ${(props) => (props.width ? props.width : "auto")};
    height: 50px;
    font-size: 1rem;
    padding: 30px 10px 13px 10px;
    color: ${themeData.colors.lightGrayDark};
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -webkit-appearance: none;
    border-radius: 3px;
    font-weight: 300;
    letter-spacing: 0.1rem;

    &:focus {
      border-bottom: 1px solid ${themeData.colors.lightGrayDark};
    }

    &::placeholder {
      color: transparent;
    }
    &:required:invalid + label {
      color: red;
    }
    &:focus:required:invalid {
      border-bottom: 2px solid red;
    }
    &:required:invalid + label:before {
      content: "*";
    }
    &:focus + label,
    &:not(:placeholder-shown) + label {
      font-size: 0.7rem;
      font-weight: 300;
      margin-top: 5px;
      color: ${themeData.colors.greenDark};
    }
  }
  label {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 15px;
    font-weight: 300;
    margin-left: 10px;
    color: ${themeData.colors.lightGrayDark};
    font-size: 0.9rem;
    letter-spacing: 0.07rem;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
  }
`;