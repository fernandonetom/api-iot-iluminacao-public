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
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import Input from "../../../components/Input";
import themeData from "../../../assets/theme/theme";
import { Context } from "../../../Context/AuthContext";
import api from "../../../services/api";
import GlobalLoading from "../../../components/GlobalLoading";
import { DateToStringFormat } from "../../../utils/dateFormatter";
export default function UserProfile() {
  const { authLoading, responseObserver } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (!authLoading) {
      (async () => {
        try {
          const profileResponse = await api.get("users/profile");
          setUserData(profileResponse.data);
        } catch (error) {}

        setLoading(false);
      })();
    }
  }, [responseObserver, authLoading, setLoading, loading]);
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
          <UpdatePanel>
            <InputGroup>
              <Input
                type="text"
                label="Nome"
                name="nome"
                bgColor={themeData.colors.background}
              />
              <Input
                type="email"
                label="Email"
                name="email"
                bgColor={themeData.colors.background}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                label="Nova Senha*"
                name="senha"
                bgColor={themeData.colors.background}
              />
              <Input
                type="password"
                label="Confirmar Nova Senha"
                name="confirmar-senha"
                bgColor={themeData.colors.background}
              />
            </InputGroup>

            <TextPassword>
              *deixe a nova senha em branco se não deseja alterar sua senha
            </TextPassword>

            <SubmitButtom>atualizar</SubmitButtom>
          </UpdatePanel>
        </ContainerRight>
      </Container>
    </>
  );
}
