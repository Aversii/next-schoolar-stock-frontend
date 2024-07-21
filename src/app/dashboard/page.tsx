"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Container, Header, Sidebar, MainContent, Table, Button, ButtonBin } from "./styles";
import { FaEdit, FaTrashAlt, FaFilter } from "react-icons/fa";

// Custom Hook for Authentication Check
const useAuthRedirect = (redirectTo = '/') => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push(redirectTo);
        return;
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, redirectTo]);

  return loading;
};

export default function Dashboard() {
  const router = useRouter();
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState("");
  const loading = useAuthRedirect('/');

  useEffect(() => {
    if (loading) return;

    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.push('/');
          return;
        }

        const response = await axios.get("http://localhost:8000/materials", {
          headers: {
            Authorization: `${token}`
          }
        });

        setMaterials(response.data.materials);
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

    fetchMaterials();
  }, [loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <ButtonBin onClick={() => {
          localStorage.removeItem("authToken");
          router.push('/');
        }}>Logout</ButtonBin>
      </Header>
      <div style={{ display: 'flex', height: '90vh' }}>
        <Sidebar>
          <ul>
            <li onClick={()=>router.push("/dashboard")}><a href="#!">Home</a></li>
            <li onClick={()=>router.push("/reabastecimento")} ><a href="#!">Reabastecimento</a></li>
            <li><a href="#!">Configurações</a></li>
          </ul>
        </Sidebar>
        <MainContent>
          {error && <p className="text-danger">{error}</p>}
          <h2>MATERIAIS</h2>
          <Table>
            <thead>
              <tr>
                <th>Nome </th>
                <th>Quantidade</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material: any) => (
                <tr key={material.id}>
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <td>{material.unitMeasurement}</td>
                  <td>
                    <Button onClick={() => {/* Logic to edit quantity */}}>
                      <FaEdit style={{ color: 'black' }} />
                    </Button>
                    <ButtonBin style={{ color: 'black' }} onClick={() => {/* Logic to delete item */}}>
                      <FaTrashAlt />
                    </ButtonBin>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MainContent>
      </div>
    </Container>
  );
}