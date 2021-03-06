import styled from "styled-components";
import themeData from "../../../assets/theme/theme";
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
  background-color: ${themeData.colors.orange};
  outline: 0;
  border: 0;
  cursor: pointer;
  margin-left: 20px;
  padding: 5px 15px;
  border-radius: 10px;
  color: ${themeData.colors.background};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: capitalize;
  &:hover {
    background-color: ${themeData.colors.orangeLight};
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
export const FormContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  form {
    width: 100%;
    text-align: center;
  }
  @media screen and (max-width: 700px) {
    padding: 30px 20px;
  }
  .infoSenha {
    font-size: 0.8rem;
    color: ${themeData.colors.orangeLight};
    margin-bottom: 20px;
  }
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
`;
export const FormLabel = styled.label`
  font-weight: 200;
  font-size: 0.9rem;
  margin-bottom: 5px;
  &.inline {
    display: flex;
    justify-content: space-between;
    .status {
      color: ${(props) =>
        props.status === "loaded"
          ? themeData.colors.green
          : props.status === "loading"
          ? themeData.colors.orange
          : themeData.colors.redLight};
    }
  }
`;
export const Text = styled.span``;
export const FormInput = styled.input`
  border: 0;
  outline: 0;
  background-color: ${themeData.colors.gray};
  height: 40px;
  font-size: 1rem;
  color: ${themeData.colors.lightGray};
  font-family: "Poppins";
  font-weight: 300;
  padding: 0 10px;
  border-radius: 5px;
`;
export const FormLocationSelect = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;
export const FormLocationSelected = styled.div`
  background-color: ${(props) =>
    props.selected ? themeData.colors.orange : themeData.colors.gray};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 1rem;
  text-transform: uppercase;
  color: ${(props) =>
    props.selected ? themeData.colors.background : themeData.colors.lightGray};
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  @media screen and (min-width: 700px) {
    &:hover {
      transform: scale(1.1);
    }
  }
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
  @media screen and (min-width: 700px) {
    &:hover {
      background-color: ${themeData.colors.greenLight};
      transform: scale(1.05);
    }
  }
`;

export const MapContent = styled.div`
  width: 100%;
  height: 200px;
`;
export const ErrorBox = styled.div`
  width: 100%;
  background-color: ${themeData.colors.orange};
  border-radius: 5px;
  min-height: 40px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeData.colors.background};
  font-weight: 500;
  margin-bottom: 20px;
`;
