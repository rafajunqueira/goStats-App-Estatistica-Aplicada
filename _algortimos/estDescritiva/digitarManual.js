const btnCalcManual = document.querySelector('#btnCalcManual')

btnCalcManual.onclick = () => {
    let nomeVariavel = document.querySelector('#nomeVariavel')
    nomeVariavel = nomeVariavel.value
	
    inputDados = document.querySelector('#inputDados').value
    inputDados = inputDados.split(';'); // Separando ';' dos dados

    geraResultado(nomeVariavel, inputDados)
}