// styles/index.ts
import styled from "styled-components";

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #00bcd4;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 1rem;
  background-color: #1e3a5f;
  color: #ffffff;
`;

export const Button = styled.button`
  background-color: #00bcd4;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 1rem;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #008c9e;
  }

  &:disabled {
    background-color: #555555;
    cursor: not-allowed;
  }
`;
