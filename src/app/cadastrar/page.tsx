"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Card, Title, Subtitle, InputWrapper, Input, Label } from "../styles/LoginStyles";
import Layout from "../components/components";
import { Button } from "./styles"; // Importe o botão a partir do arquivo correto

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleCreateMaterial = async () => {
    try {
      setError("");
      setSuccessMessage("");
      const response = await axios.post("http://localhost:8000/material/create", {
        name: nome,
        quantity: parseInt(quantidade),
        unitMeasurement: unidade
      }, {
        headers: {
          Authorization: `${token}`
        }
      });

      const { message } = response.data;
      setSuccessMessage(message);
      router.push('/dashboard', { scroll: false });
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
    <Layout>
      <Card>
        <Title>Cadastro de Material</Title>
        <Subtitle>Preencha os dados do material</Subtitle>

        <InputWrapper>
          <Input
            type="text"
            id="nome"
            placeholder="Nome do Material"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <Label htmlFor="nome">Nome</Label>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="number"
            id="quantidade"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
          <Label htmlFor="quantidade">Quantidade</Label>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            id="unidade"
            placeholder="Unidade de Medida"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            required
          />
          <Label htmlFor="unidade">Unidade</Label>
        </InputWrapper>

        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}

        <Button onClick={handleCreateMaterial}>Cadastrar</Button>
      </Card>
    </Layout>
  );
}
