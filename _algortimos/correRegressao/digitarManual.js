const btnCalcManual = document.querySelector('#btnCalcManual')

btnCalcManual.onclick = () => {
    // Realizando validação e procedendo com os resultados:
    const varXManual = document.querySelector('#varXManual').value
    const varYManual = document.querySelector('#varYManual').value

    if (varYManual.trim() == '' || varXManual.trim() == '') {
        alert("Por favor preencha os campos que estão faltando")
    } else {
        corelacao()
        const formResultado = document.querySelector('#formResultado')
        formResultado.style.removeProperty('display')
    }
}