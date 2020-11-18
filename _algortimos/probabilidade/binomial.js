// Ao clicar no botão de Calcular na <nav> binomial, fazer o seguinte:
document.querySelector('#btnCalcBinomial').onclick = () => {

    // capturando input de dados na DOM:
    let qtdeAmostra = document.querySelector('#Amostra').value
    let sucesso = document.querySelector('#Sucesso').value
    let fracasso = document.querySelector('#Fracasso').value
    let evento = document.querySelector('#Evento').value
    let eventoArray = evento.split(";").map(Number);
    let qtdeAmostraArray = qtdeAmostra.split(";").map(Number);

    //Validação com Regex dos dados:
    if (regex(qtdeAmostra) == false || regex(sucesso) == false || regex(fracasso) == false || regex(evento) == false) {
        triggerModal()

        // Sobre os dois else if abaixo: 
        /* Validação p/ evitar fatoriais de valores negativos,
        (se diferente de 'undefined', ainda existem val. negativos) */
    } else if (eventoArray.find(num => num < 0) != undefined) {
        triggerModal('O valores do Evento devem ser maior ou igual a zero')

    } else if (qtdeAmostraArray.find(num => num < 0) != undefined) {
        triggerModal('O valores da Amostra devem ser maior ou igual a zero')

    } else { // Se tudo ok com a validação, prosseguir com o algorítimo:

        sucesso = sucesso / 100;
        fracasso = fracasso / 100;

        //Declaração de variáveis (serão usadas no for)
        let probabilidade = 0, media, desvio, variacao

        for (let i = 0; i <= eventoArray.length - 1; i++) {
            let kFat = Fatorial(eventoArray[i]);
            let nFat = Fatorial(qtdeAmostra);
            let k = eventoArray[i];
            let n = qtdeAmostra;

            probabilidade = probabilidade + nFat / (Fatorial(n - k) * kFat) * Math.pow(sucesso, k) * Math.pow(fracasso, n - k);
            media = n * sucesso;
            debugger

            desvio = Math.sqrt(n * sucesso * fracasso);
            variacao = (desvio / media) * 100
        }

        //Exibição de resultados nas suas divs, respectivamente
        document.querySelector(".resultadoBinomial").innerHTML =
            `<div>Probabilidade: ${(probabilidade * 100).toFixed(2)}%</div>
             <div>Média: ${media.toFixed(2)}</div>
             <div>Desvio Padrão: ${desvio.toFixed(2)}</div>
             <div>Variância: ${variacao.toFixed(2)}%</div>`
    }
}

// declarando function Fatorial:

function Fatorial(valor) {
    if ((valor == 0) || (valor == 1)) {
        return 1;
    } else {
        var acumula = 1;
        for (x = valor; x > 1; x--) {
            acumula = acumula * x;
        }
        return acumula;
    }
    /* sem uso de recursividade devido ao estouro de pilha (creio que seja algo no servidor de hospedagem) */
}