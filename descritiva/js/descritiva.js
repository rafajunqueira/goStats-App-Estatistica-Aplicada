// Rastreando o botao_calcular na DOM
const btnCalc = document.querySelector('#btnCalc')

// Quando botao_calcular sofrer onclick a seguinte função vai disparar:
btnCalc.onclick = () => {
  let inputDados
  let nomeVariavel

  // se tivermos o arquivo de descritiva > manual, então:
  if (window.location.pathname.includes('manual') == true) {
    // abaixo eu pego na DOM os valores no input:
    inputDados = document.querySelector('#coleta_de_dados').value
    inputDados = inputDados.split(';'); // Separando ';' dos dados

    nomeVariavel = document.querySelector('.nomeVariavel').value

  } else {
    //abaixo eu pego os dados processados pelo 'importa.js'
    inputDados = preInput
    nomeVariavel = preNomeVar
  }

  let arrayOriginal = inputDados

  let arrayOrdenado

  // Retorna tipo e ordena de acordo
  if (qualTipo(arrayOriginal) == 'string') {
    arrayOrdenado = arrayOriginal.sort() // Ordenando array string
  } else {
    arrayOrdenado = arrayOriginal.sort((a, b) => a - b) // Ordenando array com numero
  }

  // Desestruturando o retorno da função:
  [a, b, arrayFreq] = geraFreq(arrayOrdenado) //Gerando objeto com array usado

  /*acima o arrayFreq é array que tem array dentro e todos os 
  elementos com suas respectivas frequências, dê um console.log para ver*/

  // dadosInseridos é coluna1
  let objFrequencia = geraFrequencia(arrayOrdenado) //Gerando objeto com array usado

  let dadosInseridos = a // aqui pegamos os numeros (sem repetição)

  // freqSimples é coluna2 da tabela 
  let freqSimples = b // aqui pegamos os numeros as repetições

  let totalCol2 = geraTotalCol2(freqSimples)

  /*se +10 ELEMENTOS NUMERAIS forem inseridos geramos a tabelaContinua
  SENÃO
  somente geramos a tabelaSimples. VEJA:
  */

  console.log('qualTipo(arrayOrdenado) :>> ', qualTipo(arrayOrdenado));

  if ((dadosInseridos.length >= 10) && (qualTipo(arrayOrdenado) == 'number')) {
    [corpoTbEscolhida, qtdLinhas] = tabelaContinua(arrayOrdenado, totalCol2)
    console.log('tabelaContinua :>> ');
  } else { /* [corpoTbEscolhida, qtdLinhas] é uma desestruturação */
    [corpoTbEscolhida, qtdLinhas] = tabelaSimples(dadosInseridos, freqSimples, totalCol2)
    console.log('tabelaSimples :>> ');
  }
  tabela = geraCabecalho(nomeVariavel) + corpoTbEscolhida


  // aqui adicionamos SOMENTE 1ª E 2ª COLUNA:
  const domTabela = document.querySelector('.tabelas')
  domTabela.innerHTML = tabela += '</table>' //fechando tabela


  // O RESTO DA TABELA SERÁ RESOLVIDO A PARTIR DO EXEC. FUNÇÃO:
  geraRestCol(qtdLinhas)

  //DEPOIS DO PROCESSAMENTO DE TUDO, GERAMOS OS GRÁFICOS
  geraGraf(qtdLinhas)
}




/******************** ÁREA DE FUNÇÕES: ********************/


let qualTipo = (arrayOrdenado) => {

  let verificador = arrayOrdenado[0]

  if (isNaN(parseFloat(verificador))) { // se for string
    return 'string'
  } else {
    return 'number' // se for number
  }
}


let wordCounter = {}; // contador de elementos (int ou string)

let geraFrequencia = (wordArray) => {
  // for que gera frequencia (gera objeto)
  for (let i = 0; i < wordArray.length; i++) {
    if (wordCounter[wordArray[i]]) {
      wordCounter[wordArray[i]] += 1;
    } else {
      wordCounter[wordArray[i]] = 1;
    }
  }
  let frequenciaFinal = wordCounter
  wordCounter = {}
  return frequenciaFinal
}


function geraFreq(arr) { // from jsfiddle.net/simevidas/bnACW/
  var a = [], b = [], prev;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  let arrayFreq = []

  for (let i = 0; i < a.length; i++) {
    arrayFreq.push([a[i], b[i]])
  }

  return [a, b, arrayFreq]
}


let qtdIndexEntre = (array, inicial, final) => {

  let indexNumInicial = array.findIndex(element => element >= inicial)
  let indexNumFinal = array.findIndex(element => element >= final)

  let qtdEntre = indexNumFinal - indexNumInicial

  return qtdEntre
}


function geraTotalCol2(freqSimples) {
  let calcTotal = (cache, currentValue) => cache + currentValue
  return freqSimples.reduce(calcTotal)
}


// *******************FUNÇÃO TROCAR IMAGEM ICONES************************/


var foto = 6;
var fotoPopulacao = document.getElementById('fotoPopulacao')
var fotoAmostra = document.getElementById('fotoAmostra')

var tipodegrafico = 'pie'
var titulodegrafico = 'Qualitativa Nominal'

function mudaFoto(foto) {
  if (document.getElementsByName('amostra_ou_populacao')[0].checked) {
    fotoAmostra.src = "../../imagens/amostraclick.png"
    fotoPopulacao.src = "../../imagens/populacao.png"
  }
  if (document.getElementsByName('amostra_ou_populacao')[1].checked) {
    fotoPopulacao.src = "../../imagens/populacaoclick.png"
    fotoAmostra.src = "../../imagens/amostra.png"
  }
  if (document.getElementsByName('tipodecalculo')[0].checked) {
    fotoNominal.src = "../../imagens/qualitativaNominalClick.png"
    fotoOrdinal.src = "../../imagens/qualitativaOrdinal.png"
    fotoDiscreta.src = "../../imagens/quantitativaDiscreta.png"
    fotoContinua.src = "../../imagens/quantitativaContinua.png"
    tipodegrafico = 'pie'
    titulodegrafico = 'Qualitativa Nominal'
  }
  if (document.getElementsByName('tipodecalculo')[1].checked) {
    fotoNominal.src = "../../imagens/qualitativaNominal.png"
    fotoOrdinal.src = "../../imagens/qualitativaOrdinalClick.png"
    fotoDiscreta.src = "../../imagens/quantitativaDiscreta.png"
    fotoContinua.src = "../../imagens/quantitativaContinua.png"
    tipodegrafico = 'doughnut'
    titulodegrafico = 'Qualitativa Ordinal'
  }
  if (document.getElementsByName('tipodecalculo')[2].checked) {
    fotoNominal.src = "../../imagens/qualitativaNominal.png"
    fotoOrdinal.src = "../../imagens/qualitativaOrdinal.png"
    fotoDiscreta.src = "../../imagens/quantitativaDiscretaClick.png"
    fotoContinua.src = "../../imagens/quantitativaContinua.png"
    tipodegrafico = 'bar'
    titulodegrafico = 'Quantitativa Discreta'
  }
  if (document.getElementsByName('tipodecalculo')[3].checked) {
    fotoNominal.src = "../../imagens/qualitativaNominal.png"
    fotoOrdinal.src = "../../imagens/qualitativaOrdinal.png"
    fotoDiscreta.src = "../../imagens/quantitativaDiscreta.png"
    fotoContinua.src = "../../imagens/quantitativaContinuaClick.png"
    tipodegrafico = 'line'
    titulodegrafico = 'Quantitativa Contínua'
  }
}



// *******************GRÁFICOS CHART.JS***********************/
let geraCoresAleat = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

// variaveis auxiliares nos gráficos:
let delGrafAnt
let chart

function geraGraf(qtdLinhas) {

  let valoresCol1 = []
  let valoresCol2 = []
  let paletaCores = []

  let cache // o cache é um acumulador
  
  for (let i = 1; i <= qtdLinhas; i++) {
    // aqui selecionamos na coluna 1 linha i os valores:
    cache = document.querySelector(`.col1_linha${i}`).innerHTML
    valoresCol1.push(cache)

    // aqui selecionamos na coluna 2 linha i os valores:
    cache = document.querySelector(`.calcFreq${i}`).innerHTML
    cache = parseFloat(cache)
    valoresCol2.push(cache)

    // aqui geramos a quantidade de cores exata para o gráfico
    paletaCores.push(geraCoresAleat())

  }

  var ctx = document.getElementById('myChart')

  if (delGrafAnt === 'sim') {
    chart.destroy()
  }

  chart = ctx.getContext('2d') //Este comando diz que usaremos graficos 2d

  chart = new Chart(ctx, {
    type: tipodegrafico,
    data: {
      labels: valoresCol1,
      datasets: [{
        label: '',
        backgroundColor: paletaCores,
        borderColor: ['white'],
        data: valoresCol2,
        steppedLine: true,
      }]
    },
    options: {

    }
  })

  delGrafAnt = 'sim'

}

// *******************Moda, Media e Mediana***********************/
var media = window.document.querySelector('#media')
var moda = window.document.querySelector('#moda')
var mediana = window.document.querySelector('#mediana')
var desviop = window.document.querySelector('#desviop')
var coeficiente = window.document.querySelector('#coeficiente')
var mediamodamed = window.document.querySelector('.media-moda-med')


function modmedmed() {
  moda.innerHTML = `A moda é: ${moda}`
  media.innerHTML = `A media é: ${media}`
  mediana.innerHTML = `A mediana é: ${mediana}`
  desviop.innerHTML = `O desvio padrão é: ${desviop}`
  coeficiente.innerHTML = `O coeficiente é: ${coeficiente}`
  mediamodamed.style.backgroundColor = 'rgb(204, 203, 236)'
}

