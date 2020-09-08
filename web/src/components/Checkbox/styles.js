import styled from "styled-components";
import themeData from "../../assets/theme/theme";

export const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  padding-top: 1px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 300;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 3px;
  }

  /* On mouse-over, add a grey background color */
  :hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: ${themeData.colors.greenDark};
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    opacity: 0;
    transition: all 0.3s linear;
  }

  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    opacity: 1;
  }

  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
