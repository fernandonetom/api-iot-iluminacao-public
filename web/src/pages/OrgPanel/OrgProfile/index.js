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
  ProfileData,
  UpdatePanel,
  InputGroup,
  TextPassword,
  SubmitButtom,
  ErrorBox,
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import Input from "../../../components/Input";
import themeData from "../../../assets/theme/theme";
import { Context } from "../../../Context/AuthContext";
import api from "../../../services/api";
import GlobalLoading from "../../../components/GlobalLoading";
import { DateToStringFormat } from "../../../utils/dateFormatter";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
export default function OrgProfile() {
  const history = useHistory();
  const { updateUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    name: null,
    email: null,
    password: null,
  });
  async function loadProfile() {
    try {
      setLoading(true);
      const { data } = await api.get("organizations/profile");
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

  async function handleUpdate() {
    if (name.trim().length === 0) {
      return setError({
        name: "O nome não pode ficar em branco",
        email: null,
        password: null,
      });
    }
    if (email.trim().length === 0) {
      return setError({
        email: "O email não pode ficar em branco",
        name: null,
        password: null,
      });
    }
    if (
      password.trim().length !== 0 &&
      password.trim() !== confirmPassword.trim()
    ) {
      return setError({
        password: "As senhas não conferem",
        name: null,
        email: null,
      });
    }
    setError({
      password: null,
      name: null,
      email: null,
    });

    try {
      setLoading(true);
      const { data } = await api.put(`/organizations/${userData.id}`, {
        name,
        email,
        password,
      });
      setLoading(false);
      if (data.error) {
        return toast.error(data.message);
      }
      loadProfile();
      updateUser({ name, email });
      toast.success(data.message);
    } catch (error) {}
  }
  return (
    <>
      {loading && <GlobalLoading />}
      <Header menuType="organization" active="perfil" />
      <Container>
        <ContainerLeft>
          <InfoTitle>Perfil</InfoTitle>
          <ProfilePanel>
            <ProfilePanelTag>
              <ProfileTag>organização</ProfileTag>
            </ProfilePanelTag>
            <ProfileAvatar>
              <Icons name="user-profile" />
            </ProfileAvatar>
            <ProfileName>{userData.name && userData.name}</ProfileName>
            <ProfileEmail>{userData.email && userData.email}</ProfileEmail>
            <ProfileData>
              Cadastrado desde{" "}
              {userData.createdAt && DateToStringFormat(userData.createdAt)}
            </ProfileData>
          </ProfilePanel>
        </ContainerLeft>
        <ContainerRight>
          <InfoTitle>Atualizar dados</InfoTitle>
          <UpdatePanel>
            {error.name && <ErrorBox>{error.name}</ErrorBox>}
            {error.email && <ErrorBox>{error.email}</ErrorBox>}
            {error.password && <ErrorBox>{error.password}</ErrorBox>}
            <InputGroup>
              <Input
                type="text"
                label="Nome"
                name="nome"
                bgColor={themeData.colors.background}
                value={name}
                onChange={setName}
                error={error.name}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                bgColor={themeData.colors.background}
                value={email}
                onChange={setEmail}
                error={error.email}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                label="Nova Senha*"
                name="senha"
                bgColor={themeData.colors.background}
                value={password}
                onChange={setPassword}
                error={error.password}
              />
              <Input
                type="password"
                label="Confirmar Nova Senha"
                name="confirmar-senha"
                bgColor={themeData.colors.background}
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={error.password}
              />
            </InputGroup>
            <TextPassword>
              *deixe a nova senha em branco se não deseja alterar sua senha
            </TextPassword>
            <SubmitButtom onClick={handleUpdate}>atualizar</SubmitButtom>
          </UpdatePanel>
        </ContainerRight>
      </Container>
    </>
  );
}
