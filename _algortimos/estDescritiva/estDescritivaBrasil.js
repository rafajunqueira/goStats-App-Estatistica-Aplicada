/* SCRIPT CRIADO PARA EXEMPLIFICAR GOLS NAS Eliminatórias da Copa do Mundo */

window.onload = function() {
    let nomeVariavel = document.querySelector('#nomeVariavel')
    nomeVariavel = nomeVariavel.value
	
    inputDados = document.querySelector('#inputDados').value
    inputDados = inputDados.split(';'); // Separando ';' dos dados
    
    geraResultado(nomeVariavel, inputDados)
  };