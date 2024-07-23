"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Container, Card, Title, Subtitle, InputWrapper, Input, Label, Button } from "./styles/LoginStyles";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      setSuccessMessage("");
      const response = await axios.post("https://typescript-scholar-stock.vercel.app/login", {
        email,
        password
      });

      const { message, token } = response.data;
      localStorage.setItem("authToken", token); 
      setSuccessMessage(message);
      router.push('/dashboard', { scroll: false })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.Error || "Erro desconhecido. Tente novamente.");
        } else {
          setError("Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.");
        }
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
      <Container>
        <Card>
          <Title>E.M Acácia</Title>
          <Subtitle>Faça Login para gerenciar o estoque</Subtitle>

          <InputWrapper>
            <Input
              type="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label htmlFor="email">Email</Label>
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label htmlFor="password">Senha</Label>
          </InputWrapper>

          {error && <p className="text-danger">{error}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <Button onClick={handleLogin}>Login</Button>

          <p className="small mb-4">
            <Link href="#!">Problemas com o acesso?</Link>
          </p>
        </Card>
      </Container>
  );
}
