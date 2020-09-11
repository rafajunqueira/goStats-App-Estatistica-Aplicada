// Rastreando o botao_calcular na DOM
const btnCalc = document.querySelector('#btnCalc')

// Quando botao_calcular sofrer onclick a seguinte função vai disparar:
btnCalc.onclick = () => {
  //Selecionando na DOM elementos:
  const inputDados = document.querySelector('#coleta_de_dados').value
  const nomeVariavel = document.querySelector('.nomeVariavel').value
  // criando uma nova variável com o que foi analisado de freq. na função

  let Array = inputDados.split(';'); // Separando ';' dos dados

  let ArrayOrdenado = Array.sort(ordenaArray) // Ordenando array

  let objFrequencia = geraFrequencia(ArrayOrdenado) //Gerando objeto com array usado

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

  //abaixo geramos a tabelaSimples (quali. nominal, ordinal, quanti. discreta)
  tabela = cabecalho + tabelaSimples(valorVariavel, freqSimples)

  // aqui adicionamos o que rolou no for dentro de uma div de resultado
  const domTabela = document.querySelector('.tabelas')
  domTabela.innerHTML = tabela
}




/******************** ÁREA DE FUNÇÕES: ********************/
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


//gerador de tabelaSimples (quali. nominal, ordinal, quanti. discreta)
function tabelaSimples(coluna1, coluna2) {
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

