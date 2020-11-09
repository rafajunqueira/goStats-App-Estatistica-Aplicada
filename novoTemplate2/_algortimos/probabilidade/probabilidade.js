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




//PROBABILIDADE NORMAL
document.querySelector('#btnCalcNormal').onclick = () => {
    const media = document.querySelector('#normalMedia').value
    const desv = document.querySelector('#normalDesvio').value
    const opt_intervalo = document.querySelector('label.active').innerText
    const intervalo = document.querySelector('#intervalo').value

    let i, y, z, coluna, linha, p, probabilidade_int, prob = []

    let vetIntervalo = intervalo.split(';').map(Number)

    switch (opt_intervalo) {
        case 'Menor':
            z = (vetIntervalo[0] - media) / desv
            if (z < 0) z *= -1 // se o número for negativo, ele passa para positivo

            i = z.toFixed(2)
            y = [...i]

            linha = parseFloat(y[0] + y[2])
            coluna = parseInt(i[3])
            //debugger
            if (linha <= 39) {
                p = tabela[linha][coluna]
            } else if (linha > 39) {
                p = 0.5000
            }
            //debugger
            if (vetIntervalo[0] < media) {
                probabilidade_int = ((0.5 - p) * 100).toFixed(2)
            } else {
                probabilidade_int = ((0.5 + p) * 100).toFixed(2)
            }
            break;

        case 'Entre':
            //debugger
            for (let int of vetIntervalo) {
                if (int != media) {
                    z = (int - media) / desv
                    if (z < 0) {
                        z = z * -1
                    }

                    i = z.toFixed(2)
                    y = [...i]

                    linha = parseFloat(y[0] + y[2])
                    coluna = parseInt(i[3])
                    if (linha <= 39) {
                        p = tabela[linha][coluna]
                    } else if (linha > 39) {
                        p = 0.5000
                    }
                    prob.push(p)
                }
            }

            if (vetIntervalo[0] > vetIntervalo[1] || vetIntervalo[0] > media) {
                probabilidade_int = ((prob.reduce((a, b) => a + b)) * 100).toFixed(2)
            } else {
                probabilidade_int = ((prob.reduce((a, b) => a - b)) * 100).toFixed(2)
            }

            break;

        case 'Maior':
            z = (vetIntervalo[0] - media) / desv
            if (z < 0) z *= -1 // se o número for negativo, ele passa para positivo

            i = z.toFixed(2)
            y = [...i]

            linha = parseFloat(y[0] + y[2])
            coluna = parseInt(i[3])
            //debugger
            if (linha <= 39) {
                p = tabela[linha][coluna]
            } else if (linha > 39) {
                p = 0.5000
            }
            //debugger
            if (vetIntervalo[0] < media) {
                probabilidade_int = ((0.5 - p) * 100).toFixed(2)
            } else {
                probabilidade_int = ((0.5 + p) * 100).toFixed(2)
            }


            /* --------- */

            for (let int of vetIntervalo) {
                if (int != media) {
                    z = (int - media) / desv
                    if (z < 0) {
                        z = z * -1
                    }

                    i = z.toFixed(2)
                    y = [...i]

                    linha = parseFloat(y[0] + y[2])
                    coluna = parseInt(i[3])
                    if (linha <= 39) {
                        p = tabela[linha][coluna]
                    } else if (linha > 39) {
                        p = 0.5000
                    }
                    prob.push(p)
                }
            }
            let probabilidade_int2
            if (vetIntervalo[0] > vetIntervalo[1] || vetIntervalo[0] > media) {
                probabilidade_int2 = ((prob.reduce((a, b) => a + b)) * 100).toFixed(2)
            } else {
                probabilidade_int2 = ((prob.reduce((a, b) => a - b)) * 100).toFixed(2)
            }


            probabilidade_int = parseFloat(probabilidade_int) + parseFloat(probabilidade_int2 * 2)
            probabilidade_int = probabilidade_int.toFixed(2)
            break;

    }

    /* VOLTAR A EXIBIR a div resultadoNormal */
    resultadoNormal.style.removeProperty('display')
    resultadoNormal.innerHTML = `
        <div>
            Probabilidade: ${probabilidade_int}%
        </div>
        `
}



//PROBABILIDADE UNIFORME
document.querySelector('#btnCalcUniforme').onclick = () => {
    document.getElementById("tabela-probabilidade").style.display = 'none';
    let pontoMin = parseFloat(document.querySelector('#uniformeMinimo').value)
    let pontoMax = parseFloat(document.querySelector('#uniformeMaximo').value)
    let menorQProbabilidade = parseFloat($('input[name="menorQProbabilidade"]').val());
    let inicialProbabilidade = parseFloat($('input[name="inicialProbabilidade"]').val());
    let finalProbabilidade = parseFloat($('input[name="finalProbabilidade"]').val());
    let maiorQProbabilidade = parseFloat($('input[name="maiorQProbabilidade"]').val());
    function calcMedidas(probabilidade) {
        let media = (pontoMax + pontoMin) / 2;
        let desvio = Math.sqrt((Math.pow((pontoMax - pontoMin), 2)) / 12);
        let variacao = (desvio / media) * 100;
        document.getElementById("medidas-probabilidade").innerHTML = `<tr><div>${(probabilidade * 100).toFixed(2)}%</div><div>${media.toFixed(2)}</div><div>${desvio.toFixed(2)}</div><div>${variacao.toFixed(2)}%</div></tr>`
    }
    if ((isNaN(pontoMin)) && (isNaN(pontoMax))) {
        alert("Insira o ponto mínimo e o ponto máximo")
    } else if (isNaN(pontoMin)) {
        alert("Insira o ponto mínimo")
    } else if (isNaN(pontoMax)) {
        alert("Insira o ponto máximo")
    } else if (document.getElementById("comparacaoUniforme").value === '0') {
        alert("Insira o intervalo!")
    } else if (document.getElementById("comparacaoUniforme").value === '1') {
        if (isNaN(menorQProbabilidade)) {
            alert("Insira o campo que falta")
        } else {
            let intervalo = (menorQProbabilidade - pontoMin);
            let probabilidade = ((1 / (pontoMax - pontoMin)) * intervalo);
            console.log(menorQProbabilidade, intervalo);
            document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }
    } else if (document.getElementById("comparacaoUniforme").value === '2') {
        if ((isNaN(inicialProbabilidade)) || (isNaN(finalProbabilidade))) {
            alert("Insira o(s) campo(s) que falta(m)")
        } else {
            let intervalo = finalProbabilidade - inicialProbabilidade;
            let probabilidade = (1 / (pontoMax - pontoMin)) * intervalo;
            console.log(inicialProbabilidade, finalProbabilidade, probabilidade);
            document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }
    } else if (document.getElementById("comparacaoUniforme").value === '3') {
        if (isNaN(maiorQProbabilidade)) {
            alert("Insira o campo que falta")
        } else {
            let intervalo = pontoMax - maiorQProbabilidade;
            let probabilidade = (1 / (pontoMax - pontoMin)) * intervalo;
            console.log(maiorQProbabilidade, probabilidade);
            document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }
    }
}







/* ----------- EVENTOS DE JS ---------- */

const EvFracasso = () => {
    document.querySelector('#Sucesso').value = 100 - document.querySelector('#Fracasso').value
}

const EvSucesso = () => {
    document.querySelector('#Fracasso').value = 100 - document.querySelector('#Sucesso').value
}

const trocarAbas = () => {
    document.querySelector('.resultadoBinomial').innerHTML = ''
    document.querySelector('.resultadoNormal').innerHTML = ''
    document.querySelector('.resultadoUniforme').innerHTML = ''
}