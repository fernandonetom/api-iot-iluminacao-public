import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  LeftSection,
  RightSection,
  LogoSection,
  TextLoginType,
  LogoText,
  FormSection,
  FormInput,
  SubmitButtom,
  ForgotPass,
  ChangeLogin,
  ErrorBox,
} from "./styles";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import LoginLogo from "../../assets/images/LoginLogo";
import { Context } from "../../Context/AuthContext";
import GlobalLoading from "../../components/GlobalLoading";

export default function Login({ loginType }) {
  const { handleLogin, authLoading, redirectIfLogged } = useContext(Context);
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [configs, setConfigs] = useState({
    error: { code: null, message: null },
  });
  useEffect(() => {
    redirectIfLogged();
  }, [authLoading, redirectIfLogged]);
  async function handleSubmit() {
    if (email.trim().length === 0 || password.trim().length === 0) {
      return setConfigs({
        ...configs,
        error: {
          code: "empty",
          message: "Os campos devem ser preenchidos",
        },
      });
    }
    const response = await handleLogin({
      loginType,
      email,
      password,
      remember,
    });
    if (response && response.error) {
      return setConfigs({
        ...configs,
        error: {
          code: response.error,
          message: response.message,
        },
      });
    }
  }
  return (
    <>
      {authLoading && <GlobalLoading />}
      <Container>
        <LeftSection loginType={loginType}>
          <LogoSection loginType={loginType}>
            <LoginLogo />
            <LogoText>Sistema de Iluminação Pública Inteligente</LogoText>
          </LogoSection>
          <TextLoginType loginType={loginType}>
            {loginType === "users" ? "usuário" : "organização"}
          </TextLoginType>
        </LeftSection>
        <RightSection>
          <FormSection>
            {configs.error.code && <ErrorBox>{configs.error.message}</ErrorBox>}
            <FormInput>
              <Input
                type="email"
                label="Email"
                name="email"
                width="100%"
                error={configs.error.code === "empty" ? "error" : null}
                onChange={setEmail}
                autoComplete="off"
              />
            </FormInput>
            <FormInput>
              <Input
                type="password"
                label="Senha"
                name="senha"
                width="100%"
                error={configs.error.code === "empty" ? "error" : null}
                onChange={setPassword}
                autoComplete="off"
              />
            </FormInput>
            <FormInput>
              <Checkbox
                label="lembrar-me"
                onChange={(e) => setRemember(e.target.checked)}
              />
            </FormInput>
            <SubmitButtom onClick={handleSubmit} loginType={loginType}>
              acessar
            </SubmitButtom>
            <ForgotPass to="forgot">esqueci minha senha</ForgotPass>
          </FormSection>
          <ChangeLogin
            to={loginType === "users" ? "/organizations/login" : "/login"}
            logintype={loginType}
          >
            acessar como {loginType === "users" ? "organização" : "usuário"}
          </ChangeLogin>
        </RightSection>
      </Container>
    </>
  );
}
