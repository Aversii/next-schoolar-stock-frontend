import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  color: white;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f0f0f;
  height: 10vh;
`;

export const Sidebar = styled.aside`
  width: 250px;
  padding: 10px;
  height: 90vh;
  background-color: #0f0f0f;
  color: #ffffff;
  min-height: 100%;

  ul {
    list-style-type: none; 
    padding: 0;
  }

  li {
    margin: 10px 0;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    display: block;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: #61dafb;
    color: black;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 90vh;
  overflow-y: auto;

  h2 {
    text-align: center;
    color: #ffffff;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;

  th, td {
    border: 1px solid #333;
    padding: 10px;
    text-align: left;
  }

  tr:last-child {
    display: flex;
    justify-content: center;
    gap: 40px;
  }

  th {
    background-color: #333;
  }

  tbody tr:hover {
    color: #61dafb;
  }
`;

export const Button = styled.button`
  background-color: #444;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: #00FA05;
  }
`;

export const ButtonBin = styled.button`
  background-color: #444;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: #dc143c;
  }
`;
