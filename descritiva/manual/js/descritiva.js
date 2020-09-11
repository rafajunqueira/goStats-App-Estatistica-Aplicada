// Rastreando o botao_calcular na DOM
const btnCalc = document.querySelector('#btnCalc')

// Quando botao_calcular sofrer onclick a seguinte função vai disparar:
btnCalc.onclick = () => {
  //Selecionando na DOM elementos:
  const inputDados = document.querySelector('#coleta_de_dados').value
  const nomeVariavel = document.querySelector('.nomeVariavel').value
  // criando uma nova variável com o que foi analisado de freq. na função

  let arrayOriginal = inputDados.split(';'); // Separando ';' dos dados

  let arrayOrdenado = arrayOriginal.sort(ordenaArray) // Ordenando array

  let objFrequencia = geraFrequencia(arrayOrdenado) //Gerando objeto com array usado

  // valorVariavel é coluna1
  let valorVariavel = Object.keys(objFrequencia) // Object.keys pega o nome do atributo

  // freqSimples é coluna2
  let freqSimples = Object.values(objFrequencia) // Object.values pega o VALOR do atributo


  // processo de geração de cabeçalho da tabela :
  let cabecalho = `<table border='1'>
              <tr>
                <th>${nomeVariavel}</th>
                <th>Frequência</th>
              </tr>`


  /*se +10 ELEMENTOS NUMERAIS forem inseridos geramos a tabelaContinua
  SENÃO
  somente geramos a tabelaSimples
  */
  let tabelaEscolhida = qualtabela(inputDados)
  if ((valorVariavel.length >= 10) && (tabelaEscolhida == 'tabelaContinua')) {
    tabela = cabecalho + tabelaContinua(arrayOrdenado)
  } else {
    tabela = cabecalho + tabelaSimples(valorVariavel, freqSimples)
  }


  // aqui adicionamos o que rolou no for dentro de uma div de resultado
  const domTabela = document.querySelector('.tabelas')
  domTabela.innerHTML = tabela
}




/******************** ÁREA DE FUNÇÕES: ********************/

let qualtabela = (inputDados) => {

  // tirando caracteres especiais e depois espaço:
  inputDados.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
  inputDados.replace(/\s/g, '')

  if (isNaN(parseFloat(inputDados))) { // se for string tabelaSimples em uso
    return 'tabelaSimples'
  } else {
    return 'tabelaContinua' // se for number tabelaContinua em uso
  }
}


let wordCounter = {}; // contador de elementos (int ou string)


let ordenaArray = (word1, word2) => {
  if (wordCounter[word1] < wordCounter[word2]) {
    return -1;
  } else if (wordCounter[word1] == wordCounter[word2]) {
    return 0;
  } else if (wordCounter[word1] > wordCounter[word2]) {
    return 1;
  }
}


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


let tabelaContinua = (arrayOrdenado) => {

  //achando o priElemento do arrayOrdenado
  let priElemento = parseInt(arrayOrdenado.slice(0, 1))

  //achando o ultElemento do arrayOrdenado
  let ultElemento = parseInt(arrayOrdenado.slice(-1))

  //calc de Amplitude Total
  let AmpliTotal = ultElemento - priElemento

  //achando o index do 1º numero a ser pesquisado (1º maior que AmpliTotal)
  let indexInicial = arrayOrdenado.findIndex(elemento => elemento > AmpliTotal)

  //calc de qtd de Classes (qtd de lihas da tabela)
  let qtdClasses = Math.sqrt(arrayOrdenado.length)

  //arredondando qtd de Classes e voltando para o numero anterior
  qtdClasses = Math.round(qtdClasses) - 1

  //calc de intervalo de Classe
  let intClasse = ''

  for (let i = indexInicial; i <= arrayOrdenado.length; i++) {
    //Encontrando o intervalo de Classe: 
    intClasse = arrayOrdenado[i] / qtdClasses

    //Se o intervalo de Classe for redondo, achamos o ideal
    if (intClasse === Math.round(intClasse)) {
      break
    }

    /*Se chegar ao final do array e não encontrar intervalo de Classe redondo,
    então acrescentamos +1 no qtdClasses e reiniciamos a busca*/
    if (i === arrayOrdenado.length) {
      qtdClasses += 1
      i = indexInicial
    }
  }

  let corpo = ''

  // lembre-se priElemento e ultElemento vem do arrayOrdenado
  for (let i = priElemento; i <= ultElemento; i += intClasse) {

    if (i + intClasse >= ultElemento) {

      corpo += `<tr>
                <td>${i} |--- ${i + intClasse}</td>
                <td>${qtdIndexEntre(arrayOrdenado, i, ultElemento) + 1}</td>
                </tr>` // esse +1 serve para corrigir a falta

    } else {

      corpo += `<tr>
                <td>${i} |--- ${i + intClasse}</td>
                <td>${qtdIndexEntre(arrayOrdenado, i, i + intClasse)}</td>
                </tr>`
    }
  }


  return corpo + '</table>'
}


let qtdIndexEntre = (array, inicial, final) => {

  let indexNumInicial = array.findIndex(element => element >= inicial)
  let indexNumFinal = array.findIndex(element => element >= final)

  let qtdEntre = indexNumFinal - indexNumInicial

  return qtdEntre
}


//gerador de tabelaSimples (quali. nominal, ordinal, quanti. discreta)
let tabelaSimples = (coluna1, coluna2) => {
  let corpo = ''

  for (let i = 0; i < coluna1.length; i++) {
    corpo += `<tr>
              <td>${coluna1[i]}</td>
              <td>${coluna2[i]}</td>
            </tr>`
  }

  return corpo + '</table>'
}

// *******************FUNÇÃO TROCAR IMAGEM ICONES************************/

function mudaFoto() {
  document.getElementById("troca").src = "../imagens/manualclick.png";
}

