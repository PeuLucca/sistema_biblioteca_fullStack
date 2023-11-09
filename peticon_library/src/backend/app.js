const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "peticon",
})

let livros = [];
let membros = [];
let emprestimos = [];

app.get('/', (req, res) => {
    return res.json('Sucesso ao conectar server!');
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Livros
// Retornar todos os objetos livros
app.get('/livros', (req, res) => {
    const query = "SELECT * FROM livros";

    db.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// Cria novo livro
app.post('/api/livros', (req, res) => {
    const { titulo, autor, quantidade, preco, caminho } = req.body;
    if (!titulo || !autor || !quantidade || !preco || !caminho) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const newLivros = { titulo, autor, quantidade, preco, caminho };
    livros.push(newLivros);
  
    const query = `INSERT INTO livros (titulo, autor, quantidade, preco, caminho) VALUES (?, ?, ?, ?, ?)`;
    const values = [titulo, autor, quantidade, preco, caminho];

    db.query(query, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(201).json(newLivros);
    });
});

// Membros
// Retornar todos os objetos membros
app.get('/membros', (req, res) => {
  const query = "SELECT * FROM membros";

  db.query(query, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})

// Cria novo membros
app.post('/api/membros', (req, res) => {
  const { nome, endereco, telefone } = req.body;
  if (!nome || !endereco || !telefone) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const newMembros = { nome, endereco, telefone };
  membros.push(newMembros);

  const query = `INSERT INTO membros (nome, endereco, telefone) VALUES (?, ?, ?)`;
  const values = [nome, endereco, telefone];

  db.query(query, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `${err}` });
    }
    return res.status(201).json(newMembros);
  });
});

// Cria novo emprestimo
// 0 = devolvido / 1 = emprestado
app.post('/api/emprestimo', (req, res) => {
  const { idLivro, selectedId } = req.body;
  if (!selectedId || !idLivro) {
    return res.status(400).json({ res: 'Todos os campos são obrigatórios.' });
  }

  // Verificar se há livros disponíveis no estoque
  const queryVerificarEstoque = `SELECT quantidade FROM livros WHERE id = ?`;
  const valuesVerificarEstoque = [idLivro];

  db.query(queryVerificarEstoque, valuesVerificarEstoque, (err, result) => {
    if (err) {
      return res.status(500).json({ res: "Erro ao verificar estoque" });
    }

    const quantidadeDisponivel = result[0].quantidade;

    if (quantidadeDisponivel < 1) {
      return res.status(400).json({ res: 'Não há livros disponíveis no estoque.' });
    }

    const newEmprestimo = { selectedId, idLivro };
    emprestimos.push(newEmprestimo);

    // Atualizar a quantidade de livros no estoque
    const queryQuantidadeLivros = `UPDATE livros SET quantidade = quantidade - 1 WHERE id = ?`;
    const valuesQuantidadeLivros = [idLivro];

    db.query(queryQuantidadeLivros, valuesQuantidadeLivros, (err, dataQuantidadeLivros) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }

      // Inserir novo empréstimo
      const query = `INSERT INTO emprestimos (livroId, membroId, status) VALUES (?, ?, ?)`;
      const values = [idLivro, selectedId, 1];

      db.query(query, values, (err, dataEmprestimo) => {
        if (err) {
          // Se houver um erro, você pode considerar reverter a atualização da quantidade de livros.
          return res.status(500).json({ res: "Erro ao inserir empréstimo"  });
        }

        return res.status(201).json({res: "Empréstimo feito com sucesso"});
      });
    });
  });
});

// Devolução Livro
// 0 = devolvido / 1 = emprestado
app.post('/api/devolucao', (req, res) => {
  const { idLivro, selectedId } = req.body;

  if (!selectedId || !idLivro) {
    return res.status(400).json({ res: 'Todos os campos são obrigatórios.' });
  }
  const queryVerificarEmprestimo = `SELECT * FROM emprestimos WHERE membroId = ? AND livroId = ? AND status = 1`;
  const valuesVerificarEmprestimo = [selectedId, idLivro];

  db.query(queryVerificarEmprestimo, valuesVerificarEmprestimo, (err, result) => {
    if (err) {
      return res.status(500).json({ res: `${err}` });
    }

    if (result.length === 0) {
      return res.status(400).json({ res: 'Este livro não foi emprestado para este membro.' });
    }

    const queryAtualizarEmprestimo = `UPDATE emprestimos SET status = 0 WHERE membroId = ? AND livroId = ?`;
    const valuesAtualizarEmprestimo = [selectedId, idLivro];

    db.query(queryAtualizarEmprestimo, valuesAtualizarEmprestimo, (err, dataAtualizarEmprestimo) => {
      if (err) {
        return res.status(500).json({ res: `${err}` });
      }

      const queryAcrescentarQuantidade = `UPDATE livros SET quantidade = quantidade + 1 WHERE id = ?`;
      const valuesAcrescentarQuantidade = [idLivro];

      db.query(queryAcrescentarQuantidade, valuesAcrescentarQuantidade, (err, dataAcrescentarQuantidade) => {
        if (err) {
          console.error(`Erro ao acrescentar quantidade: ${err}`);
          return res.status(500).json({ res: `${err}` });
        }

        return res.status(200).json({ res: 'Livro devolvido com sucesso.' });
      });
    });
  });
});
