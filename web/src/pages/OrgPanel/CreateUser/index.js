import React from "react";
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
} from "./styles";
import InfoTitle from "../../../components/InfoTitle";
import Icons from "../../../assets/icons";
import { useHistory } from "react-router-dom";
import Input from "../../../components/Input";
export default function CreateUser({ type }) {
  const history = useHistory();
  return (
    <>
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
        <FormGroup>
          <Input type="text" name="nome" label="Nome" width="100%" />
        </FormGroup>
        <FormGroup>
          <Input type="email" name="email" label="Email" width="100%" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="senha" label="Senha" width="100%" />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="confirm-senha"
            label="Confirmar senha"
            width="100%"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Nível do usuário</FormLabel>
          <FormLocationSelect>
            <FormLocationSelected selected={true}>Comum</FormLocationSelected>
            <FormLocationSelected>Administrador</FormLocationSelected>
          </FormLocationSelect>
        </FormGroup>

        <SubmitButton>
          {type && type === "edit" ? "Atualizar usuário" : "Cadastrar usuário"}
        </SubmitButton>
      </FormContent>
    </>
  );
}
