const btnCalcManual = document.querySelector('#btnCalcManual')

btnCalcManual.onclick = () => {
    nomeVariavel = document.querySelector('#nomeVariavel').value

    inputDados = document.querySelector('#inputDados').value
    inputDados = inputDados.split(';'); // Separando ';' dos dados

    geraResultado(nomeVariavel, inputDados)
}