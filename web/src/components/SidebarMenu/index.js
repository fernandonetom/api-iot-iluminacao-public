import React from "react";
import { Aside, Background, MenuLink, Logout, CloseButton } from "./styles";
import MenuIcon from "../../assets/images/MenuIcon";
import Icons from "../../assets/icons";
export default function SidebarMenu({ isVisible, active, type, onClose }) {
  const menuItems = {
    organization: [{ title: "Teste", url: "/teste", icon: "tre" }],
    user: [
      { title: "dashboard", url: "/user/dashboard", icon: "dashboard" },
      { title: "novo dispositivo", url: "/user/new-device", icon: "plus" },
      { title: "perfil", url: "/user/profile", icon: "user" },
    ],
  };
  return (
    <>
      {isVisible && (
        <>
          <Aside isVisible={isVisible}>
            <CloseButton onClick={onClose}>
              <MenuIcon />
            </CloseButton>
            <h3>Painel de usuário</h3>
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
          <Background isVisible={isVisible} onClick={onClose} />
        </>
      )}
    </>
  );
}
