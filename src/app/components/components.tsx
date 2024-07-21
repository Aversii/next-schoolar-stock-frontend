'use client';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonBin, Container, Header, MainContent, Sidebar } from '../cadastrar/styles';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push('/');
  };

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <ButtonBin onClick={handleLogout}>Logout</ButtonBin>
      </Header>
      <div style={{ display: 'flex', height: '90vh' }}>
        <Sidebar>
          <ul>
            <li onClick={() => router.push("/dashboard")}><a href="#!">Home</a></li>
            <li onClick={() => router.push("/reabastecimento")}><a href="#!">Reabastecimento</a></li>
            <li onClick={() => router.push("/cadastrar")}><a href="#!">Cadastrar</a></li>
            <li onClick={() => router.push("/configuracoes")}><a href="#!">Configurações</a></li>
          </ul>
        </Sidebar>
        <MainContent>
          {children}
        </MainContent>
      </div>
    </Container>
  );
};

export default Layout;
