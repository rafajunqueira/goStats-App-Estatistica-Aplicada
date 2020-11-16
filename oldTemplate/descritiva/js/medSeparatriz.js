function alteraSlider(qtdLinhas) {

    let freqAcu = []
    let col1_linha = []


    for (let i = 1; i <= qtdLinhas; i++) {
        // freqAcumulada é a 4ª coluna da tabela
        let cache = document.querySelector(`.calcFreqAcum${i}`).innerHTML
        freqAcu.push(cache)

        // col1_linha é a coluna 1
        cache = document.querySelector(`.col1_linha${i}`).innerHTML
        col1_linha.push(cache)

    }

    let totalFreq = document.querySelector('.totalFreq').innerHTML

    let vlAtualRange = parseFloat(document.querySelector('.slider').value)

    let vlSeparatriz = vlAtualRange / 100 * parseFloat(totalFreq)

    // aqui encontraremos o index em freqAcu do 1º número maior que o vlSeparatriz
    let indexVlSeparatriz = freqAcu.findIndex((element) => element >= vlSeparatriz)

    // aqui pegamos o valor desse 1º número maior
    vlSeparatriz = col1_linha[indexVlSeparatriz]


    let DOM_vlSeparatriz = document.querySelector('.vlSeparatriz')

    DOM_vlSeparatriz.innerHTML = vlSeparatriz



    let DOM_porcSeparatriz = document.querySelector('.porcSeparatriz')

    DOM_porcSeparatriz.innerHTML = `${vlAtualRange}% de 100%`

}
