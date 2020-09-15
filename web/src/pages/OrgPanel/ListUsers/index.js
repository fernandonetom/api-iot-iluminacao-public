import React from "react";
import Header from "../../../components/Header";
import InfoTitle from "../../../components/InfoTitle";
import PlusIcon from "../../../assets/icons/plusIcon";
import {
  Container,
  InfoLeft,
  NewDevice,
  InfoRight,
  HeaderContent,
  ExpandRow,
  UserDataRow,
  UserDataActions,
  UserActionEdit,
  UserActionDelete,
  Table,
} from "./styles";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import "moment/locale/pt-br";
import themeData from "../../../assets/theme/theme";
moment.locale("pt-br");
export default function ListUsers() {
  const users = [
    {
      id: 1,
      name: "Fernando Neto",
      email: "email@email.com",
      level: "user",
      createdAt: "2020-09-14T23:21:22Z",
    },
    {
      id: 2,
      name: "José Pereira",
      email: "jose@jose.com",
      level: "admin",
      createdAt: "2020-09-14T23:21:22Z",
    },
  ];
  return (
    <>
      <Header menuType="organization" active="usuários">
        <HeaderContent>
          <InfoLeft>
            <InfoTitle>Usuários cadastrados</InfoTitle>
            <NewDevice to="/organization/new-user">
              <PlusIcon />
              <span>Novo usuário</span>
            </NewDevice>
          </InfoLeft>
          <InfoRight>busca</InfoRight>
        </HeaderContent>
      </Header>
      <Container>
        <Table>
          <DataTable
            data={users}
            columns={[
              { name: "Nome", selector: "name", sortable: true },
              { name: "Email", selector: "email", sortable: true },
              {
                name: "Nível",
                selector: "level",
                conditionalCellStyles: [
                  {
                    when: (row) => row.level === "user",
                    style: {
                      "& div": {
                        display: "none",
                      },
                      "&::before": {
                        content: `"Usuário"`,
                        backgroundColor: themeData.colors.orangeDark,
                        color: themeData.colors.lightGray,
                        padding: 5,
                        width: 60,
                        textAlign: "center",
                        borderRadius: 10,
                      },
                    },
                  },
                  {
                    when: (row) => row.level === "admin",
                    style: {
                      "& div": {
                        display: "none",
                      },
                      "&::before": {
                        content: `"Admin"`,
                        backgroundColor: themeData.colors.greenDark,
                        color: themeData.colors.background,
                        padding: 5,
                        width: 60,
                        textAlign: "center",
                        borderRadius: 10,
                      },
                    },
                  },
                ],
              },
            ]}
            noHeader
            theme={"solarized"}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandComponents />}
            highlightOnHover
            pagination
            paginationComponentOptions={{
              rowsPerPageText: "Usuários por página",
              rangeSeparatorText: "de",
              selectAllRowsItem: true,
              selectAllRowsItemText: "Todos",
            }}
          />
        </Table>
      </Container>
    </>
  );
}
const ExpandComponents = ({ data }) => (
  <ExpandRow>
    <UserDataRow>
      <h3>{data.name}</h3>
      <hr />
      <h4>Email: {data.email}</h4>
      <h4>Criado {moment(data.createdAt).format("LLLL")}</h4>
    </UserDataRow>
    <UserDataActions>
      <UserActionEdit>Editar</UserActionEdit>
      <UserActionDelete>Excluir</UserActionDelete>
    </UserDataActions>
  </ExpandRow>
);
createTheme("solarized", {
  text: {
    primary: themeData.colors.lightGray,
    secondary: themeData.colors.lightGrayDark,
  },
  background: {
    default: themeData.colors.gray,
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: themeData.colors.grayLight,
  },
  button: {
    default: themeData.colors.greenDark,
    hover: "rgba(0,0,0,.08)",
    focus: "rgba(255,255,255,.12)",
    disabled: "rgba(255, 255, 255, .34)",
  },
  sortFocus: {
    default: themeData.colors.greenDark,
  },
  highlightOnHover: {
    default: themeData.colors.grayLight,
    text: themeData.colors.lightGrayDark,
  },
});
