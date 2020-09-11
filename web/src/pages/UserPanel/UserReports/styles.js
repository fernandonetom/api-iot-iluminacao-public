import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
`;
export const Title = styled.span`
  font-size: 1rem;
  font-weight: 300;
`;
export const BoxItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  max-width: 500px;
  grid-column-gap: 5px;
  grid-row-gap: 20px;
  margin: 15px auto;
  margin-bottom: 30px;
`;
