// Core
import React, { useState } from 'react';
import { createLivros } from './backend/api';
import { Link } from 'react-router-dom';

// Style
import './App.css';

function NewLivro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [caminho, setCaminho_imagem] = useState("");

  const validarLivro = () => {
    if(!titulo || !autor || !preco || !quantidade || !caminho) {
      alert("Preencha todos os campos!")

      setTitulo("")
      setAutor("")
      setPreco("")
      setQuantidade("")
      setCaminho_imagem("")
    } else {
      const livro = { titulo, autor, preco, quantidade, caminho };
      salvarLivro(livro);
    }
  }

  const salvarLivro = async (obj) => {
    try {
      const response = await createLivros(obj);
      alert("Livro salvo com sucesso:", response);
      setTitulo("")
      setAutor("")
      setPreco("")
      setQuantidade("")
      setCaminho_imagem("")
    } catch (error) {
      alert("Erro ao salvar o livro:", error);
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
        <h1 style={{ marginTop:"0", color:"#333", fontSize: "30px" }}>Cadastrar novo livro</h1>
        <i>
          <h4 style={{  marginTop:"-8px", color:"#333" }}>Preencha todos os campos abaixo</h4>
        </i>
          <div className="section-input-content">
            <input
              className="section-input-box"
              type='text'
              placeholder='Titulo'
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <input
              className="section-input-box"
              type='text'
              placeholder='Autor'
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            <input
              className="section-input-box"
              type='number'
              placeholder='Quantidade'
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <input
              className="section-input-box"
              type='text'
              placeholder='Preço'
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
            <input
              className="section-input-box"
              type='text'
              placeholder='Caminho da imagem'
              value={caminho}
              onChange={(e) => setCaminho_imagem(e.target.value)}
            />
            <button onClick={validarLivro} className="section-button-salvar">Salvar</button>
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
