// Core
import React, { useState } from 'react';
import { createMembros } from './backend/api';
import { Link } from 'react-router-dom';

// Style
import './App.css';

function NewLivro() {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");

    const validarMembro = () => {
        if(!nome || !endereco || !telefone ) {
            alert("Preencha todos os campos!")
      
            setNome("")
            setEndereco("")
            setTelefone("")
          } else {
            const membro = { nome, endereco, telefone };
            salvarMembros(membro);
          }
    }

    const salvarMembros = async (obj) => {
        try {
            const response = await createMembros(obj);
            alert("Membro salvo com sucesso:", response);

            setNome("")
            setEndereco("")
            setTelefone("")
          } catch (error) {
            alert("Erro ao salvar membro:", error);
          }
    }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <h2 className="nav-title">Glóbica</h2>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                Sobre
              </Link>
            </li>
            <li className="nav-item">
                <Link to="/novoLivro">
                    Cadastrar Livros
                </Link>
            </li>
            <li className="nav-item">
            <Link to="/">
                Novos Membros
            </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="section">
        <div className="section-container" style={{ marginTop: "10px" }}>
        <h1 style={{ marginTop:"0", color:"#333", fontSize: "30px" }}>
            Cadastrar Novo Membro
            <img style={{ width: "4%", height: "4%", marginLeft: "10px" }} src="https://imagepng.org/estrela/estrela-1/" />
        </h1>
        <i>
          <h4 style={{  marginTop:"-8px", color:"#333" }}>Preencha todos os campos abaixo</h4>
        </i>
          <div className="section-input-content">
            <input
              className="section-input-box"
              type='text'
              placeholder='Nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="section-input-box"
              type='text'
              placeholder='Endereço'
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <input
              className="section-input-box"
              type='number'
              placeholder='Telefone'
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <button onClick={validarMembro} className="section-button-salvar">Salvar</button>
          </div>
        </div>
      </section>
      <footer style={{ position: "absolute" }}>
        <div class="footer-content">
          <div class="footer-logo">
            <h2 className="nav-title">Glóbica</h2>
          </div>
          <div class="footer-links">
            <a href="#">Página Inicial</a>
            <a href="#">Produtos</a>
            <a href="#">Sobre Nós</a>
            <a href="#">Contato</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default NewLivro;
