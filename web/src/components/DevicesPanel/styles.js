import styled from "styled-components";
import themeData from "../../assets/theme/theme";

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
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
  &:hover {
    background-color: ${themeData.colors.grayLight};
  }
`;
export const DeviceItemIcon = styled.div`
  path {
    fill: ${(props) =>
      props.status === "1"
        ? themeData.colors.orange
        : themeData.colors.lightGrayDark};
  }
`;
export const DeviceItemName = styled.div`
  font-size: 1rem;
  font-weight: 200;
`;
