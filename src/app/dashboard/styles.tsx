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
    color:black
  }
`;

export const MainContent = styled.main`
  flex: 1;
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

  
  tr :last-child{
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
  `
;

export const Button = styled.button`
  background-color: #444;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  

  &:hover {

    :last-child{
    color: #00FA05;
  }
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
    :last-child{
    color: #dc143c;
  }
  }

`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #0f0f0f;
  color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  h3 {
    margin-bottom: 15px;
    font-size: 1.2em;
    color: #61dafb;
  }

  p {
    margin-bottom: 20px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    flex: 1;
    margin: 0 5px;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1em;
    color: #ffffff;
    transition: background-color 0.3s;
  }

  :first-child{
    &:hover {
      background-color: #00FA05;
      color:black
    }
  }

  :last-child{
    &:hover {
      background-color: #b80027;
      color:black

    }
  }
`;

export const EditModalContent = styled.div`
  background: #0f0f0f;
  color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  width: 400px;  
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  h3 {
    margin-bottom: 15px;
    font-size: 1.2em;
    color: #61dafb;
  }

  p {
    margin-bottom: 20px;
  }

  input, select {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    background: #1c1c1c;
    color: #ffffff;
  }
`;

