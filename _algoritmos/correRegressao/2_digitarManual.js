const btnCalcManual = document.querySelector('#btnCalcManual')

btnCalcManual.onclick = () => {
    // Realizando validação e procedendo com os resultados:
    const varXManual = document.querySelector('#varXManual').value
    const varYManual = document.querySelector('#varYManual').value

    //Validação com Regex dos dados:
    if (regex(varYManual) == false || regex(varXManual) == false) {
        triggerModal()
    } else {
        // Se tudo ok com a validação, prosseguir com os resultados:
        correRegressao()
        const formResultado = document.querySelector('#formResultado')
        formResultado.style.removeProperty('display')
    }
}