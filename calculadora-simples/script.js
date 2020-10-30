let botoesCalculadora = [
  {
      nome : "apagar",
      simbolo : "⌫",
      formula : false,
      tipo : "botao"
  },{
      nome : "limpar",
      simbolo : "C",
      formula : false,
      tipo : "botao"
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