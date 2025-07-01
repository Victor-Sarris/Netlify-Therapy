const consultas = [
  {
    nome: "Manoel Vitor",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
    data: "2025-03-15",
    preco: 100,
    status: "Agendada"
  },
  {
    nome: "Marconny Maximo",
    img: "https://randomuser.me/api/portraits/men/74.jpg",
    data: "2025-02-22",
    preco: 90,
    status: "Concluída"
  },
  {
    nome: "Daiane Dias",
    img: "https://randomuser.me/api/portraits/women/78.jpg",
    data: "2025-01-27",
    preco: 80,
    status: "Concluída"
  },
  {
    nome: "Alanna Torres",
    img: "https://randomuser.me/api/portraits/women/47.jpg",
    data: "2024-12-13",
    preco: 100,
    status: "Concluída"
  },
  {
    nome: "Anderson Vieira",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    data: "2024-11-01",
    preco: 100,
    status: "Cancelada"
  },
  {
    nome: "Amanda Laís",
    img: "https://randomuser.me/api/portraits/women/11.jpg",
    data: "2024-08-22",
    preco: 80,
    status: "Cancelada"
  },
  {
    nome: "Laura Beatriz",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    data: "2024-08-22",
    preco: 90,
    status: "Concluída"
  },
  {
    nome: "Miguel Dias",
    img: "https://randomuser.me/api/portraits/men/71.jpg",
    data: "2024-08-22",
    preco: 80,
    status: "Concluída"
  }
];

let paginaAtual = 1;
const porPagina = 5;
let filtro = '';
let ordenacao = { campo: 'data', direcao: 'desc' };

function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function renderTabela() {
  let filtradas = consultas.filter(c =>
    c.nome.toLowerCase().includes(filtro) ||
    c.status.toLowerCase().includes(filtro)
  );

  if (ordenacao.campo === 'status') {
    filtradas.sort((a, b) => a.status.localeCompare(b.status) * (ordenacao.direcao === 'asc' ? 1 : -1));
  } else {
    filtradas.sort((a, b) => (a.data < b.data ? -1 : 1) * (ordenacao.direcao === 'asc' ? 1 : -1));
  }

  const inicio = (paginaAtual - 1) * porPagina;
  const paginadas = filtradas.slice(inicio, inicio + porPagina);

  const tbody = document.getElementById('consultas-body');
  tbody.innerHTML = '';
  paginadas.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td>
          <div class="psicologo-info">
            <img src="${c.img}" class="psicologo-img" alt="${c.nome}">
            <span>${c.nome}</span>
          </div>
        </td>
        <td>${c.data.split('-').reverse().join('/')}</td>
        <td>R$ ${c.preco.toFixed(2).replace('.', ',')}</td>
        <td class="status-${removerAcentos(c.status.toLowerCase())}">${c.status}</td>
        <td><span class="info-icon" title="Mais informações">i</span></td>
      </tr>
    `;
  });

  renderPaginacao(filtradas.length);
}

function renderPaginacao(total) {
  const totalPaginas = Math.ceil(total / porPagina);
  const pageNumbers = document.getElementById('pageNumbers');
  pageNumbers.innerHTML = '';
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === paginaAtual) btn.classList.add('active');
    btn.onclick = () => { paginaAtual = i; renderTabela(); };
    pageNumbers.appendChild(btn);
  }
  document.getElementById('anteriorPage').disabled = paginaAtual === 1;
  document.getElementById('proximaPagina').disabled = paginaAtual === totalPaginas;
}

document.getElementById('inputBusca').addEventListener('input', e => {
  filtro = e.target.value.toLowerCase();
  paginaAtual = 1;
  renderTabela();
});

document.getElementById('sort-status').addEventListener('click', () => {
  ordenacao = { campo: 'status', direcao: ordenacao.direcao === 'asc' ? 'desc' : 'asc' };
  renderTabela();
});

document.getElementById('sort-date').addEventListener('click', () => {
  ordenacao = { campo: 'data', direcao: ordenacao.direcao === 'asc' ? 'desc' : 'asc' };
  renderTabela();
});

document.getElementById('anteriorPage').addEventListener('click', () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    renderTabela();
  }
});

document.getElementById('proximaPagina').addEventListener('click', () => {
  const totalPaginas = Math.ceil(consultas.filter(c =>
    c.nome.toLowerCase().includes(filtro) ||
    c.status.toLowerCase().includes(filtro)
  ).length / porPagina);
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    renderTabela();
  }
});

renderTabela();
