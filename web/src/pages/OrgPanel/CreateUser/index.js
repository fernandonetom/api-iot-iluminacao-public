import React, { useEffect, useState, useContext } from "react";
import Header from "../../../components/Header";
import {
  HeaderContent,
  InfoLeft,
  BackButton,
  EditButton,
  FormGroup,
  FormContent,
  FormLabel,
  FormLocationSelect,
  FormLocationSelected,
  SubmitButton,
  ErrorBox,
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import { useHistory, useParams } from "react-router-dom";
import Input from "../../../components/Input";
import api from "../../../services/api";
import GlobalLoading from "../../../components/GlobalLoading";
import { showSucess } from "../../../utils/alerts";
import { Context } from "../../../Context/AuthContext";
import { Formik } from "formik";
import { createUserSchema, updateSchema } from "../../../utils/validations";
export default function CreateUser({ type }) {
  const { id } = useParams();
  const { authLoading } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!authLoading) {
      if (type === "edit") {
        setLoading(true);
        (async () => {
          try {
            const userResponse = await api.get(`organizations/users/${id}`);
            document.getElementById("name").value = userResponse.data.name;
            document.getElementById("email").value = userResponse.data.email;
            setAdmin(userResponse.data.userLevel === "admin" ? true : false);
            setName(userResponse.data.name);
            setEmail(userResponse.data.email);
          } catch (error) {}

          setLoading(false);
        })();
      }
    }
  }, [authLoading, id, type]);

  return (
    <>
      {loading && <GlobalLoading />}
      <Header
        menuType="organization"
        active={type === "new" ? "novo usuário" : "usuários"}
      >
        <HeaderContent>
          <InfoLeft>
            {type && type === "new" && (
              <BackButton onClick={() => history.goBack()}>
                <Icons name="arrow-left" />
              </BackButton>
            )}
            <InfoTitle>
              {type && type === "edit"
                ? "Atualizar usuário"
                : "Cadastrar usuário"}
            </InfoTitle>

            <EditButton onClick={() => history.goBack()}>Cancelar</EditButton>
          </InfoLeft>
        </HeaderContent>
      </Header>
      <FormContent>
        <Formik
          initialValues={{
            name,
            email,
            password: "",
            confirmPassword: "",
          }}
          enableReinitialize
          validationSchema={type === "new" ? createUserSchema : updateSchema}
          onSubmit={async (values, form) => {
            form.setFieldError("response", null);
            if (type === "new") {
              try {
                const response = await api.post("users", {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  admin,
                });
                if (response.data.error) {
                  return form.setFieldError("response", response.data.message);
                }
                showSucess("Cadastrado com sucesso", 3000);
                history.push("/organizations/users");
              } catch (error) {
                console.log(error);
              }
            } else {
              try {
                const { data } = await api.put(`organizations/users/${id}`, {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  admin,
                });
                if (data.error) {
                  return form.setFieldError("response", data.error.message);
                }
                showSucess("Usuário atualizado", 3000);
                history.push("/organizations/users");
              } catch (error) {
                console.log(error);
              }
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
              <>
                <FormGroup>
                  <Input
                    type="text"
                    id="name"
                    name="nome"
                    label="Nome"
                    width="100%"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && errors.name}
                  />
                </FormGroup>
                {errors.name && touched.name && (
                  <ErrorBox>{errors.name}</ErrorBox>
                )}
                <FormGroup>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    width="100%"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && errors.email}
                  />
                </FormGroup>
                {errors.email && touched.email && (
                  <ErrorBox>{errors.email}</ErrorBox>
                )}
                <FormGroup>
                  <Input
                    type="password"
                    id="password"
                    name="senha"
                    label="Senha"
                    width="100%"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && errors.password}
                  />
                </FormGroup>

                {errors.password && touched.password && (
                  <ErrorBox>{errors.password}</ErrorBox>
                )}
                <FormGroup>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar senha"
                    width="100%"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                </FormGroup>

                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorBox>{errors.confirmPassword}</ErrorBox>
                )}
                {type === "edit" && (
                  <span className="infoSenha">
                    Se não deseja alterar a senha, deixe-a em branco
                  </span>
                )}
                <FormGroup>
                  <FormLabel>Nível do usuário</FormLabel>
                  <FormLocationSelect>
                    <FormLocationSelected
                      selected={admin ? false : true}
                      onClick={() => setAdmin(false)}
                    >
                      Comum
                    </FormLocationSelected>
                    <FormLocationSelected
                      selected={admin ? true : false}
                      onClick={() => setAdmin(true)}
                    >
                      Administrador
                    </FormLocationSelected>
                  </FormLocationSelect>
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Aguarde"
                    : type && type === "edit"
                    ? "Atualizar usuário"
                    : "Cadastrar usuário"}
                </SubmitButton>
              </>
            </form>
          )}
        </Formik>
      </FormContent>
    </>
  );
}
