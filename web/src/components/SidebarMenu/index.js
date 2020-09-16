import React, { useContext } from "react";
import { Aside, Background, MenuLink, Logout, CloseButton } from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import Icons from "../../assets/icons";
import { Context } from "../../Context/AuthContext";
export default function SidebarMenu({ isVisible, active, type, onClose }) {
  const { handleLogout } = useContext(Context);
  const menuItems = {
    organization: [
      {
        title: "dashboard",
        url: "/organizations/dashboard",
        icon: "dashboard",
      },
      { title: "usuários", url: "/organizations/users", icon: "users" },
      { title: "novo usuário", url: "/organizations/new-user", icon: "plus" },
      { title: "perfil", url: "/organizations/profile", icon: "user" },
    ],
    user: [
      { title: "dashboard", url: "/users/dashboard", icon: "dashboard" },
      { title: "novo dispositivo", url: "/users/new-device", icon: "plus" },
      { title: "relatórios", url: "/users/reports", icon: "reports" },
      { title: "perfil", url: "/users/profile", icon: "user" },
    ],
  };
  function handleClose() {
    const menuElement = document.getElementById("menu");
    menuElement.classList.add("close-menu");
    const backgroundElement = document.getElementById("background");
    backgroundElement.classList.add("close-menu");

    setTimeout(() => onClose(), 300);
  }
  return (
    <>
      {isVisible && (
        <>
          <Aside id="menu" isVisible={isVisible}>
            <CloseButton onClick={handleClose}>
              <MenuIcon />
            </CloseButton>
            <h3>
              {type === "user" ? "painel de usuário" : "painel da organização"}
            </h3>
            <hr />
            <span>Olá, Fernando!</span>

            <ul>
              {menuItems[type].map((menu) => (
                <li key={menu.title}>
                  <MenuLink
                    to={menu.url}
                    active={active === menu.title ? "true" : "false"}
                  >
                    <div className="menuIcon">
                      <Icons name={menu.icon} />
                    </div>
                    <span className="menuPage">{menu.title}</span>
                  </MenuLink>
                </li>
              ))}
              <li>
                <Logout onClick={handleLogout}>
                  <div className="menuIcon">
                    <Icons name="sair" />
                  </div>
                  <span className="menuPage">Sair</span>
                </Logout>
              </li>
            </ul>
          </Aside>
          <Background
            id="background"
            isVisible={isVisible}
            onClick={handleClose}
          />
        </>
      )}
    </>
  );
}
