//PROBABILIDADE BINOMIAL
function Fatorial(n) {
    if (n === 0) return 1;
    if (n === 1) return 1;
    return n * Fatorial(n - 1)
}

document.querySelector('#btnCalcBinomial').onclick = () => {
    let qtdeAmostra = document.querySelector('#Amostra').value
    let sucesso = document.querySelector('#Sucesso').value
    let fracasso = document.querySelector('#Fracasso').value
    let evento = document.querySelector('#Evento')
    let eventoArray = evento.value.split(";").map(Number);
    console.log(qtdeAmostra, sucesso, fracasso, evento);
    if ((qtdeAmostra === '') || (sucesso === '') || (fracasso === '') || (eventoArray.length === 0)) {
        alert("Insira o(s) dado(s) que falta(m)")
    } else {
        sucesso = sucesso / 100;
        fracasso = fracasso / 100;
        console.log(eventoArray);
        let probabilidade = 0;
        let media = 0;
        let desvio = 0;
        let variacao = 0;
        for (let i = 0; i <= eventoArray.length - 1; i++) {
            let kFat = Fatorial(eventoArray[i]);
            let nFat = Fatorial(qtdeAmostra);
            let k = eventoArray[i];
            let n = qtdeAmostra;
            probabilidade = probabilidade + nFat / (Fatorial(n - k) * kFat) * Math.pow(sucesso, k) * Math.pow(fracasso, n - k);
            media = n * sucesso;
            desvio = Math.sqrt(n * sucesso * fracasso);
            variacao = (desvio / media) * 100
        }
        document.querySelector(".resultadoBinomial").innerHTML =
            `<div>Probabilidade: ${(probabilidade * 100).toFixed(2)}%</div>
             <div>Média: ${media.toFixed(2)}</div>
             <div>Desvio Padrão: ${desvio.toFixed(2)}</div>
             <div>Variância: ${variacao.toFixed(2)}%</div>`
    }
}