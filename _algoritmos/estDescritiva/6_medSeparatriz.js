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




/******************* CONTROLADOR DE SLIDER ***********************/

// CONTROLA SELECT
const slctMedSeparatriz = document.querySelector('.medidasSeparatriz')

slctMedSeparatriz.onchange = () => {
  const novoSlider = document.querySelector('.slider')
  const medidasSeparatriz = document.querySelector('.medidasSeparatriz').selectedIndex
  

  switch (medidasSeparatriz) {
    case 0: //'Quartil (25 em 25%)':
      novoSlider.step = 25
      novoSlider.min = 0

      break;

    case 1: //'Quintil (20 em 20%)':
      novoSlider.step = 20
      novoSlider.min = 0
  

      break;

    case 2: //'Decil (10 em 10%)':
      novoSlider.step = 10
      novoSlider.min = 0
  

      break;

    case 3: //'Percentil (1 em 1%)':
      novoSlider.step = 1
      novoSlider.min = 0
  

      break;
  }

  alteraSlider(qtdLinhasTabela)
}



// CONTROLA SLIDER MUDAR:
const nivelSlider = document.querySelector('.slider')

nivelSlider.oninput = () => {
  alteraSlider(qtdLinhasTabela)
}