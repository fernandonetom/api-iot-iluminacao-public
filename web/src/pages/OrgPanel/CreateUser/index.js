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

export default function CreateUser({ type }) {
  const { id } = useParams();
  const { authLoading } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState({
    error: { code: null, message: null },
  });
  const history = useHistory();

  useEffect(() => {
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

  async function handleSubmit() {
    if (type === "new") {
      if (
        name.trim().length === 0 ||
        email.trim().length === 0 ||
        password.trim().length === 0 ||
        confirmPassword.trim().length === 0
      ) {
        return setConfigs({
          ...configs,
          error: {
            code: "empty",
            message: "Os campos devem ser preenchidos",
          },
        });
      }
    }

    if (password.trim() !== confirmPassword.trim()) {
      return setConfigs({
        ...configs,
        error: {
          code: "passwordConfirm",
          message: "As senhas são diferentes",
        },
      });
    }
    if (type === "new") {
      try {
        setLoading(true);
        const response = await api.post("users", {
          name,
          email,
          password,
          admin,
        });
        setLoading(false);
        if (response.data.error) {
          return setConfigs({
            ...configs,
            error: {
              code: "badRequest",
              message: response.data.message,
            },
          });
        }
        showSucess("Cadastrado com sucesso", 3000);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirm-password").value = "";
        return setConfigs({
          ...configs,
          error: {
            code: null,
            message: null,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        const { data } = await api.put(`organizations/users/${id}`, {
          name,
          email,
          password: password.trim() === "" ? null : password.trim(),
          admin,
        });
        setLoading(false);
        if (data.error) {
          return console.log(data.error);
        }
        showSucess("Usuário atualizado", 3000);
        history.push("/organizations/users");
      } catch (error) {
        console.log(error);
      }
    }
  }
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
        {configs.error.code && <ErrorBox>{configs.error.message}</ErrorBox>}
        <FormGroup>
          <Input
            type="text"
            id="name"
            name="nome"
            label="Nome"
            width="100%"
            onChange={setName}
            error={configs.error.code === "empty" ? "error" : null}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            width="100%"
            onChange={setEmail}
            error={configs.error.code === "empty" ? "error" : null}
          />
        </FormGroup>
        {type === "edit" && (
          <span className="infoSenha">
            Se não deseja alterar a senha, deixe-a em branco
          </span>
        )}
        <FormGroup>
          <Input
            type="password"
            id="password"
            name="senha"
            label="Senha"
            width="100%"
            onChange={setPassword}
            error={
              configs.error.code === "empty"
                ? "error"
                : configs.error.code === "passwordConfirm"
                ? "pass"
                : null
            }
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            id="confirm-password"
            name="confirm-senha"
            label="Confirmar senha"
            width="100%"
            onChange={setConfirmPassword}
            error={
              configs.error.code === "empty"
                ? "error"
                : configs.error.code === "passwordConfirm"
                ? "pass"
                : null
            }
          />
        </FormGroup>

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

        <SubmitButton onClick={handleSubmit}>
          {type && type === "edit" ? "Atualizar usuário" : "Cadastrar usuário"}
        </SubmitButton>
      </FormContent>
    </>
  );
}
