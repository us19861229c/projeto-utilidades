const containerLista = document.querySelector('[data-listas]');

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

function renderizar() {
  limparElemento(containerLista);
  listas.forEach(lista => {
    console.log(lista)
    const itemDeLista = document.createElement('li');
    itemDeLista.dataset.listaId = lista.id
    itemDeLista.innerText = lista.nome;
    containerLista.appendChild(itemDeLista);
    console.log(itemDeLista)
  })
}

function limparElemento(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild)
  }
}

renderizar();