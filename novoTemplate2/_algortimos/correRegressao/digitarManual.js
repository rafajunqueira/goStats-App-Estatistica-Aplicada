const btnCalcManual = document.querySelector('#btnCalcManual')
const formResultado = document.querySelector('#formResultado')

btnCalcManual.onclick = () => {
    corelacao()
    formResultado.style.removeProperty('display')
}

