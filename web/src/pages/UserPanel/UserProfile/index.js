import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import {
  Container,
  ContainerLeft,
  ContainerRight,
  ProfilePanel,
  ProfilePanelTag,
  ProfileTag,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  ProfileOrg,
  ProfileData,
  UpdatePanel,
  InputGroup,
  TextPassword,
  SubmitButtom,
  ErrorBox,
  LoadingSpinner,
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import Input from "../../../components/Input";
import themeData from "../../../assets/theme/theme";
import { Context } from "../../../Context/AuthContext";
import api from "../../../services/api";
import GlobalLoading from "../../../components/GlobalLoading";
import { DateToStringFormat } from "../../../utils/dateFormatter";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { updateSchema } from "../../../utils/validations";
export default function UserProfile() {
  const history = useHistory();
  const { updateUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function loadProfile() {
    try {
      setLoading(true);
      const { data } = await api.get("users/profile");
      setLoading(false);
      if (data.error) {
        toast.error(data.message);
        return history.goBack();
      }

      setUserData(data);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      toast.error("Ocorreu um erro, tente mais tarde.");
      return history.goBack();
    }
  }

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function handleUpdate({ name, email, password }) {
    try {
      const { data } = await api.put(`users/${userData.id}`, {
        name,
        email,
        password,
      });
      return data;
    } catch (error) {}
  }
  return (
    <>
      {loading && <GlobalLoading />}
      <Header menuType="user" active="perfil" />
      <Container>
        <ContainerLeft>
          <InfoTitle>Perfil</InfoTitle>
          <ProfilePanel>
            <ProfilePanelTag>
              <ProfileTag>
                {userData.userLevel && userData.userLevel}
              </ProfileTag>
            </ProfilePanelTag>
            <ProfileAvatar>
              <Icons name="user-profile" />
            </ProfileAvatar>
            <ProfileName>{userData.name && userData.name}</ProfileName>
            <ProfileEmail>{userData.email && userData.email}</ProfileEmail>
            <ProfileOrg>{userData.orgName && userData.orgName}</ProfileOrg>
            <ProfileData>
              Cadastrado desde{" "}
              {userData.createdAt && DateToStringFormat(userData.createdAt)}
            </ProfileData>
          </ProfilePanel>
        </ContainerLeft>
        <ContainerRight>
          <InfoTitle>Atualizar dados</InfoTitle>
          <Formik
            initialValues={{
              name,
              email,
              password: "",
              confirmPassword: "",
            }}
            enableReinitialize
            validationSchema={updateSchema}
            onSubmit={async (values, form) => {
              form.setFieldError("response", null);
              const response = await handleUpdate({
                name: values.name,
                email: values.email,
                password: values.password,
              });
              if (response && response.error) {
                return form.setFieldError("response", response.message);
              }
              loadProfile();
              updateUser({ name, email });
              toast.success(response.message);
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
                <UpdatePanel>
                  <InputGroup>
                    <Input
                      type="text"
                      label="Nome"
                      name="name"
                      bgColor={themeData.colors.background}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      error={errors.name}
                    />
                    <Input
                      type="email"
                      label="Email"
                      name="email"
                      bgColor={themeData.colors.background}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={errors.email}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Input
                      type="password"
                      label="Nova Senha*"
                      name="password"
                      bgColor={themeData.colors.background}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password}
                    />
                    <Input
                      type="password"
                      label="Confirmar Nova Senha"
                      name="confirmPassword"
                      bgColor={themeData.colors.background}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      error={errors.confirmPassword}
                    />
                  </InputGroup>
                  <TextPassword>
                    *deixe a nova senha em branco se não deseja alterar sua
                    senha
                  </TextPassword>
                  {errors.name && touched.name && (
                    <ErrorBox>{errors.name}</ErrorBox>
                  )}
                  {errors.email && touched.email && (
                    <ErrorBox>{errors.email}</ErrorBox>
                  )}
                  {errors.password && touched.password && (
                    <ErrorBox>{errors.password}</ErrorBox>
                  )}
                  {errors.confirmPassword && touched.confirmPassword && (
                    <ErrorBox>{errors.confirmPassword}</ErrorBox>
                  )}
                  <SubmitButtom type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingSpinner /> : "atualizar"}
                  </SubmitButtom>
                </UpdatePanel>
              </form>
            )}
          </Formik>
        </ContainerRight>
      </Container>
    </>
  );
}
