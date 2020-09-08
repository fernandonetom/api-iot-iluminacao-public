import React from "react";
import {
  Container,
  LeftSection,
  RightSection,
  LogoSection,
  TextLoginType,
  LogoImage,
  LogoText,
  FormSection,
  FormInput,
  SubmitButtom,
  ForgotPass,
  ChangeLogin,
} from "./styles";
import logoLogin from "../../assets/images/logo-login.svg";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
export default function Login({ loginType }) {
  return (
    <>
      <Container>
        <LeftSection loginType={loginType}>
          <LogoSection>
            <LogoImage src={logoLogin} alt={process.env.REACT_APP_NAME} />
            <LogoText>Sistema de Iluminação Pública Inteligente</LogoText>
          </LogoSection>
          <TextLoginType>
            {loginType === "user" ? "usuário" : "organização"}
          </TextLoginType>
        </LeftSection>
        <RightSection>
          <FormSection>
            <FormInput>
              <Input type="email" label="Email" name="email" width="100%" />
            </FormInput>
            <FormInput>
              <Input type="password" label="Senha" name="senha" width="100%" />
            </FormInput>
            <FormInput>
              <Checkbox label="lembrar-me" />
            </FormInput>
            <SubmitButtom loginType={loginType}>acessar</SubmitButtom>
            <ForgotPass to="forgot">esqueci minha senha</ForgotPass>
          </FormSection>
          <ChangeLogin
            to={loginType === "user" ? "/organization/login" : "/login"}
            loginType={loginType}
          >
            acessar como {loginType === "user" ? "organização" : "usuário"}
          </ChangeLogin>
        </RightSection>
      </Container>
    </>
  );
}
