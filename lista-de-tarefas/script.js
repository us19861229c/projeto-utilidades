const containerLista = document.querySelector('[data-listas]');
const novaListaFormulario = document.querySelector('[data-form-nova-lista]');
const novaListaInput = document.querySelector('[data-input-nova-lista]');
const botaoDeletarLista = document.querySelector('[data-botao-deletar-lista]');

const containerExibirLista = document.querySelector('[data-container-exibe-lista]');
const elementoTituloLista = document.querySelector('[data-titulo-lista]');
const elementoContagemPendenteLista = document.querySelector('[data-contagem-lista]');
const containerTarefas = document.querySelector('[data-tarefas]');
const modeloTarefa = document.querySelector('#modelo-tarefa');

const novaTarefaFormulario = document.querySelector('[data-form-nova-tarefa]');
const novaTarefaInput = document.querySelector('[data-input-nova-tarefa]');
const botaoDeletarTarefa = document.querySelector('[data-botao-deletar-tarefa]');

const LOCAL_STORAGE_CHAVE_LISTA = 'listas.tarefas';
const LOCAL_STORAGE_SELECIONADA_ID_CHAVE_LISTA = 'listas.selecionaListaId';
let listas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CHAVE_LISTA)) || []; 
let listaSelecionada = localStorage.getItem(LOCAL_STORAGE_SELECIONADA_ID_CHAVE_LISTA);

containerLista.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    listaSelecionada = e.target.dataset.listaId;
    salvarERenderizar();
  }
})

botaoDeletarLista.addEventListener('click', e => {
  listas = listas.filter(lista => lista.id !== listaSelecionada);
  listaSelecionada = null;
  salvarERenderizar();
})

botaoDeletarTarefa.addEventListener('click', e => {
  const listaSelecionadaFiltradaID = listas.find(lista => lista.id === listaSelecionada);
  listaSelecionadaFiltradaID.tarefas = listaSelecionadaFiltradaID.tarefas.filter( tarefa => !tarefa.completada);
  salvarERenderizar();
})

novaListaFormulario.addEventListener('submit', e => {
  e.preventDefault();
  const nomeDaLista = novaListaInput.value;
  if (nomeDaLista == null || nomeDaLista == '') return alert('Por favor,\ndigite um nome de lista');
  const lista = criarLista(nomeDaLista);
  console.log('ao incluir lista', lista, 'quais suas tarefas', lista.tarefas)
  novaListaInput.value = null;
  listas.push(lista);
  salvarERenderizar();
})

novaTarefaFormulario.addEventListener('submit', e => {
  e.preventDefault();
  const nomeDaTarefa = novaTarefaInput.value;
  if (nomeDaTarefa == null || nomeDaTarefa == '') return alert('Por favor,\ndigite uma tarefa');
  const tarefa = criarTarefa(nomeDaTarefa);
  novaTarefaInput.value = null;
  const listaSelecionadaFiltradaID = listas.find(lista => lista.id === listaSelecionada);
  listaSelecionadaFiltradaID.tarefas.push(tarefa)
  salvarERenderizar();
})

containerTarefas.addEventListener('click', e => {
  if( e.target.tagName.toLowerCase() === 'input') {
    const listaSelecionadaFiltradaID = listas.find(lista => lista.id === listaSelecionada);
    const tarefaSelecionadaFiltradaID = listaSelecionadaFiltradaID.tarefas.find( tarefa => tarefa.id === e.target.id);
    tarefaSelecionadaFiltradaID.completada = e.target.checked;
    salvar();
    renderizarContagemTarefasPendentes(listaSelecionadaFiltradaID);
  }
})

function criarLista(nome) {
  return { id: Date.now().toString(), nome, tarefas: []}
}

function criarTarefa(nome) {
  return { id: Date.now().toString(), nome, completada: false }
}

function salvarERenderizar() {
  salvar();  
  renderizar();
}

function salvar() {
  localStorage.setItem(LOCAL_STORAGE_CHAVE_LISTA, JSON.stringify(listas));
  localStorage.setItem(LOCAL_STORAGE_SELECIONADA_ID_CHAVE_LISTA, listaSelecionada);
}
  
function renderizar() {
  limparElemento(containerLista);
  renderizarListas();

  const listaSelecionadaFiltradaID = listas.find(lista => lista.id === listaSelecionada);
  if(listaSelecionada == null) {
    containerExibirLista.style.display = 'none';
  } else {
    containerExibirLista.style.display = '';
    elementoTituloLista.innerText = listaSelecionadaFiltradaID.nome;
    renderizarContagemTarefasPendentes(listaSelecionadaFiltradaID);
    console.log('dentro de renderizar, quem é listaSelecionada', listaSelecionadaFiltradaID);
    console.log('e tarefas:' , listaSelecionadaFiltradaID.tarefas)
    limparElemento(containerTarefas);
    renderizarTarefas(listaSelecionadaFiltradaID);
  }
}

function renderizarTarefas(listaSelecionadaFiltradaID) {
  if(!listaSelecionadaFiltradaID.tarefas) return console.log('não há tarefas') ;
  listaSelecionadaFiltradaID.tarefas.forEach(tarefa => {
    const elementoModeloTarefa = document.importNode(modeloTarefa.content, true);
    console.log(elementoModeloTarefa);
    const checkbox = elementoModeloTarefa.querySelector('input');
    checkbox.id = tarefa.id;
    checkbox.checked = tarefa.completada;
    const label = elementoModeloTarefa.querySelector('label');
    label.htmlFor = tarefa.id;
    label.append(tarefa.nome);
    containerTarefas.appendChild(elementoModeloTarefa);
  })
}

function renderizarContagemTarefasPendentes(listaSelecionadaFiltradaID) {
  console.log('ao renderizar tarefas pendentes quem é', listaSelecionadaFiltradaID.tarefas)
  if(!listaSelecionadaFiltradaID.tarefas) return elementoContagemPendenteLista.innerText = 'nenhuma tarefa pendente';
  const tarefasPendentes = listaSelecionadaFiltradaID.tarefas.filter(tarefa => !tarefa.completada).length;
  const pendentePluralOuSingular = tarefasPendentes.length === 1 ? 'tarefa pendente' : 'tarefas pendentes';
  elementoContagemPendenteLista.innerText = `${tarefasPendentes} ${pendentePluralOuSingular} `
}

function renderizarListas() {
  listas.forEach(lista => {
    const itemDeLista = document.createElement('li');
    itemDeLista.dataset.listaId = lista.id
    itemDeLista.innerText = lista.nome;
    if(lista.id === listaSelecionada) itemDeLista.classList.add('lista-ativa');
    containerLista.appendChild(itemDeLista);
  })
}

function limparElemento(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild)
  }
}

renderizar();