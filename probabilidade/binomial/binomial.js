const btnCalc = document.querySelector('#btnCalc')

function fatorial(n) { // calc fatorial
    if ((n == 0) || (n == 1))
        return 1
    else
        return (n * fatorial(n - 1))
}



btnCalc.onclick = () => {
    const vlAmostra = parseFloat(document.querySelector('#Amostra').value)
    const vlSucesso = parseFloat(document.querySelector('#Sucesso').value)
    const vlFracasso = parseFloat(document.querySelector('#Fracasso').value)
    const vlEvento = parseFloat(document.querySelector('#Evento').value)
    let vlResult
    let formulaProba = () => (vlSucesso ** vlEvento) * (vlFracasso ** (vlAmostra - vlEvento))


    if ((vlAmostra == 0) || (vlAmostra == vlEvento)) { // análise comb. é 1
        vlResult = 1 * formulaProba()

    } else if (vlAmostra == 1) { // análise comb. é o própio vlAmostra
        vlResult = vlAostra * formulaProba()

    } else { // senao análise comb. precisa ser calculada
        let vlAnaComb = fatorial(vlAmostra) / fatorial(vlAmostra - vlEvento) * fatorial(vlEvento)
        vlResult = vlAnaComb * formulaProba()
    }
    vlResult = parseFloat(vlResult).toFixed(2) / 1000000

    console.log('vlResult :>> ', vlResult)

}




/* ----------- TESTE ---------- */


const EvFracasso = () => {
    document.querySelector('#Sucesso').value = 100 - document.querySelector('#Fracasso').value
}

const EvSucesso = () => {
    document.querySelector('#Fracasso').value = 100 - document.querySelector('#Sucesso').value
}