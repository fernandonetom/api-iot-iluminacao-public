import React, { useState } from "react";
import { Container, LogoBox, RightBox, SectionInfo } from "./styles";
import LogoHeader from "../../assets/images/LogoHeader";
import MenuIcon from "../../assets/images/MenuIcon";
import SidebarMenu from "../SidebarMenu";
export default function Header({ children, menuType, active }) {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <Container>
        <LogoBox>
          <LogoHeader />
        </LogoBox>
        <RightBox onClick={() => setMenuVisible(true)}>
          <MenuIcon />
        </RightBox>
      </Container>
      <SidebarMenu
        isVisible={menuVisible}
        active={active}
        type={menuType}
        onClose={() => setMenuVisible(false)}
      />
      {children && <SectionInfo>{children}</SectionInfo>}
    </>
  );
}
