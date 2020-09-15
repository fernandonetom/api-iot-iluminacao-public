import React from "react";
import { Aside, Background, MenuLink, Logout, CloseButton } from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import Icons from "../../assets/icons";
export default function SidebarMenu({ isVisible, active, type, onClose }) {
  const menuItems = {
    organization: [
      { title: "dashboard", url: "/organization/dashboard", icon: "dashboard" },
      { title: "usuários", url: "/organization/users", icon: "users" },
      { title: "novo usuário", url: "/organization/new-user", icon: "plus" },
      { title: "perfil", url: "/organization/profile", icon: "user" },
    ],
    user: [
      { title: "dashboard", url: "/user/dashboard", icon: "dashboard" },
      { title: "novo dispositivo", url: "/user/new-device", icon: "plus" },
      { title: "relatórios", url: "/user/reports", icon: "reports" },
      { title: "perfil", url: "/user/profile", icon: "user" },
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
                <Logout to="logout">
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
