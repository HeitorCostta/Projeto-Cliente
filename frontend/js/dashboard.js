const lista = document.getElementById("lista");
const token = localStorage.getItem("token");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

const modalEdit = document.getElementById("modalEdit");
const modalCreate = document.getElementById("modalCreate");

const filtroNome = document.getElementById("filtroNome");
const filtroCidade = document.getElementById("filtroCidade");

let produtorEditandoId = null;
let dataGlobal = [];

// proteção
if (!token) {
  window.location.href = "login.html";
}

// filtros
filtroNome.addEventListener("input", renderizarLista);
filtroCidade.addEventListener("input", renderizarLista);

// logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// carregar produtores
async function carregarProdutores() {
  try {
    const response = await fetch("http://localhost:3000/produtores", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await response.json();
    console.log(data);

    dataGlobal = data;

    renderizarLista();

  } catch (error) {
    console.log("Erro:", error);
  }
}

// renderizar lista (🔥 agora centralizado)
function renderizarLista() {
  lista.innerHTML = "";

  const nome = filtroNome.value.toLowerCase();
  const cidade = filtroCidade.value.toLowerCase();

  const filtrados = dataGlobal.filter(produtor => {
    return (
      produtor.nomeprodutor?.toLowerCase().includes(nome) &&
      produtor.cidade?.toLowerCase().includes(cidade)
    );
  });

  filtrados.forEach(produtor => {
    const li = document.createElement("li");
    li.classList.add("card");

    li.innerHTML = `
      <strong>${produtor.nomeprodutor}</strong><br>
      📍 ${produtor.cidade} - ${produtor.estado}<br>
      🌱 ${produtor.culturaprincipal}

      <br><br>

      <button onclick="verDetalhes(${produtor.id})">Ver mais</button>
      <button onclick="editarProdutor(${produtor.id})">Editar</button>
      <button onclick="deletarProdutor(${produtor.id})">Deletar</button>
    `;

    lista.appendChild(li);
  });
}

// deletar
async function deletarProdutor(id) {
  const confirmar = confirm("Tem certeza que deseja deletar?");
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:3000/produtores/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!response.ok) {
      alert("Erro ao deletar");
      return;
    }

    alert("Deletado com sucesso!");
    carregarProdutores();

  } catch (error) {
    console.log(error);
  }
}

// editar (abrir modal)
function editarProdutor(id) {
  const produtor = dataGlobal.find(p => p.id === id);
  if (!produtor) return;

  produtorEditandoId = id;

  document.getElementById("editNome").value = produtor.nomeprodutor;
  document.getElementById("editPropriedade").value = produtor.nomepropriedade;
  document.getElementById("editCidade").value = produtor.cidade;
  document.getElementById("editEstado").value = produtor.estado;
  document.getElementById("editCultura").value = produtor.culturaprincipal;
  document.getElementById("editArea").value = produtor.tamanhoarea;
  document.getElementById("editTelefone").value = produtor.telefone;
  document.getElementById("editEmail").value = produtor.email;
  document.getElementById("editObs").value = produtor.observacoes;

  modalEdit.style.display = "block";
}

// salvar edição
document.getElementById("formEdit").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:3000/produtores/${produtorEditandoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        nomeProdutor: document.getElementById("editNome").value,
        nomePropriedade: document.getElementById("editPropriedade").value,
        cidade: document.getElementById("editCidade").value,
        estado: document.getElementById("editEstado").value,
        culturaPrincipal: document.getElementById("editCultura").value,
        tamanhoArea: document.getElementById("editArea").value,
        telefone: document.getElementById("editTelefone").value,
        email: document.getElementById("editEmail").value,
        observacoes: document.getElementById("editObs").value
      })
    });

    if (!response.ok) {
      alert("Erro ao atualizar");
      return;
    }

    alert("Atualizado com sucesso!");

    fecharModalEdit();
    carregarProdutores();

  } catch (error) {
    console.log(error);
  }
});

// detalhes
function verDetalhes(id) {
  const produtor = dataGlobal.find(p => p.id === id);
  if (!produtor) return;

  modalBody.innerHTML = `
    <h3>${produtor.nomeprodutor}</h3>
    <p><strong>Propriedade:</strong> ${produtor.nomepropriedade}</p>
    <p><strong>Cidade:</strong> ${produtor.cidade} - ${produtor.estado}</p>
    <p><strong>Cultura:</strong> ${produtor.culturaprincipal}</p>
    <p><strong>Área:</strong> ${produtor.tamanhoarea} ha</p>
    <p><strong>Telefone:</strong> ${produtor.telefone}</p>
    <p><strong>Email:</strong> ${produtor.email}</p>
    <p><strong>Observações:</strong> ${produtor.observacoes}</p>
  `;

  modal.style.display = "block";
}

// modais
function fecharModal() {
  modal.style.display = "none";
}

function fecharModalEdit() {
  modalEdit.style.display = "none";
}

function abrirModalCreate() {
  modalCreate.style.display = "block";
}

function fecharModalCreate() {
  modalCreate.style.display = "none";
}

// criar produtor
document.getElementById("formCreate").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/produtores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        nomeProdutor: document.getElementById("createNome").value,
        nomePropriedade: document.getElementById("createPropriedade").value,
        cidade: document.getElementById("createCidade").value,
        estado: document.getElementById("createEstado").value,
        culturaPrincipal: document.getElementById("createCultura").value,
        tamanhoArea: document.getElementById("createArea").value,
        telefone: document.getElementById("createTelefone").value,
        email: document.getElementById("createEmail").value,
        observacoes: document.getElementById("createObs").value
      })
    });

    if (!response.ok) {
      alert("Erro ao cadastrar");
      return;
    }

    alert("Produtor cadastrado com sucesso!");

    fecharModalCreate();
    carregarProdutores();

  } catch (error) {
    console.log(error);
  }
});

// fechar clicando fora
window.onclick = function(event) {
  if (event.target === modal) modal.style.display = "none";
  if (event.target === modalEdit) modalEdit.style.display = "none";
  if (event.target === modalCreate) modalCreate.style.display = "none";
};

carregarProdutores();