const lista = document.getElementById("lista");
const token = localStorage.getItem("token");
const filtroNome = document.getElementById("filtroNome");
const filtroCidade = document.getElementById("filtroCidade");

const API_URL = "https://agroferreira-production.up.railway.app";

// Modais
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalEdit = document.getElementById("modalEdit");
const modalCreate = document.getElementById("modalCreate");
const modalPropriedade = document.getElementById("modalPropriedade");
const modalEditProp = document.getElementById("modalEditProp");

// Forms
const formCreate = document.getElementById("formCreate");
const formEdit = document.getElementById("formEdit");
const formPropriedade = document.getElementById("formPropriedade");
const formEditProp = document.getElementById("formEditProp");

// Inputs
const editNome = document.getElementById("editNome");
const editCidade = document.getElementById("editCidade");
const editEstado = document.getElementById("editEstado");
const editTelefone = document.getElementById("editTelefone");
const editEmail = document.getElementById("editEmail");

const createNome = document.getElementById("createNome");
const createCidade = document.getElementById("createCidade");
const createEstado = document.getElementById("createEstado");
const createTelefone = document.getElementById("createTelefone");
const createEmail = document.getElementById("createEmail");

const propNome = document.getElementById("propNome");
const propCidade = document.getElementById("propCidade");
const propEstado = document.getElementById("propEstado");
const propArea = document.getElementById("propArea");
const propCultura = document.getElementById("propCultura");
const propObs = document.getElementById("propObs");

const editPropNome = document.getElementById("editPropNome");
const editPropCidade = document.getElementById("editPropCidade");
const editPropEstado = document.getElementById("editPropEstado");
const editPropArea = document.getElementById("editPropArea");
const editPropCultura = document.getElementById("editPropCultura");
const editPropObs = document.getElementById("editPropObs");

let dataGlobal = [];
let produtorSelecionadoId = null;
let produtorEditandoId = null;
let propriedadeEditandoId = null;

// MÁSCARA TELEFONE
function aplicarMascaraTelefone(input) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d{0,2})/, "($1");
    }

    e.target.value = value;
  });
}

aplicarMascaraTelefone(createTelefone);
aplicarMascaraTelefone(editTelefone);

if (!token) window.location.href = "login.html";

filtroNome.addEventListener("input", renderizarLista);
filtroCidade.addEventListener("input", renderizarLista);

// CARREGAR PRODUTORES
async function carregarProdutores() {
  lista.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch(`${API_URL}/produtores`, {
      headers: { Authorization: "Bearer " + token }
    });

    if (!res.ok) throw new Error();

    dataGlobal = await res.json();
    renderizarLista();

  } catch (error) {
    console.error(error);
    lista.innerHTML = "<p>Erro ao carregar produtores</p>";
  }
}

// RENDER
function renderizarLista() {
  lista.innerHTML = "";

  const nomeFiltro = filtroNome.value.toLowerCase();
  const cidadeFiltro = filtroCidade.value.toLowerCase();

  const filtrados = dataGlobal.filter(produtor => {
    const nome = produtor.nome?.toLowerCase() || "";
    const cidade = produtor.cidade?.toLowerCase() || "";
    return nome.includes(nomeFiltro) && cidade.includes(cidadeFiltro);
  });

  filtrados.forEach(produtor => {
    let propriedadesHTML = "";

    produtor.propriedades.forEach(prop => {
      propriedadesHTML += `
        <div class="propriedade-item">
          <div class="propriedade-info">
            <strong>${prop.nome}</strong>
            <small>📍 ${prop.cidade} - ${prop.estado}</small>
          </div>
          <div class="btn-group">
            <button onclick="verDetalhesPropriedade(${prop.id})">Ver</button>
            <button onclick="editarPropriedade(${prop.id})">Editar</button>
            <button onclick="deletarPropriedade(${prop.id})">Excluir</button>
          </div>
        </div>
      `;
    });

    lista.innerHTML += `
      <li class="card">
        <div class="card-header">
          <h3>${produtor.nome}</h3>
          <div class="btn-group">
            <button onclick="verDetalhes(${produtor.id})">Ver</button>
            <button onclick="editarProdutor(${produtor.id})">Editar</button>
            <button onclick="deletarProdutor(${produtor.id})">Excluir</button>
            <button onclick="abrirModalPropriedade(${produtor.id})">+ Propriedade</button>
          </div>
        </div>

        <div class="card-body">
          <p>📍 ${produtor.cidade} - ${produtor.estado}</p>
          <p>📞 ${produtor.telefone || "-"}</p>
          <hr>
          ${propriedadesHTML || "<p>Sem propriedades</p>"}
        </div>
      </li>
    `;
  });
}

// DETALHES
function verDetalhes(id) {
  const produtor = dataGlobal.find(p => p.id === id);

  let propsHTML = "";
  produtor.propriedades.forEach(prop => {
    propsHTML += `
      <p>${prop.nome} - ${prop.cidade}</p>
    `;
  });

  modalBody.innerHTML = `
    <h2>${produtor.nome}</h2>
    <p>${produtor.cidade}</p>
    <p>${produtor.telefone || "-"}</p>
    <p>Cadastro: ${formatarData(produtor.dataCadastro)}</p>
    ${propsHTML}
  `;

  modal.style.display = "block";
}

//  DATA
function formatarData(data) {
  if (!data) return "-";
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR");
}

//  CREATE PRODUTOR
formCreate.onsubmit = async e => {
  e.preventDefault();

  if (!createNome.value) return alert("Nome obrigatório");

  await fetch(`${API_URL}/produtores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      nomeProdutor: createNome.value,
      cidade: createCidade.value,
      estado: createEstado.value,
      telefone: createTelefone.value,
      email: createEmail.value
    })
  });

  fecharModalCreate();
  carregarProdutores();
};

//  DELETE PRODUTOR
async function deletarProdutor(id) {
  if (!confirm("Excluir produtor?")) return;

  await fetch(`${API_URL}/produtores/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  carregarProdutores();
}

//  EDITAR PRODUTOR
function editarProdutor(id) {
  const produtor = dataGlobal.find(p => p.id === id);

  produtorEditandoId = id;

  editNome.value = produtor.nome;
  editCidade.value = produtor.cidade;
  editEstado.value = produtor.estado;
  editTelefone.value = produtor.telefone || "";
  editEmail.value = produtor.email || "";

  modalEdit.style.display = "block";
}

formEdit.onsubmit = async e => {
  e.preventDefault();

  await fetch(`${API_URL}/produtores/${produtorEditandoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      nomeProdutor: editNome.value,
      cidade: editCidade.value,
      estado: editEstado.value,
      telefone: editTelefone.value,
      email: editEmail.value
    })
  });

  fecharModalEdit();
  carregarProdutores();
};

//  PROPRIEDADE
function abrirModalPropriedade(id) {
  produtorSelecionadoId = id;
  modalPropriedade.style.display = "block";
}

formPropriedade.onsubmit = async e => {
  e.preventDefault();

  await fetch(`${API_URL}/propriedades`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      produtor_id: produtorSelecionadoId,
      nomePropriedade: propNome.value,
      cidade: propCidade.value,
      estado: propEstado.value,
      tamanhoArea: propArea.value,
      culturaPrincipal: propCultura.value,
      observacoes: propObs.value
    })
  });

  fecharModalPropriedade();
  carregarProdutores();
};

// DELETE PROPRIEDADE
async function deletarPropriedade(id) {
  if (!confirm("Excluir propriedade?")) return;

  await fetch(`${API_URL}/propriedades/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  carregarProdutores();
}

// ✏️ EDITAR PROPRIEDADE
function editarPropriedade(id) {
  let propSelecionada;

  dataGlobal.forEach(produtor => {
    const prop = produtor.propriedades.find(p => p.id === id);
    if (prop) propSelecionada = prop;
  });

  propriedadeEditandoId = id;

  editPropNome.value = propSelecionada.nome;
  editPropCidade.value = propSelecionada.cidade;
  editPropEstado.value = propSelecionada.estado;
  editPropArea.value = propSelecionada.tamanhoArea;
  editPropCultura.value = propSelecionada.cultura;
  editPropObs.value = propSelecionada.observacoes || "";

  modalEditProp.style.display = "block";
}

formEditProp.onsubmit = async e => {
  e.preventDefault();

  await fetch(`${API_URL}/propriedades/${propriedadeEditandoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      nomePropriedade: editPropNome.value,
      cidade: editPropCidade.value,
      estado: editPropEstado.value,
      tamanhoArea: editPropArea.value,
      culturaPrincipal: editPropCultura.value,
      observacoes: editPropObs.value
    })
  });

  fecharModalEditProp();
  carregarProdutores();
};

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// FECHAR MODAIS
function fecharModal() { modal.style.display = "none"; }
function fecharModalEdit() { modalEdit.style.display = "none"; }
function fecharModalCreate() { modalCreate.style.display = "none"; }
function fecharModalPropriedade() { modalPropriedade.style.display = "none"; }
function fecharModalEditProp() { modalEditProp.style.display = "none"; }


carregarProdutores();