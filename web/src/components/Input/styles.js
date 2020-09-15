import styled from "styled-components";
import themeData from "../../assets/theme/theme";

export const Container = styled.div`
  position: relative;
  input {
    background-color: ${(props) =>
      props.bgColor ? props.bgColor : themeData.colors.backgroundLight};
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
    font-family: "Poppins";
    font-weight: 300;
    border: ${(props) =>
      props.error ? `1px solid ${themeData.colors.orange}` : 0};

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
  input[type="date"] {
    font-family: "Poppins";
    font-size: 1rem;
    &:focus {
      ::-webkit-datetime-edit-month-field:focus {
        background-color: ${themeData.colors.greenDark};
      }
      ::-webkit-datetime-edit-day-field:focus {
        background-color: ${themeData.colors.greenDark};
      }
      ::-webkit-datetime-edit-year-field:focus {
        background-color: ${themeData.colors.greenDark};
      }
    }
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    font-size: 1.3rem;
    background-color: ${themeData.colors.greenDark};
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: ${themeData.colors.green};
      transform: scale(1.1);
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
