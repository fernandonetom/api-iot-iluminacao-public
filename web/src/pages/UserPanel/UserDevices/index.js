import React, { useState, useContext, useEffect } from "react";
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
import { Context } from "../../../Context/AuthContext";
import moment from "moment";
import "moment/locale/pt-br";
import themeData from "../../../assets/theme/theme";
import api from "../../../services/api";
import GlobalLoading from "../../../components/GlobalLoading";
import { deleteConfirm, showSucess } from "../../../utils/alerts";
import { useHistory } from "react-router-dom";
moment.locale("pt-br");
export default function UserDevices() {
  const history = useHistory();
  const { authLoading } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  async function loadUsers() {
    setLoading(true);
    try {
      const usersResponse = await api.get("mqttusers");
      setUsers(usersResponse.data);
    } catch (error) {}

    setLoading(false);
  }
  useEffect(() => {
    if (!authLoading) {
      loadUsers();
    }
  }, [authLoading]);
  async function handleDelete(user) {
    deleteConfirm(
      "Tem certeza?",
      `Você estará excluindo ${user.name}`,
      async function () {
        try {
          setLoading(true);
          const response = await api.delete(`mqttusers/${user.id}`);
          setLoading(false);
          if (response.data.error) {
            return console.log("Erro ao deletar ::", response.data.error);
          }
          showSucess("Excluido", 3000);
          loadUsers();
        } catch (error) {}
      }
    );
  }
  function handleEdit({ id }) {
    history.push(`/users/device-edit/${id}`);
  }
  return (
    <>
      {loading && <GlobalLoading />}
      <Header menuType="user" active="dispositivos">
        <HeaderContent>
          <InfoLeft>
            <InfoTitle>Usuários cadastrados</InfoTitle>
            <NewDevice to="/users/new-device">
              <PlusIcon />
              <span>Novo dispositivo</span>
            </NewDevice>
          </InfoLeft>
          <InfoRight>busca</InfoRight>
        </HeaderContent>
      </Header>
      <Container>
        <Table>
          {!loading && users.length === 0 && "Nenhum dispositivo registrado"}
          {!loading && users.length > 0 && (
            <DataTable
              data={users}
              columns={[
                {
                  name: "Nome do dispositivo",
                  selector: "name",
                  sortable: true,
                },
              ]}
              noHeader
              theme={"solarized"}
              expandableRows
              expandOnRowClicked
              expandableRowsComponent={
                <ExpandComponents
                  onClickDelete={handleDelete}
                  onClickEdit={handleEdit}
                />
              }
              highlightOnHover
              pagination
              paginationComponentOptions={{
                rowsPerPageText: "Dispositivos por página",
                rangeSeparatorText: "de",
                selectAllRowsItem: true,
                selectAllRowsItemText: "Todos",
              }}
            />
          )}
        </Table>
      </Container>
    </>
  );
}
const ExpandComponents = ({ data, onClickDelete, onClickEdit }) => (
  <ExpandRow>
    <UserDataRow>
      <h3>{data.name}</h3>
      <hr />
      <h4>Usuário MQTT: {data.username}</h4>
      <h4>Senha MQTT: {data.password}</h4>
      <h4>Criado em {moment(data.createdAt).format("LLLL")}</h4>
    </UserDataRow>
    <UserDataActions>
      <UserActionEdit onClick={() => onClickEdit(data)}>Editar</UserActionEdit>
      <UserActionDelete onClick={() => onClickDelete(data)}>
        Excluir
      </UserActionDelete>
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
