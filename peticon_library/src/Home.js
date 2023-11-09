// Core
import React, { useState, useEffect } from 'react';
import { getLivros, getMembros, createEmprestimo, devolucaoEmprestimo } from './backend/api';
import { Link } from 'react-router-dom';
import Modal from './Modal';

// Style
import './App.css';
import { FaInfoCircle, FaBook, FaArrowAltCircleUp  } from 'react-icons/fa';

function Home() {
  const [livros, setLivros] = useState([]);
  const [membros, setMembros] = useState([]);

  const [isModalOpenInfo, setModalOpenInfo] = useState(false);
  const [isModalEmprestar, setModalEmprestar] = useState(false);
  const [isModalDevolver, setModalDevolver] = useState(false);

  const [livroFocus, setLivroFocus] = useState({});

  const [selectedId, setSelectedId] = useState("");

  const [response, setResponse] = useState({});

  const openModalInfo = (obj) => {
    setLivroFocus(obj)
    setModalOpenInfo(true);
  };

  const closeModalInfo = () => {
    setLivroFocus({})
    setModalOpenInfo(false);
  };

  const openModalEmprestar = (obj) => {
    setLivroFocus(obj)
    setModalEmprestar(true);
  };

  const closeModalEmprestar = () => {
    setLivroFocus({});
    setSelectedId("");
    setModalEmprestar(false);
  };

  const openModaDevolver = (obj) => {
    setLivroFocus(obj)
    setModalDevolver(true);
  };

  const closeModaDevolver = () => {
    setLivroFocus({})
    setSelectedId("");
    setModalDevolver(false);
  };

  const validarCampo = (operacao) => {
    if(!selectedId || !livroFocus) {
      alert("Por favor, preencha todos os campos")
      setSelectedId("");
      setLivroFocus({});
    } else {
      if(operacao === 'emprestar') {
        salvarEmprestimo();
      } else {
        salvarDevolucao();
      }
    }
  };

  const salvarEmprestimo = async () => {
    try {
      const idLivro = livroFocus.id;
      const obj = { idLivro, selectedId };
      const res = await createEmprestimo(obj);
      setResponse(res);
      alert(res.res);
      closeModalEmprestar();
      setSelectedId("");
      setLivroFocus({}); 
    } catch (error) {
      alert("Erro ao efetuar empréstimo:", error);
    }
  }

  const salvarDevolucao = async () => {
    try {
      const idLivro = livroFocus.id;
      const obj = { idLivro, selectedId };
      const res = await devolucaoEmprestimo(obj);
      setResponse(res);
      alert(res.res);
      closeModaDevolver();
      setSelectedId("");
      setLivroFocus({}); 
    } catch (error) {
      alert("Erro ao efetuar devolução:", error);
    }
  }

  useEffect(() => {
    async function fetchLivros() {
      const livrosData = await getLivros();
      setLivros(livrosData);
    }

    async function fetchMembros() {
      const membrosData = await getMembros();
      setMembros(membrosData);
    }

    fetchLivros();
    fetchMembros();
  }, [,response]);

  return (
    <>
      <header className="header">
        <nav className="nav">
          <h2 className="nav-title">Glóbica</h2>
          <ul className="nav-list">
            <li className="nav-item">
              <a>Home</a>
            </li>
            <li className="nav-item">
              <a href='#sobre'>Sobre</a>
            </li>
            <li className="nav-item">
                <Link to="/novoLivro">
                    Cadastrar Livros
                </Link>
            </li>
            <li className="nav-item">
              <div>
              <Link to="/novoMembro">
                Novos Membros
              </Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <section className="section">

      <Modal isOpen={isModalOpenInfo} onClose={closeModalInfo}>
        <div className="book-details">
          <h2>Título: {livroFocus.titulo}</h2>
          <h3>Autor: {livroFocus.autor}</h3>
          <p>
            <i>
            Nenhuma descrição foi feita para o livro <b>{livroFocus.titulo}</b> de <b>{livroFocus.autor}</b>,
            caso seja necessário entrar em contato com equipe de desenvolvimento
            </i>
          </p>
          <div className="details">
            <div className="detail">
              <strong>
                Quantidade em estoque: <span>{livroFocus.quantidade}</span>
              </strong>
            </div>
            <div className="detail">
              <strong>Preço: <span>R${livroFocus.preco}</span></strong>
            </div>
          </div>
          <img src={livroFocus.caminho} alt={livroFocus.titulo} />
        </div>
      </Modal>

      <Modal isOpen={isModalEmprestar} onClose={closeModalEmprestar}>
        <div className="modal-content">
          <h3>Livro sendo emprestado: {livroFocus.titulo}</h3>
          <h4>Selecione o membro:</h4>
          <select
            className="modal-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">Selecione um membro</option>
            {membros.map((membro) => (
              <option key={membro.id} value={membro.id}>
                {membro.nome}
              </option>
            ))}
          </select>
          <button onClick={() => validarCampo("emprestar")} className="modal-button">Salvar</button>
        </div>
      </Modal>


      <Modal isOpen={isModalDevolver} onClose={closeModaDevolver}>
        <div className="modal-content">
          <h3>Livro sendo devolvido: {livroFocus.titulo}</h3>
          <h4>Selecione o membro:</h4>
          <select
            className="modal-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">Selecione um membro</option>
            {membros.map((membro) => (
              <option key={membro.id} value={membro.id}>
                {membro.nome}
              </option>
            ))}
          </select>
          <button onClick={() => validarCampo("devolver")} className="modal-button">Salvar</button>
        </div>
      </Modal>

        <h1 style={{ color: "#555" }}>Livros em alta</h1>
        <div style={{ display:"flex", justifyContent:"space-around", flexWrap: "wrap", gap:"20px" }}>
          {
            livros.map((livro) => (
              <div className="section-card">
                <div style={{ }}>
                  <img className="section-card-img" src={livro.caminho} alt={livro.autor} />
                  <h4 className="section-card-qnt">
                    R$ {livro.preco} <br />
                    Estoque: <i>{livro.quantidade}</i><br />
                    {livro.autor}
                  </h4>
                </div>
                <h4 className="section-card-title">
                  {livro.titulo}
                </h4>
                <div className="section-card-container">
                  <button onClick={() => openModalInfo(livro)} className="section-card-button">
                    <FaInfoCircle/>
                  </button>
                  <button onClick={() => openModalEmprestar(livro)} className="section-card-button">
                    <FaBook/>
                  </button>
                  <button onClick={() => openModaDevolver(livro)} className="section-card-button">
                    <FaArrowAltCircleUp/>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <section id='sobre' className='section'>
        <div className='about-container'>
          <div className='about-text'>
            <h2>Sobre nosso sistema</h2>
            <p>Nossa ferramenta interna simplifica o controle de estoque, agiliza o atendimento ao cliente e torna o dia a dia dos nossos colaboradores mais eficiente, para que possam oferecer o melhor serviço aos amantes da leitura que nos visitam</p>
            <b>
              <p style={{ color: 'black' }}>Por-favor, contate seu supervisor caso haja qualquer dúvida ou problema!</p>
            </b>
          </div>
          <div className='about-image'>
            <img src="https://i.pinimg.com/564x/b4/ab/72/b4ab7222da63b12c06c8e3ba9290bd0b.jpg" alt='Sobre a Peticon' />
          </div>
        </div>
      </section>
      <footer>
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

export default Home;
