import styled from "styled-components";
import themeData from "../../assets/theme/theme";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
export const LeftSection = styled.section`
  width: 40vw;
  background-color: ${(props) =>
    props.loginType === "users"
      ? themeData.colors.greenDark
      : themeData.colors.blueDark};
  color: ${themeData.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20vh 0 5vh 0;
  text-align: center;
  @media screen and (max-width: 1000px) {
    width: 100%;
    background-color: transparent;
    padding: 0;
    justify-content: initial;
  }
`;
export const LogoSection = styled.div`
  @media screen and (max-width: 1000px) {
    svg {
      width: 180px;
    }
    path,
    text {
      fill: ${(props) =>
        props.loginType === "users"
          ? themeData.colors.greenDark
          : themeData.colors.blueDark};
    }
  }
`;
export const LogoText = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export const TextLoginType = styled.h3`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 300;
  color: ${themeData.colors.background};
  @media screen and (max-width: 1000px) {
    margin-top: -50px;
    color: ${(props) =>
      props.loginType === "users"
        ? themeData.colors.greenDark
        : themeData.colors.blueDark};
  }
`;
export const RightSection = styled.section`
  flex: 1;
  color: ${themeData.colors.lightGrayDark};
  padding-top: 20vh;
  padding-bottom: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 0 20px 0 20px;
    justify-content: flex-start;
  }
`;
export const FormSection = styled.div`
  width: 40%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
export const FormInput = styled.div`
  margin-top: 30px;
`;
export const SubmitButtom = styled.button`
  width: 100%;
  height: 50px;
  outline: 0;
  border: 0;
  border-radius: 3px;
  background-color: ${(props) =>
    props.loginType === "users"
      ? themeData.colors.greenDark
      : themeData.colors.blueDark};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 50px;

  &:hover {
    background-color: ${(props) =>
      props.loginType === "users"
        ? themeData.colors.green
        : themeData.colors.blue};
  }
  @media screen and (max-width: 1000px) {
    margin-top: 30px;
  }
`;
export const ForgotPass = styled(Link)`
  text-decoration: none;
  color: ${themeData.colors.lightGrayDark};
  font-size: 0.8rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  &:hover {
    color: ${themeData.colors.lightGray};
  }
`;
export const ChangeLogin = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 40%;
  height: 50px;
  outline: 0;
  border: 0;
  border-radius: 3px;
  background-color: ${(props) =>
    props.logintype === "users"
      ? themeData.colors.blueDark
      : themeData.colors.greenDark};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 50px;
  color: ${themeData.colors.background};
  text-align: center;
  &:hover {
    background-color: ${(props) =>
      props.logintype === "users"
        ? themeData.colors.blue
        : themeData.colors.green};
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
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

  @media screen and (max-width: 700px) {
    margin-top: 20px;
  }
  &:not(:first-child) {
    margin-top: 20px;
  }
`;
