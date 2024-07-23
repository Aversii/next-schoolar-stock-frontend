"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Container,
  Header,
  Sidebar,
  MainContent,
  Table,
  Button,
  ButtonBin,
  ButtonDownload,
} from "./styles";
import { FaEdit, FaFileWord, FaTrashAlt } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalActions,
  EditModalContent,
} from "../dashboard/styles";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

// Define the type for Material
interface Material {
  id: number;
  name: string;
  quantity: number;
  unitMeasurement: string;
}

// Custom Hook for Authentication Check
const useAuthRedirect = (redirectTo = "/") => {
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

export default function Reabastecimento() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [error, setError] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  ); // For deletion
  const [editMaterial, setEditMaterial] = useState<Material | null>(null); // For editing
  const [showModal, setShowModal] = useState(false); // For showing delete modal
  const [showEditModal, setShowEditModal] = useState(false); // For showing edit modal
  const loading = useAuthRedirect("/");

  useEffect(() => {
    if (loading) return;

    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.push("/");
          return;
        }

        const response = await axios.get(
          "https://typescript-scholar-stock.vercel.app/replenishment",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setMaterials(response.data.materials);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(
              error.response.data.Error || "Erro desconhecido. Tente novamente."
            );
          } else {
            setError(
              "Erro ao conectar com o servidor. Verifique sua conexão e tente novamente."
            );
          }
        } else {
          setError("Ocorreu um erro inesperado. Tente novamente.");
        }
      }
    };

    fetchMaterials();
  }, [loading, router]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
        return;
      }

      await axios.delete(`https://typescript-scholar-stock.vercel.app/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setMaterials(materials.filter((material) => material.id !== id));
      setShowModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.Error || "Erro desconhecido. Tente novamente."
          );
        } else {
          setError(
            "Erro ao conectar com o servidor. Verifique sua conexão e tente novamente."
          );
        }
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  const handleEdit = async () => {
    if (!editMaterial) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
        return;
      }

      // Enviar solicitação PATCH para atualizar o material
      await axios.patch(
        `https://typescript-scholar-stock.vercel.app/${editMaterial.id}`,
        editMaterial,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );


      setShowEditModal(false);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.Error || "Erro desconhecido. Tente novamente."
          );
        } else {
          setError(
            "Erro ao conectar com o servidor. Verifique sua conexão e tente novamente."
          );
        }
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  const generateWordDocument = () => {
    const formatMaterialList = (materials: Material[]) => {
      return materials.map((material) => {
        return new Paragraph({
          children: [
            new TextRun({
              text: `${material.name} | Quantidade: ${material.quantity} ${material.unitMeasurement}`,
              font: "Calibri",
              color: "000000", // Preto
              size: 24, // Tamanho da fonte 12pt
            }),
          ],
          spacing: { after: 200 },
        });
      });
    };

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: "center",
              children: [
                new TextRun({
                  text: "Solicitação de Materiais",
                  font: "Calibri",
                  color: "000000",
                  size: 32, // Tamanho da fonte 16pt
                  bold: true,
                }),
              ],
              spacing: { after: 300 },
            }),
            new Paragraph({
              alignment: "right",
              children: [
                new TextRun({
                  text: `Itapecerica da Serra, ${new Date().toLocaleDateString("pt-BR")}`,
                  font: "Calibri",
                  color: "000000",
                  size: 24, // Tamanho da fonte 12pt
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              alignment: "left",
              children: [
                new TextRun({
                  text: "Prezados, solicito por gentileza os seguintes materiais:",
                  font: "Calibri",
                  color: "000000",
                  size: 24, // Tamanho da fonte 12pt
                }),
              ],
              spacing: { after: 400 },
            }),
            ...formatMaterialList(materials),
            new Paragraph({
              alignment: "left",
              children: [
                new TextRun({
                  text: "Atenciosamente,",
                  font: "Calibri",
                  color: "000000",
                  size: 24, // Tamanho da fonte 12pt
                }),
              ],
              spacing: { before: 400 },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "SolicitacaoMateriais.docx");
    });
  };

  const openModal = (material: Material) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMaterial(null);
    setShowModal(false);
  };

  const openEditModal = (material: Material) => {
    setEditMaterial(material);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditMaterial(null);
    setShowEditModal(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <ButtonBin
          onClick={() => {
            localStorage.removeItem("authToken");
            router.push("/");
          }}
        >
          Logout
        </ButtonBin>
      </Header>
      <div style={{ display: "flex", height: "90vh" }}>
        <Sidebar>
          <ul>
            <li onClick={() => router.push("/dashboard")}>
              <a href="#!">Home</a>
            </li>
            <li onClick={() => router.push("/reabastecimento")}>
              <a href="#!">Reabastecimento</a>
            </li>
            <li onClick={() => router.push("/cadastrar")}>
              <a href="#!">Cadastrar</a>
            </li>
            <li onClick={() => router.push("/configuracoes")}>
              <a href="#!">Configurações</a>
            </li>
          </ul>
        </Sidebar>
        <MainContent>
          {error && <p className="text-danger">{error}</p>}
          <h2>NECESSÁRIO FAZER PEDIDO</h2>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material: Material) => (
                <tr key={material.id}>
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <td>{material.unitMeasurement}</td>
                  <td>
                    <Button onClick={() => openEditModal(material)}>
                      <FaEdit />
                    </Button>
                    <ButtonBin onClick={() => openModal(material)}>
                      <FaTrashAlt />
                    </ButtonBin>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ButtonDownload onClick={generateWordDocument}>
                      <FaFileWord />
                      <p>Gerar Pedido</p>
                    </ButtonDownload>
        </MainContent>
      </div>

      {showModal && selectedMaterial && (
        <Modal>
          <ModalContent>
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza de que deseja excluir o material "{selectedMaterial.name}"?</p>
            <ModalActions>
              <Button onClick={() => selectedMaterial && handleDelete(selectedMaterial.id)}>Confirmar</Button>
              <ButtonBin onClick={closeModal}>Cancelar</ButtonBin>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}

      {showEditModal && editMaterial && (
        <Modal>
          <EditModalContent>
            <h3>Editar Material</h3>
            <input
              type="text"
              value={editMaterial.name}
              onChange={(e) => setEditMaterial({ ...editMaterial, name: e.target.value })}
              placeholder="Nome"
            />
            <input
              type="number"
              value={editMaterial.quantity}
              onChange={(e) => setEditMaterial({ ...editMaterial, quantity: Number(e.target.value) })}
              placeholder="Quantidade"
            />
            <input
              type="text"
              value={editMaterial.unitMeasurement}
              onChange={(e) => setEditMaterial({ ...editMaterial, unitMeasurement: e.target.value })}
              placeholder="Unidade de Medida"
            />
            <ModalActions>
              <Button onClick={handleEdit}>Salvar</Button>
              <ButtonBin onClick={closeEditModal}>Cancelar</ButtonBin>
            </ModalActions>
          </EditModalContent>
        </Modal>
      )}
    </Container>
  );
}
