let resultadoBinomial = document.querySelector('.resultadoBinomial')
let btnCalcBinomial = document.querySelector('#btnCalcBinomial')

function fatorial(n) { // calc fatorial
    if ((n == 0) || (n == 1))
        return 1
    else
        return (n * fatorial(n - 1))
}

btnCalcBinomial.onclick = () => {

    const amostra = document.querySelector('#Amostra').value
    const sucesso = document.querySelector('#Sucesso').value
    const fracasso = document.querySelector('#Fracasso').value
    const evento = document.querySelector('#Evento').value


    let evento_tratado = []
    var au = evento.split(';')
    let probabilidade = 0, media = 0, dp = 0
    let analise, fat_n, fat_k, fat_nk, aux, aux2

    for (let i = 0; i < au.length; i++) {
        evento_tratado.push(parseInt(au[i]))
    }
    if (evento_tratado.length == 1) {
        aux = amostra - evento
        fat_k = fatorial(evento)
        fat_n = fatorial(amostra)
        fat_nk = fatorial(aux)

        if (parseInt(evento) == 0) {
            analise = 1
        } else if (parseInt(evento) == 1) {
            analise = amostra
        } else {
            analise = (fat_n / (fat_nk * fat_k))
        }

        probabilidade = ((analise * ((sucesso / 100) ** evento) * ((fracasso / 100) ** aux)) * 100).toFixed(2)



    } else {

        for (let i = 0; i < evento_tratado.length; i++) {
            aux = amostra - evento_tratado[i]
            fat_k = fatorial(evento_tratado[i])
            fat_n = fatorial(amostra)
            fat_nk = fatorial(aux)

            if (parseInt(evento_tratado[i]) == 0) {
                analise = 1
            } else if (parseInt(evento_tratado[i]) == 1) {
                analise = amostra
            } else {
                analise = (fat_n / (fat_nk * fat_k))
            }

            aux2 = ((analise * ((sucesso / 100) ** evento_tratado[i])
                * ((fracasso / 100) ** aux)) * 100).toFixed(2)

            aux2 = parseFloat(aux2)

            probabilidade += aux2
        }

    }

    media = amostra * (sucesso / 100)
    dp = (((amostra * (sucesso / 100) * (fracasso / 100)) ** (1 / 2))).toFixed(2)



    /* VOLTAR A EXIBIR a div resultadoBinomial */
    resultadoBinomial.style.removeProperty('display')
    resultadoBinomial.innerHTML =
        `
        <div>Probabilidade: ${probabilidade}%</div>

        <div>Média: ${media}</div>
        
        <div>Desvio padrão: ${dp}</div>`


}



/* ----------- EVENTOS DE JS ---------- */

const EvFracasso = () => {
    document.querySelector('#Sucesso').value = 100 - document.querySelector('#Fracasso').value
}

const EvSucesso = () => {
    document.querySelector('#Fracasso').value = 100 - document.querySelector('#Sucesso').value
}

const trocarAbas = () => {
    document.querySelector('.resultadoBinomial').innerHTML = ''
    document.querySelector('.resultadoNormal').innerHTML = ''
    document.querySelector('.resultadoUniforme').innerHTML = ''
}