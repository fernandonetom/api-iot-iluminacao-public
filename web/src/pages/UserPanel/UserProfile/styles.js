import styled from "styled-components";
import themeData from "../../../assets/theme/theme";

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 40px;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
    padding: 40px 20px;
  }
`;
export const ContainerLeft = styled.div``;
export const ContainerRight = styled.div``;
export const ProfilePanel = styled.div`
  background-color: ${themeData.colors.gray};
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;
export const ProfilePanelTag = styled.div`
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
`;
export const ProfileTag = styled.div`
  background-color: ${themeData.colors.orange};
  padding: 5px;
  border-radius: 5px;
  color: ${themeData.colors.background};
  font-size: 0.7rem;
  font-weight: 500;
`;
export const ProfileAvatar = styled.div`
  svg {
    width: 110px;
  }
`;
export const ProfileName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 2rem;
`;
export const ProfileEmail = styled.div`
  font-size: 0.9rem;
  font-weight: 200;
`;
export const ProfileOrg = styled.div`
  font-size: 0.9rem;
  font-weight: 200;
  margin-top: 20px;
`;
export const ProfileData = styled.div`
  font-size: 0.9rem;
  font-weight: 200;
`;
export const UpdatePanel = styled.div`
  background-color: ${themeData.colors.gray};
  border-radius: 5px;
  padding: 40px;
  margin-top: 20px;
  text-align: center;
  @media screen and (max-width: 700px) {
    padding: 20px;
  }
`;
export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  margin-bottom: 40px;
  input {
    width: 100%;
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
  }
`;
export const TextPassword = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
`;
export const SubmitButtom = styled.button`
  border: 0;
  outline: 0;
  height: 40px;
  width: 200px;
  text-align: center;
  line-height: 40px;
  vertical-align: center;
  color: ${themeData.colors.background};
  background-color: ${themeData.colors.greenDark};
  text-transform: uppercase;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin-top: 20px;
  @media screen and (min-width: 700px) {
    &:hover {
      background-color: ${themeData.colors.greenLight};
      transform: scale(1.05);
    }
  }
`;
