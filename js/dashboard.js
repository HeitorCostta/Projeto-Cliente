const lista = document.getElementById("lista");
const token = localStorage.getItem("token");
const filtroNome = document.getElementById("filtroNome");
const filtroCidade = document.getElementById("filtroCidade");

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

// Inputs editar produtor
const editNome = document.getElementById("editNome");
const editCidade = document.getElementById("editCidade");
const editEstado = document.getElementById("editEstado");
const editTelefone = document.getElementById("editTelefone");
const editEmail = document.getElementById("editEmail");

// Inputs criar produtor
const createNome = document.getElementById("createNome");
const createCidade = document.getElementById("createCidade");
const createEstado = document.getElementById("createEstado");
const createTelefone = document.getElementById("createTelefone");
const createEmail = document.getElementById("createEmail");

// Inputs propriedade
const propNome = document.getElementById("propNome");
const propCidade = document.getElementById("propCidade");
const propEstado = document.getElementById("propEstado");
const propArea = document.getElementById("propArea");
const propCultura = document.getElementById("propCultura");
const propObs = document.getElementById("propObs");

// Editar propriedade
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

// --- LÓGICA DE MÁSCARA DE TELEFONE ---

function aplicarMascaraTelefone(input) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
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

// Ativando as máscaras
aplicarMascaraTelefone(createTelefone);
aplicarMascaraTelefone(editTelefone);

// --- RESTANTE DAS FUNÇÕES ---

if (!token) window.location.href = "login.html";

filtroNome.addEventListener("input", renderizarLista);
filtroCidade.addEventListener("input", renderizarLista);

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function abrirModalCreate() {
  modalCreate.style.display = "block";
}

function abrirModalPropriedade(id) {
  produtorSelecionadoId = id;
  modalPropriedade.style.display = "block";
}

async function carregarProdutores() {
  const res = await fetch("https://projeto-cliente-production.up.railway.app/produtores", {
    headers: { Authorization: "Bearer " + token }
  });
  dataGlobal = await res.json();
  renderizarLista();
}

function renderizarLista() {
  lista.innerHTML = "";
  const nomeFiltro = filtroNome.value.toLowerCase();
  const cidadeFiltro = filtroCidade.value.toLowerCase();

  const filtrados = dataGlobal.filter(produtor => {
    const nome = produtor.nome ? produtor.nome.toLowerCase() : "";
    const cidade = produtor.cidade ? produtor.cidade.toLowerCase() : "";
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
            <button class="btn-primary" onclick="verDetalhesPropriedade(${prop.id})">Ver</button>
            <button class="btn-warning" onclick="editarPropriedade(${prop.id})">Editar</button>
            <button class="btn-danger" onclick="deletarPropriedade(${prop.id})">Excluir</button>
          </div>
        </div>
      `;
    });

    lista.innerHTML += `
      <li class="card">
        <div class="card-header">
          <h3>${produtor.nome}</h3>
          <div class="btn-group">
            <button class="btn-primary" onclick="verDetalhes(${produtor.id})">Ver</button>
            <button class="btn-warning" onclick="editarProdutor(${produtor.id})">Editar</button>
            <button class="btn-danger" onclick="deletarProdutor(${produtor.id})">Excluir</button>
            <button class="btn-success" onclick="abrirModalPropriedade(${produtor.id})">+ Propriedade</button>
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

function verDetalhes(id) {
  const produtor = dataGlobal.find(p => p.id === id);
  let propsHTML = "";

  produtor.propriedades.forEach(prop => {
    propsHTML += `
      <div style="background: #f3f4f6; padding: 10px; border-radius: 8px; margin-top: 10px;">
        <strong>🏠 ${prop.nome}</strong><br>
        <small>📍 ${prop.cidade} - ${prop.estado}</small><br>
        <span>🌱 ${prop.cultura} | 📐 ${prop.tamanhoArea} ha</span><br>
        <small>📝 ${prop.observacoes || "-"}</small>
      </div>
    `;
  });

  modalBody.innerHTML = `
    <h2 style="margin-bottom: 5px;">${produtor.nome}</h2>
    <p style="margin: 2px 0;">📍 ${produtor.cidade} - ${produtor.estado}</p>
    <p style="margin: 2px 0;">📞 ${produtor.telefone || "-"}</p>
    <p style="margin: 2px 0;">📧 ${produtor.email || "-"}</p>
    <p style="font-size: 12px; color: #6b7280;">🗓️ Cadastro: ${formatarData(produtor.dataCadastro)}</p>
    <h4 style="margin-top: 20px; border-bottom: 1px solid #ddd;">Propriedades</h4>
    ${propsHTML || "<p>Nenhuma propriedade vinculada.</p>"}
  `;
  modal.style.display = "block";
}

function formatarData(data) {
  if (!data) return "-";
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
}

function verDetalhesPropriedade(id) {
  let propSelecionada;
  dataGlobal.forEach(produtor => {
    const prop = produtor.propriedades.find(p => p.id === id);
    if (prop) propSelecionada = prop;
  });

  if (!propSelecionada) return;

  modalBody.innerHTML = `
    <h2>${propSelecionada.nome}</h2>
    <p>📍 ${propSelecionada.cidade} - ${propSelecionada.estado}</p>
    <p>🌱 Cultura: ${propSelecionada.cultura}</p>
    <p>📐 Área: ${propSelecionada.tamanhoArea} ha</p>
    <p>📝 Obs: ${propSelecionada.observacoes || "-"}</p>
  `;
  modal.style.display = "block";
}

// Operações de CRUD (Create, Delete, Update) permanecem com sua lógica original
formCreate.onsubmit = async e => {
  e.preventDefault();
  await fetch("https://projeto-cliente-production.up.railway.app/produtores", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
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

async function deletarProdutor(id) {
  if (!confirm("Tem certeza que deseja excluir o produtor?")) return;
  await fetch(`https://projeto-cliente-production.up.railway.app/produtores${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });
  carregarProdutores();
}

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
  await fetch(`https://projeto-cliente-production.up.railway.app/produtores/${produtorEditandoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
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

formPropriedade.onsubmit = async e => {
  e.preventDefault();
  await fetch("https://projeto-cliente-production.up.railway.app/propriedades", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
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

async function deletarPropriedade(id) {
  if (!confirm("Excluir esta propriedade?")) return;
  await fetch(`https://projeto-cliente-production.up.railway.app/propriedades/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });
  carregarProdutores();
}

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
  await fetch(`https://projeto-cliente-production.up.railway.app/propriedades/${propriedadeEditandoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
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

// Funções de fechar modais
function fecharModal() { modal.style.display = "none"; }
function fecharModalEdit() { modalEdit.style.display = "none"; }
function fecharModalCreate() { modalCreate.style.display = "none"; }
function fecharModalPropriedade() { modalPropriedade.style.display = "none"; }
function fecharModalEditProp() { modalEditProp.style.display = "none"; }

carregarProdutores();