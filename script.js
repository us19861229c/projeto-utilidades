const containerLista = document.querySelector('[data-listas]');
const novaListaFormulario = document.querySelector('[data-form-nova-lista]');
const novaListaInput = document.querySelector('[data-input-nova-lista]');


let listas = [
  {
    id: 1, 
    nome: 'Projeto'
  },{
    id: 2, 
    nome: 'Cookies'
  },{
    id: 3, 
    nome: 'Livros'
  }]; 

novaListaFormulario.addEventListener('submit', e => {
  e.preventDefault();
  const nomeDaLista = novaListaInput.value;
  if (nomeDaLista == null || nomeDaLista == '') return alert('Por favor,\ndigite um nome de lista');
  const lista = criarLista(nomeDaLista);
  novaListaInput.value = null;
  listas.push(lista);
  renderizar();
})

function criarLista(nome) {
  return { id: Date.now().toString(), nome, tarefas: []}
}
  
function renderizar() {
  limparElemento(containerLista);
  listas.forEach(lista => {
    const itemDeLista = document.createElement('li');
    itemDeLista.dataset.listaId = lista.id
    itemDeLista.innerText = lista.nome;
    containerLista.appendChild(itemDeLista);
  })
}

function limparElemento(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild)
  }
}

renderizar();