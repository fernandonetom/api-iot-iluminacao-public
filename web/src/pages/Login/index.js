import React, { useContext, useState } from "react";
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
import { Formik } from "formik";
import { loginSchema } from "../../utils/validations";
export default function Login({ loginType }) {
  const { handleLogin, authLoading } = useContext(Context);
  const [remember, setRemember] = useState(false);
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
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={async (values, form) => {
                form.setFieldError("response", null);
                const response = await handleLogin({
                  loginType,
                  email: values.email,
                  password: values.password,
                  remember,
                });
                if (response && response.error) {
                  form.setFieldError("response", response.message);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  {errors.response && <ErrorBox>{errors.response}</ErrorBox>}
                  <FormInput>
                    <Input
                      type="email"
                      name="email"
                      label="Email"
                      width="100%"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={errors.email}
                    />
                  </FormInput>
                  {errors.email && touched.email && (
                    <ErrorBox>{errors.email}</ErrorBox>
                  )}
                  <FormInput>
                    <Input
                      type="password"
                      name="password"
                      label="Senha"
                      width="100%"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password}
                    />
                  </FormInput>
                  {errors.password && touched.password && (
                    <ErrorBox>{errors.password}</ErrorBox>
                  )}
                  <FormInput>
                    <Checkbox
                      label="lembrar-me"
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                  </FormInput>
                  <SubmitButtom
                    type="submit"
                    disabled={isSubmitting}
                    loginType={loginType}
                  >
                    {isSubmitting ? "aguarde" : "acessar"}
                  </SubmitButtom>
                  <ForgotPass to="#">esqueci minha senha</ForgotPass>
                </form>
              )}
            </Formik>
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
