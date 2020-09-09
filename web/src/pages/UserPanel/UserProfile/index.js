import React from "react";
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
export default function UserProfile() {
  return (
    <>
      <Header menuType="user" active="perfil" />
      <Container>
        <ContainerLeft>
          <InfoTitle>Perfil</InfoTitle>
          <ProfilePanel>
            <ProfilePanelTag>
              <ProfileTag>administrador</ProfileTag>
            </ProfilePanelTag>
            <ProfileAvatar>
              <Icons name="user-profile" />
            </ProfileAvatar>
            <ProfileName>Fernando Martins</ProfileName>
            <ProfileEmail>email@email.com</ProfileEmail>
            <ProfileOrg>Universidade Federal da Paraíba</ProfileOrg>
            <ProfileData>Cadastrado desde 1 de abril de 2020</ProfileData>
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
