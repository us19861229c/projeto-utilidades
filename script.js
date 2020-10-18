const containerLista = document.querySelector('[data-listas]');

let listas = ['Projeto', 'Cookies', 'Livros']; 

function renderizar() {
  limparElemento(containerLista);
  listas.forEach(lista => {
    console.log(lista)
    const itemDeLista = document.createElement('li');
    itemDeLista.innerText = lista;
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