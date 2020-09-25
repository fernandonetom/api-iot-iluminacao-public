import styled from "styled-components";
import themeData from "../../assets/theme/theme";

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;

  @media screen and (max-width: 1200px) {
    & {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media screen and (max-width: 1000px) {
    & {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media screen and (max-width: 800px) {
    & {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (max-width: 700px) {
    & {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 20px;
    }
  }
`;
export const DeviceItem = styled.div`
  background-color: ${themeData.colors.gray};
  border-radius: 5px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  @media screen and (min-width: 700px) {
    &:hover {
      transform: scale(1.05);
      background-color: ${themeData.colors.grayLight};
    }
  }
`;
export const DeviceItemIcon = styled.div`
  path {
    fill: ${(props) =>
      props.status ? themeData.colors.orange : themeData.colors.lightGrayDark};
  }
`;
export const DeviceItemName = styled.div`
  font-size: 1rem;
  font-weight: 200;
`;
