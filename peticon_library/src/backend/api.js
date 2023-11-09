const BASE_URL = 'http://localhost:5000/';

// Livros
export const createLivros = async (livro) => {
  const response = await fetch(`${BASE_URL}api/livros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(livro),
  });

  return await response.json();
};

export const getLivros = async () => {
  const response = await fetch(`${BASE_URL}livros`);
  return await response.json();
};

// Membros
export const createMembros = async (membro) => {
  const response = await fetch(`${BASE_URL}api/membros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(membro),
  });

  return await response.json();
};

export const getMembros = async () => {
  const response = await fetch(`${BASE_URL}membros`);
  return await response.json();
};

// Emprestimos
export const createEmprestimo = async(emprestimo) => {
  const response = await fetch(`${BASE_URL}api/emprestimo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emprestimo),
  });

  return await response.json();
}

export const devolucaoEmprestimo = async(devolucao) => {
  const response = await fetch(`${BASE_URL}api/devolucao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(devolucao),
  });

  return await response.json();
}