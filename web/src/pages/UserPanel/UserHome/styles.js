import styled from "styled-components";
import { Link } from "react-router-dom";
import themeData from "../../../assets/theme/theme";
export const InfoLeft = styled.div`
  display: flex;
  align-items: center;
`;
export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    padding: 0 20px;
  }
`;
export const NewDevice = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  padding: 5px 20px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${themeData.colors.greenDark};
  color: ${themeData.colors.background};
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
  &:hover {
    background-color: ${themeData.colors.greenLight};
  }
  @media screen and (max-width: 700px) {
    & {
      padding: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: block;
      position: relative;
    }
    svg {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 7px;
      left: 7px;
    }
    span {
      display: none;
    }
  }
`;
export const InfoRight = styled.div`
  margin-left: 20px;
  padding: 5px 10px;
  min-width: 106px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 300;
  background-color: ${themeData.colors.gray};
  color: ${themeData.colors.lightGrayDark};
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
export const Circle = styled.div`
  background-color: ${(props) =>
    props.status === "online"
      ? themeData.colors.greenLight
      : props.status === "wait"
      ? themeData.colors.orange
      : themeData.colors.redDark};
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  margin-right: 10px;
`;
export const TotalDevices = styled.div`
  text-align: right;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  font-weight: 100;
  font-size: 1rem;
  @media screen and (max-width: 700px) {
    padding: 0 20px;
    margin-bottom: 20px;
  }
`;
