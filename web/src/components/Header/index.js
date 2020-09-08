import React from "react";
import { Container, LogoBox, RightBox, SectionInfo } from "./styles";
import LogoHeader from "../../assets/images/LogoHeader";
import MenuIcon from "../../assets/images/MenuIcon";
export default function Header({ children, openMenu }) {
  return (
    <>
      <Container>
        <LogoBox>
          <LogoHeader />
        </LogoBox>
        <RightBox onClick={openMenu}>
          <MenuIcon />
        </RightBox>
      </Container>
      {children && <SectionInfo>{children}</SectionInfo>}
    </>
  );
}
