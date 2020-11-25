const btnCalcManual = document.querySelector('#btnCalcManual')

btnCalcManual.onclick = () => {
    // Realizando validação e procedendo com os resultados:

    let nomeVariavel = document.querySelector('#nomeVariavel').value
    let inputDados = document.querySelector('#inputDados').value

    //Validação com Regex dos dados:
    if (nomeVariavel.trim() == '' || inputDados.trim() == '') {
        triggerModal()
    } else {
        // Se tudo ok com a validação, prosseguir com os resultados:
        inputDados = inputDados.split(';'); // criando array mediante ';'
        
        geraResultado(nomeVariavel, inputDados)
    }

}