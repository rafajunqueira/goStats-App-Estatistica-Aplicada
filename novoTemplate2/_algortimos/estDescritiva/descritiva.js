// AO FINAL, TODOS ELEMENTOS style="display: none" VIRAM BLOCK
const elementosOcultos = document.querySelectorAll('#ocultarElem')

// AO CLICAR NO FORM DE 
function ShowformImport() {
    const formImport = document.querySelector('#formImport')
    formImport.style.removeProperty('display')

    hideformIntro()
}

function ShowformManual() {
    const formManual = document.querySelector('#formManual')
    formManual.style.removeProperty('display')

    hideformIntro()
}

function hideformIntro() {
    const formIntro = document.querySelector('#formIntro')
    formIntro.style.display = 'none'
}


let qtdLinhasTabela

// Rastreando o botao_calcular na DOM
const btnCalcManual = document.querySelector('#btnCalcManual')
const btnCalcImport = document.querySelector('#btnCalcImport')

// Quando botao_calcular sofrer onclick a seguinte função vai disparar:
console.log('preNomeVar :>> ', preNomeVar);

btnCalcImport.onclick = () => {
    processaExcel()
    
}

btnCalcManual.onclick = () => {
    nomeVariavel = document.querySelector('#nomeVariavel').value

    inputDados = document.querySelector('#inputDados').value
    inputDados = inputDados.split(';'); // Separando ';' dos dados

    geraResultado(nomeVariavel, inputDados)
}

function geraResultado(nomeVariavel_p, inputDados_p) {

    /*   // se tivermos o arquivo de descritiva > manual, então:
      if (window.location.pathname.includes('manual') == true) {
        // abaixo eu pego na DOM os valores no input:
        inputDados = document.querySelector('#coleta_de_dados').value
        inputDados = inputDados.split(';'); // Separando ';' dos dados
  
        nomeVariavel = document.querySelector('#nomeVariavel').value
  
      } else {
        //abaixo eu pego os dados processados pelo 'importa.js'
        inputDados = preInput
        nomeVariavel = preNomeVar
      } */

    // Exibe formResultado com os resultados
    const formResultado = document.querySelector('#formResultado');
    formResultado.style.removeProperty('display')

    let arrayOriginal = inputDados_p
    
    let arrayOrdenado

    // Retorna tipo e ordena de acordo
    if (qualTipo(arrayOriginal) == 'string') {
        arrayOrdenado = arrayOriginal.sort() // Ordenando array string
    } else {
        arrayOrdenado = arrayOriginal.sort((a, b) => a - b) // Ordenando array com numero
    }

    // Desestruturando o retorno da função:
    [a, b, arrayFreq] = geraFreq(arrayOrdenado) //Gerando objeto com array usado

    let dadosInseridos = a // aqui pegamos os numeros (sem repetição)

    // freqSimples é coluna2 da tabela 
    let freqSimples = b // aqui pegamos os numeros as repetições

    let totalCol2 = geraTotalCol2(freqSimples)

    let rogerCol1, rogerCol2


    //se +10 ELEMENTOS NUMERAIS forem inseridos geramos a tabelaContinua
    if ((dadosInseridos.length > 10) && (qualTipo(arrayOrdenado) == 'number')) {
        [corpoTbEscolhida, qtdLinhas, valoresCol1, valoresCol2] = tabelaContinua(arrayOrdenado, totalCol2)
        qualVariavel = 'qualiContinua' //gráfico qualiContinua a ser gerados..

        rogerCol1 = valoresCol1
        rogerCol2 = valoresCol2

        //senao se -10 ELEMENTOS NUMERAIS forem inseridos geramos a tabelaSimples
    } else if ((dadosInseridos.length < 10) && (qualTipo(arrayOrdenado) == 'number')) { /* [corpoTbEscolhida, qtdLinhas] é uma desestruturação */
        [corpoTbEscolhida, qtdLinhas] = tabelaSimples(dadosInseridos, freqSimples, totalCol2)
        qualVariavel = 'qualiDiscreta' //gráfico qualiDiscreta a ser gerados..


        //senao se ELEMENTOS TEXTO forem inseridos geramos a tabelaSimples
    } else if (qualTipo(arrayOrdenado) == 'string') {
        [corpoTbEscolhida, qtdLinhas] = tabelaSimples(dadosInseridos, freqSimples, totalCol2)
        qualVariavel = 'qualiOrdinal/Nominal' //gráfico qualiOrdinal/Nominal a ser gerados..
    }

    tabela = geraCabecalho(nomeVariavel_p) + corpoTbEscolhida


    // aqui adicionamos SOMENTE 1ª E 2ª COLUNA:
    const domTabela = document.querySelector('.tabelas')
    domTabela.innerHTML = tabela += '</table>' //fechando tabela


    // O RESTO DA TABELA SERÁ FEITO A PARTIR DO EXEC. DA FUNÇÃO:
    geraRestCol(qtdLinhas)

    // GERAMOS OS GRÁFICOS:
    geraGraf(qtdLinhas)

    // GERAMOS O SLIDER DE MED. SEPARATRIZ
    alteraSlider(qtdLinhas)
    qtdLinhasTabela = qtdLinhas

    if ((a.length > 10) && (qualTipo(arrayOrdenado) == 'number')) {

        let vetEleCalc = vetPraCont1(rogerCol1, rogerCol2)
        let vetFreCalc = vetPraCont2(rogerCol1, rogerCol2)

        let mediaModaMed = document.querySelector('.media-moda-med')

        mediaModaMed.innerHTML = `
    <br>
    <b>Média:</b> ${acharMedia(vetEleCalc, vetFreCalc)}
    <br>
    <b>Mediana:</b> ${acharMediana(arrayOrdenado, rogerCol1, rogerCol2)} 
    <br>
    <b>Moda:</b> ${acharModa(vetEleCalc, vetFreCalc)}
    <br>
    <b>Desvio Padrão:</b> ${acharDP(vetEleCalc, vetFreCalc)}
    <br>
    <b>Coeficiente de Variação:</b> ${acharCV(vetEleCalc, vetFreCalc)}
    <br><br>
    `

    } else if ((a.length <= 10) && (qualTipo(arrayOrdenado) == 'number')) {

        let vetEleCalc = a
        let vetFreCalc = b

        let mediaModaMed = document.querySelector('.media-moda-med')

        mediaModaMed.innerHTML = `
    <br>
    Média: <b>${acharMedia(vetEleCalc, vetFreCalc)}</b>
    <br>
    Mediana: <b>${acharMediana(arrayOrdenado, vetEleCalc, vetEleCalc)}</b>
    <br>
    Moda: <b>${acharModa(vetEleCalc, vetFreCalc)}</b>
    <br>
    Desvio Padrão: <b>${acharDP(vetEleCalc, vetFreCalc)}</b>
    <br>
    Coeficiente de Variação: <b>${acharCV(vetEleCalc, vetFreCalc)}</b>
    <br><br>
    `

    } else if (qualTipo(arrayOrdenado) == 'string') {

        let vetEleCalc = a
        let vetFreCalc = b

        let mediaModaMed = document.querySelector('.media-moda-med')

        mediaModaMed.innerHTML = `
    <br>
    A mediana é: ${acharMediana(arrayOrdenado, vetEleCalc, vetEleCalc)}
    <br>
    A moda é: ${acharModa(vetEleCalc, vetFreCalc)}
    <br><br>
    `

    }
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


function geraFreq(arr) { // from jsfiddle.net/simevidas/bnACW/
    var a = [],
        b = [],
        prev

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i])
            b.push(1)
        } else {
            b[b.length - 1]++
        }
        prev = arr[i]
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

//################################################################################

function acharMediana(vet, vetPr, vetFr) {

    let impPar
    let mediana
    let indice
    let verificador = vet[0]
    let tipo
    let pInd
    let sInd
    let freAnt = 0
    let p1 = 0
    let ind

    if (vet.length & 1) { //ve se a quantidade de elemento do vetor e impar ou par para saber quantas medianas teram
        impPar = 'Impar'
    } else {
        impPar = 'Par'
    }

    if (impPar == 'Impar') { //descobre apenas uma mediana porque e impar
        indice = vet.length / 2
        mediana = vet[Math.floor(indice)]
    } else { //descobre duas medianas porque e par
        indice = vet.length / 2
        mediana = vet[indice - 1]

        if (vet[indice] != mediana) {
            mediana += ' e ' + vet[indice] //separa com a conjunção e
        }

    }

    if (isNaN(parseFloat(verificador))) { // se for string
        tipo = 'string'
    } else {
        tipo = 'number' // se for number
    }

    //Divisão entre outros e continua que vem a seguir

    if ((vetPr.length > 10) && (tipo == 'number')) {

        for (var i = 0; i <= vetPr.length; i++) {

            if (vetPr[i] <= parseFloat(mediana)) {

                pInd = vetPr[i]
                ind = i

            }
        }

        for (var i = 0; i <= vetPr.length; i++) {

            if (vetPr[i] > parseFloat(mediana)) {

                sInd = vetPr[i]
                break
            }
        }

        for (var i = 0; i < ind; i++) {

            freAnt = freAnt + vetFr[i]

        }

        p1 = ((vet.length / 2 - freAnt) / vetFr[ind]) * (sInd - pInd) + pInd

        return p1
    } else {

        return mediana
    }

}

//################################################################################

function acharMedia(vetEle, vetFre) { //entrar com o vetor de lista de elemento e de frequencia precisa fazer um if para
    //identificar qual opção o usuario escolheu ordinal, nominal ...
    var soma = parseFloat(vetEle[0]) * vetFre[0]
    var somaFre = vetFre[0]

    for (var i = 1; i < vetEle.length; i++) { //multiplica e soma os elementos do vetor com suas frequencias
        soma = soma + parseFloat(vetEle[i]) * vetFre[i]
        somaFre = somaFre + vetFre[i]
    }

    return (soma / somaFre).toFixed(1) //sai a media com apenas uma casa depois da virgula

}

//################################################################################

function acharModa(vetProp, vetValor) { //tem que entrar com o vetor de lista de elementos e frequencia   

    let maior = 0
    let aModa
    let posicao
    let modas = []

    for (var i = 0; i <= vetValor.length; i++) {

        if (vetValor[i] >= maior) {

            maior = vetValor[i]
            aModa = vetProp[i]
            posicao = i

        }
    }

    for (var i = 0; i <= posicao; i++) {

        if (vetValor[i] == maior) {

            modas.push(vetProp[i])

        }
    }

    if (modas.length == vetProp.length) {

        return 'Não tem moda'

    } else {

        if (modas.length <= 1) {
            return aModa
        } else {
            return modas
        }
    }
}

//################################################################################

function acharDP(vetEle, vetFre) { //entrar com o vetor de lista de elemento e de frequencia precisa fazer um if para
    //identificar qual opção o usuario escolheu ordinal, nominal ...
    var soma = parseFloat(vetEle[0]) * vetFre[0]
    var somaFre = vetFre[0]
    var media
    var etapaUm = 0
    var DP

    for (var i = 1; i < vetEle.length; i++) { //multiplica e soma os elementos do vetor com suas frequencias
        soma = soma + parseFloat(vetEle[i]) * vetFre[i]
        somaFre = somaFre + vetFre[i]
    }

    media = (soma / somaFre).toFixed(1) //sai a media com apenas uma casa depois da virgula

    for (var i = 0; i < vetEle.length; i++) {
        etapaUm = etapaUm + Math.pow(parseFloat(vetEle[i]) - media, 2) * vetFre[i]
    }
    //Aplicando a formula
    DP = (Math.sqrt(etapaUm / somaFre)).toFixed(1)

    return DP
}

//################################################################################

function acharCV(vetEle, vetFre) { //entrar com o vetor de lista de elemento e de frequencia precisa fazer um if para
    //identificar qual opção o usuario escolheu ordinal, nominal ...
    var soma = parseFloat(vetEle[0]) * vetFre[0]
    var somaFre = vetFre[0]
    var media
    var etapaUm = 0
    var DP
    var CV

    for (var i = 1; i < vetEle.length; i++) { //multiplica e soma os elementos do vetor com suas frequencias
        soma = soma + parseFloat(vetEle[i]) * vetFre[i]
        somaFre = somaFre + vetFre[i]
    }

    media = (soma / somaFre).toFixed(1) //sai a media com apenas uma casa depois da virgula

    for (var i = 0; i < vetEle.length; i++) {
        etapaUm = etapaUm + Math.pow(parseFloat(vetEle[i]) - media, 2) * vetFre[i]
    }
    //Aplicando a formula
    DP = (Math.sqrt(etapaUm / somaFre)).toFixed(1)

    CV = `${((DP / media) * 100).toFixed(0)}%`

    return CV
}

//################################################################################

function vetPraCont1(var1, var2) {

    let soma
    let media
    let vetMedia = []
    let vetFreque = []

    for (var i = 0; i <= var1.length - 1; i += 2) {

        soma = var1[i] + var1[i + 1]
        media = soma / 2
        vetMedia.push(media)
        vetFreque.push(var2[i])

    }

    return vetMedia
}

//################################################################################

function vetPraCont2(var1, var2) {

    let soma
    let media
    let vetMedia = []
    let vetFreque = []

    for (var i = 0; i <= var1.length - 1; i += 2) {

        soma = var1[i] + var1[i + 1]
        media = soma / 2
        vetMedia.push(media)
        vetFreque.push(var2[i])

    }

    return vetFreque
}

//################################################################################





// *******************FUNÇÃO TROCAR IMAGEM ICONES************************/


var foto = 6;
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

    //*********************TIPO DE GRÁFICO ************************/
    let tipodegrafico
    let titulodegrafico
    let quantDados = valoresCol1.length
    let tipodados = qualTipo(valoresCol1)

    if ((quantDados >= 10) && (tipodados == "number")) {
        tipodegrafico = 'line' //grafico Quantitativa Continua
        titulodegrafico = 'Quantitativa Contínua'
    } else if ((quantDados < 10) && (tipodados == "number")) {
        tipodegrafico = 'bar' //grafico Quantitativa Discreta
        titulodegrafico = 'Quantitativa Discreta'
    } else if (tipodados == "string") {
        tipodegrafico = 'pie' //grafico Qualitativa Ordinal ou Nominal
        titulodegrafico = 'Qualitativa Ordinal ou Nominal'
    }


    var ctx = document.querySelector('.myChart')

    if (delGrafAnt === 'sim') {
        chart.destroy()
    }

    chart = ctx.getContext('2d') //Este comando diz que usaremos graficos 2d

    Chart.defaults.scale.ticks.beginAtZero = true; //Configuração para grafico de barras iniciar no zero

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


/******************* CONTROLADOR DE SLIDER ***********************/

// CONTROLA SELECT
const slctMedSeparatriz = document.querySelector('.medidasSeparatriz')

slctMedSeparatriz.onchange = () => {
    const novoSlider = document.querySelector('.slider')
    const medidasSeparatriz = document.querySelector('option:checked').innerHTML

    switch (medidasSeparatriz) {
        case 'Quartil (25 em 25%)':
            novoSlider.step = 25
            novoSlider.min = 25
            break;

        case 'Quintil (20 em 20%)':
            novoSlider.step = 20
            novoSlider.min = 20
            break;

        case 'Decil (10 em 10%)':
            novoSlider.step = 10
            novoSlider.min = 10
            break;

        case 'Percentil (1 em 1%)':
            novoSlider.step = 1
            novoSlider.min = 1
            break;
    }

    alteraSlider(qtdLinhasTabela)
}



// CONTROLA SLIDER MUDAR:
const nivelSlider = document.querySelector('.slider')

nivelSlider.oninput = () => {
    alteraSlider(qtdLinhasTabela)
}