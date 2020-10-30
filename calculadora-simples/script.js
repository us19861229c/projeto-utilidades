let botoesCalculadora = [
  {
      nome : "apagar",
      simbolo : "⌫",
      formula : false,
      tipo : "corrigir"
  },{
      nome : "limpar",
      simbolo : "C",
      formula : false,
      tipo : "corrigir"
  },{
      nome : "porcento",
      simbolo : "%",
      formula : "/100",
      tipo : "numero"
  },{
      nome : "dividir",
      simbolo : "÷",
      formula : "/",
      tipo : "operador"
  },{
      nome : "7",
      simbolo : 7,
      formula : 7,
      tipo : "numero"
  },{
      nome : "8",
      simbolo : 8,
      formula : 8,
      tipo : "numero"
  },{
      nome : "9",
      simbolo : 9,
      formula : 9,
      tipo : "numero"
  },{
      nome : "multiplicar",
      simbolo : "×",
      formula : "*",
      tipo : "operador"
  },{
      nome : "4",
      simbolo : 4,
      formula : 4,
      tipo : "numero"
  },{
      nome : "5",
      simbolo : 5,
      formula : 5,
      tipo : "numero"
  },{
      nome : "6",
      simbolo : 6,
      formula : 6,
      tipo : "numero"
  },{
      nome : "adicionar",
      simbolo : "+",
      formula : "+",
      tipo : "operador"
  },,{
      nome : "1",
      simbolo : 1,
      formula : 1,
      tipo : "numero"
  },{
      nome : "2",
      simbolo : 2,
      formula : 2,
      tipo : "numero"
  },{
      nome : "3",
      simbolo : 3,
      formula : 3,
      tipo : "numero"
  },{
      nome : "subtrair",
      simbolo : "–",
      formula : "-",
      tipo : "operador"
  },{
      nome : "0",
      simbolo : 0,
      formula : 0,
      tipo : "numero"
  },{
      nome : "virgula",
      simbolo : ",",
      formula : ".",
      tipo : "numero"
  },{
      nome : "calcular",
      simbolo : "=",
      formula : "=",
      tipo : "calcular"
  }
];

// Selecionando os elementos:
const elementoEntrada = document.querySelector('.entrada-calculadora');
const elementoSaidaResultado = document.querySelector('.resultado .valor');
const elementoSaidaConta = document.querySelector('.conta .valor');

// Criando os botões:
function criarBotoes() {
  const botoesPorLinha = 4; 
  let botoesAdicionados = 0;

  botoesCalculadora.forEach((botao) => {
    if (botoesAdicionados % botoesPorLinha === 0) {
      elementoEntrada.innerHTML += '<div class="linha"></div>';
    }

    const linha = document.querySelector('.linha:last-child');

    linha.innerHTML += `<button id="${botao.nome}"> ${botao.simbolo} </button>`;

    botoesAdicionados += 1;
  })
}

criarBotoes();

// Evento de clique nos botões (elementos de entrada):
elementoEntrada.addEventListener('click', botao => {
  const botaoAlvo = botao.target;

  botoesCalculadora.forEach( botao => {
    if (botao.nome === botaoAlvo.id) realizarConta(botao);
  })
})


// Dados para cálculo: 
let dadosParaConta = {
  conta: [],
  resultado: [],
}

// Funcionamento da calculadora:
function realizarConta(botao) {
  if (botao.tipo === 'operador') {
    dadosParaConta.conta.push(botao.simbolo);
    dadosParaConta.resultado.push(botao.formula);

  } else if (botao.tipo === 'numero') {
    dadosParaConta.conta.push(botao.simbolo);
    dadosParaConta.resultado.push(botao.formula);

  } else if (botao.tipo === 'corrigir') {
    if (botao.nome === 'apagar') {
      dadosParaConta.conta.pop();
      dadosParaConta.resultado.pop();

    } else if (botao.nome === 'limpar') {
      dadosParaConta.conta = [];
      dadosParaConta.resultado = [];
      atualizarSaidaResultado(0);
    }

  } else if (botao.tipo === 'calcular') {
    let juntarResultado = dadosParaConta.resultado.join('');
    let resultado = eval(juntarResultado);

    atualizarSaidaResultado(resultado);

    dadosParaConta.conta = [];
    dadosParaConta.resultado = [];

    dadosParaConta.conta.push(resultado);
    dadosParaConta.resultado.push(resultado);

  }
  atualizarSaidaConta(dadosParaConta.conta.join(''));
}

function atualizarSaidaResultado(resultado) {
  elementoSaidaResultado.innerHTML = resultado;
}

function atualizarSaidaConta(conta) {
  elementoSaidaConta.innerHTML = conta;
}