// Rastreando o botao_calcular na DOM
const btnCalc = document.querySelector('#btnCalc')

// Quando botao_calcular sofrer onclick a seguinte função vai disparar:
btnCalc.onclick = () => {
  //Rastreando valores e nomeVariavel(coluna 1) inserida
  const inputDados = document.querySelector('#coleta_de_dados').value
  const nomeVariavel = document.querySelector('.nomeVariavel').value
  const optSelected = document.querySelector('input[name="nome_da_variavel"]:checked').value;
  // criando uma nova variável com o que foi analisado de freq. na função
  let objFrequencia = geraFrequencia(inputDados, optSelected)
  let coluna1 = Object.keys(objFrequencia) // Object.keys pega o nome do atributo
  let coluna2 = Object.values(objFrequencia) // Object.values pega o VALOR do atributo


  // processo de geração da tabela : (achei melhor não usar a template string como havia falado)
  var html = `<table border='1'>
              <tr>
                <th>${nomeVariavel}</th>
                <th>Frequência</th>
              </tr>`
  // acima criamos as palavras de cabeçalho  


  //abaixo geramos os itens da tabela
  for (var i = 0; i < coluna1.length; i++) {
    html += "<tr>"
    html += "<td>" + coluna1[i] + "</td>"
    html += "<td>" + coluna2[i] + "</td>"
    html += "</tr>"
  }
  html += "</table>"

  // aqui adicionamos o que rolou no for dentro de uma div de resultado
  document.querySelector('.tabelas').innerHTML = html
}

// Função que separa as vírgulas e gera freq.; ela recebe como parametro os dados inseridos.
function geraFrequencia(dados_inseridos, tipoVariavel) {
  var pattern = /\w+/g,
    string = dados_inseridos,
    matchedWords = string.match(pattern);
  if (tipoVariavel == 1) {
    matchedWords.sort()
  }
  var counts = matchedWords.reduce(function (stats, word) {
    if (stats.hasOwnProperty(word)) {
      stats[word] = stats[word] + 1;
    } else {
      stats[word] = 1;
    }
    return stats;
  }, {});

  return counts
}

// código acima obtido em https://stackoverflow.com/questions/30906807/word-frequency-in-javascript


// *******************FUNÇÃO TROCAR IMAGEM ICONES************************/

function mudaFoto() {
  document.getElementById("troca").src = "../imagens/manualclick.png";
}

