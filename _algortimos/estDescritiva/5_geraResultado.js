let qtdLinhasTabela

function geraResultado(nomeVariavel_p, inputDados_p) {

    // Exibe formResultado com os resultados
    const formResultado = document.querySelector('#formResultado');
    formResultado.style.removeProperty('display')

    let arrayOriginal = inputDados_p

    let arrayOrdenado = quickSort(arrayOriginal, (a, b) => a > b)

    // Desestruturando o retorno da função:
    let a
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

        mediaModaMed.innerHTML = `<br>
        <h5 style="margin-bottom: 0px;">Medidas de Tendência Central:</h5>
    <b>Média:</b> ${acharMedia(vetEleCalc, vetFreCalc)}
    <br>
    <b>Mediana:</b> ${acharMediana(arrayOrdenado, rogerCol1, rogerCol2)} 
    <br>
    <b>Moda:</b> ${acharModa(vetEleCalc, vetFreCalc)}
    <br>
<hr>
    <b>Desvio Padrão:</b> ${acharDP(vetEleCalc, vetFreCalc)}
    <br>
    <b>Coeficiente de Variação:</b> ${acharCV(vetEleCalc, vetFreCalc)}<br><br>
    `

    } else if ((a.length <= 10) && (qualTipo(arrayOrdenado) == 'number')) {

        let vetEleCalc = a
        let vetFreCalc = b

        let mediaModaMed = document.querySelector('.media-moda-med')

        mediaModaMed.innerHTML = `<br>
        <h5 style="margin-bottom: 0px;">Medidas de Tendência Central:</h5>
    Média: <b>${acharMedia(vetEleCalc, vetFreCalc)}</b>
    <br>
    Mediana: <b>${acharMediana(arrayOrdenado, vetEleCalc, vetEleCalc)}</b>
    <br>
    Moda: <b>${acharModa(vetEleCalc, vetFreCalc)}</b>
    <br>
<hr>
    <h5 style="margin-bottom: 0px;">Medidas de Dispersão:</h5>

    Desvio Padrão: <b>${acharDP(vetEleCalc, vetFreCalc)}</b>
    <br>
    Coeficiente de Variação: <b>${acharCV(vetEleCalc, vetFreCalc)}</b><br><br>
    `

    } else if (qualTipo(arrayOrdenado) == 'string') {

        let vetEleCalc = a
        let vetFreCalc = b

        let mediaModaMed = document.querySelector('.media-moda-med')

        mediaModaMed.innerHTML = `<br>
        <h5 style="margin-bottom: 0px;">Medidas de Tendência Central:</h5>
        Mediana: ${acharMediana(arrayOrdenado, vetEleCalc, vetEleCalc)}
    <br>
    Moda: ${acharModa(vetEleCalc, vetFreCalc)}<br>
    `

    }
}


/******************** ÁREA DE FUNÇÕES: ********************/


let qualTipo = (arrayOrdenado) => {
    let tipo

    for (let i = 0; i < arrayOrdenado.length; i++) {
        const verificador = arrayOrdenado[i]

        if (isNaN(parseFloat(verificador)) == true) { // se houver algum string no input
            tipo = 'string'
            return tipo
        } else {
            tipo = 'number' // se houver somente for number
        }
    }

    //somente vamos acessar aqui se for number
    return tipo
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

