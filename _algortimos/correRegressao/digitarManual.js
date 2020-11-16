const btnCalcManual = document.querySelector('#btnCalcManual')

btnCalcManual.onclick = () => {
    // Realizando validação e procedendo com os resultados:
    const varXManual = document.querySelector('#varXManual').value
    const varYManual = document.querySelector('#varYManual').value

    if (regex(varYManual) == false || regex(varXManual) == false) {
        alert("Por favor preencha os campos corretamente")
    } else {
        corelacao()
        const formResultado = document.querySelector('#formResultado')
        formResultado.style.removeProperty('display')
    }
}