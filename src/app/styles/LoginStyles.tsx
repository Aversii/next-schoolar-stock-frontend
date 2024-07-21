import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0f0f0f;
`;

export const Card = styled.div`
  background-color: #1f1f1f;
  color: white;
  border-radius: 1rem;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

export const Subtitle = styled.p`
  color: #adb5bd;
  margin-bottom: 2rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border: 0.75px solid #495057;
  border-radius: 0.5rem;
  background-color: #3f3f3f;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    border-color: #adb5bd; 
    box-shadow: 0 0 0.2rem rgba(255, 255, 255, 0.25);
  }

  &::placeholder {
    color: transparent;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    top: -0.6rem;
    left: 0.2rem;
    font-size: 0.85rem;
    color: #adb5bd;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 1rem;
  transition: all 0.3s;
  pointer-events: none;
`;

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 1rem ;
  
  &:hover {
    background-color: #61dafb;
    color: #212529;
  }
`;


export const Link = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
