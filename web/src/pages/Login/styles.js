import styled from "styled-components";
import themeData from "../../assets/theme/theme";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;
export const LeftSection = styled.section`
  width: 40vw;
  background-color: ${(props) =>
    props.loginType === "user"
      ? themeData.colors.greenDark
      : themeData.colors.blueDark};
  color: ${themeData.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20vh 0 5vh 0;
  text-align: center;
`;
export const LogoSection = styled.div``;
export const LogoImage = styled.img``;
export const LogoText = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
`;
export const TextLoginType = styled.h3`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 300;
`;
export const RightSection = styled.section`
  flex: 1;
  color: ${themeData.colors.lightGrayDark};
  padding-top: 20vh;
  padding-bottom: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const FormSection = styled.div`
  width: 40%;
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
    props.loginType === "user"
      ? themeData.colors.greenDark
      : themeData.colors.blueDark};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 50px;
  &:hover {
    background-color: ${(props) =>
      props.loginType === "user"
        ? themeData.colors.green
        : themeData.colors.blue};
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
    props.loginType === "user"
      ? themeData.colors.blueDark
      : themeData.colors.greenDark};
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 50px;
  color: ${themeData.colors.background};
  &:hover {
    background-color: ${(props) =>
      props.loginType === "user"
        ? themeData.colors.blue
        : themeData.colors.green};
  }
`;
