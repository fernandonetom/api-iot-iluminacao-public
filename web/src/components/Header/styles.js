import styled from "styled-components";
import themeData from "../../assets/theme/theme";
export const Container = styled.header`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  @media screen and (max-width: 700px) {
    padding: 40px 20px 0 20px;
  }
`;
export const LogoBox = styled.div`
  background-color: ${themeData.colors.gray};
  height: 54px;
  width: 178px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 700px) {
    width: 160px;
  }
`;
export const RightBox = styled.div`
  background-color: ${themeData.colors.gray};
  height: 54px;
  width: 66px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    width: 60px;
  }
  @media screen and (min-width: 700px) {
    &:hover {
      background-color: ${themeData.colors.grayLight};
      line {
        stroke: ${themeData.colors.lightGrayLight};
      }
      line:first-child {
        transform: translate(1720px, 84.5px);
      }
      line:nth-child(2) {
        transform: translate(1705px, 98.25px);
      }
    }
  }
  line {
    stroke: ${themeData.colors.lightGrayDark};
    transition: all 0.3s ease-in-out;
  }
  svg {
    width: 30px;
  }
`;
export const SectionInfo = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 40px;
`;
