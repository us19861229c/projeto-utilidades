const containerLista = document.querySelector('[data-listas]');
const novaListaFormulario = document.querySelector('[data-form-nova-lista]');
const novaListaInput = document.querySelector('[data-input-nova-lista]');

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

novaListaFormulario.addEventListener('submit', e => {
  e.preventDefault();
  const nomeDaLista = novaListaInput.value;
  if (nomeDaLista == null || nomeDaLista == '') return alert('Por favor,\ndigite um nome de lista');
  const lista = criarLista(nomeDaLista);
  novaListaInput.value = null;
  listas.push(lista);
  salvarERenderizar();
})

function criarLista(nome) {
  return { id: Date.now().toString(), nome, tarefas: []}
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
  listas.forEach(lista => {
    const itemDeLista = document.createElement('li');
    itemDeLista.dataset.listaId = lista.id
    itemDeLista.innerText = lista.nome;
    if(lista.id === listaSelecionada) itemDeLista.classList.add('lista-ativa')
    containerLista.appendChild(itemDeLista);
  })
}

function limparElemento(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild)
  }
}

renderizar();