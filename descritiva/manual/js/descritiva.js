// Rastreando o botao_calcular na DOM
const btnCalc = document.querySelector('#btnCalc')

// Quando botao_calcular sofrer onclick a seguinte função vai disparar:
btnCalc.onclick = () => {
  //Selecionando na DOM elementos:
  const inputDados = document.querySelector('#coleta_de_dados').value
  const nomeVariavel = document.querySelector('.nomeVariavel').value
  // criando uma nova variável com o que foi analisado de freq. na função

  let arrayOriginal = inputDados.split(';'); // Separando ';' dos dados
  
  let arrayOrdenado

  // Retorna tipo eordena de acordo
  if (qualTipo(arrayOriginal) == 'string') {
    arrayOrdenado = arrayOriginal.sort() // Ordenando array string
  } else {
    arrayOrdenado = arrayOriginal.sort((a, b) => a - b) // Ordenando array com numero
  }


  console.log('arrayOrdenado :>> ', arrayOrdenado);

  let objFrequencia = geraFrequencia(arrayOrdenado) //Gerando objeto com array usado

  console.log('objFrequencia :>> ', objFrequencia);

  // dadosInseridos é coluna1
  let dadosInseridos = Object.keys(objFrequencia) // Object.keys pega o nome do atributo

  // freqSimples é coluna2 da tabela 
  let freqSimples = Object.values(objFrequencia) // Object.values pega o VALOR do atributo

  let totalCol2 = geraTotalCol2(freqSimples)

  /*se +10 ELEMENTOS NUMERAIS forem inseridos geramos a tabelaContinua
  SENÃO
  somente geramos a tabelaSimples. VEJA:
  */

  let tabelaEscolhida = qualtabela(inputDados)
  if ((dadosInseridos.length >= 10) && (tabelaEscolhida == 'tabelaContinua')) {
    [corpoTbEscolhida, qtdLinhas] = tabelaContinua(arrayOrdenado, totalCol2)

  } else { /* [corpoTbEscolhida, qtdLinhas] é uma desestruturação */
    [corpoTbEscolhida, qtdLinhas] = tabelaSimples(dadosInseridos, freqSimples, totalCol2)
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


let qualtabela = (arrayOrdenado) => {

  let verificador = arrayOrdenado[0]

  if (isNaN(parseFloat(verificador))) { // se for string tabelaSimples em uso
    return 'tabelaSimples'
  } else {
    return 'tabelaContinua' // se for number tabelaContinua em uso
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


var foto = 3;
var fotoPopulacao = document.getElementById('fotoPopulacao')
var fotoAmostra = document.getElementById('fotoAmostra')

function mudaFoto(foto) {
  if (document.getElementsByName('amostra_ou_populacao')[0].checked) {
    fotoAmostra.src = "../../imagens/amostraclick.png"
    fotoPopulacao.src = "../../imagens/populacao.png"
  }
  if (document.getElementsByName('amostra_ou_populacao')[1].checked) {
    fotoPopulacao.src = "../../imagens/populacaoclick.png"
    fotoAmostra.src = "../../imagens/amostra.png"
  }
}

// *******************GRÁFICOS CHART.JS***********************/

function geraGraf(qtdLinhas) {

  let valoresCol1 = []
  let valoresCol2 = []

  let cache = 'teste' // o cache é um acumulador

  for (let i = 1; i <= qtdLinhas; i++) {
    // aqui selecionamos na coluna 1 linha i os valores:
    cache = document.querySelector(`.col1_linha${i}`).innerHTML
    valoresCol1.push(cache)

    // aqui selecionamos na coluna 2 linha i os valores:
    cache = document.querySelector(`.calcFreq${i}`).innerHTML
    cache = parseFloat(cache)
    valoresCol2.push(cache)
  }

  var ctx = document.getElementById('myChart')

  var chart = ctx.getContext('2d') //Este comando diz que usaremos graficos 2d

  var chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: valoresCol1,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: ['#3A3A68', '#B0C4DE', '#838d45', '#2E8B57', 'orange', '#FFD700', 'purple', 'gray', '#EE3B3B', '#FFD39B'],
        borderColor: ['white'],
        data: valoresCol2,
      }]
    },
  })
}
