//PROBABILIDADE UNIFORME
document.querySelector('#btnCalcUniforme').onclick = () => {
    //document.getElementById("tabela-probabilidade").style.display = 'none';
    let pontoMin = parseFloat(document.querySelector('#uniformeMinimo').value)
    let pontoMax = parseFloat(document.querySelector('#uniformeMaximo').value)
    let menorQProbabilidade = parseFloat(document.querySelector('#intervaloUniforme').value)
    let maiorQProbabilidade = parseFloat(document.querySelector('#intervaloUniforme').value)
    let inicialProbabilidade = parseFloat(document.querySelector('input[name="uniforme3"]').value)
    let finalProbabilidade = parseFloat(document.querySelector('input[name="uniforme4"]').value)
    let MenorEntreMaior_Unif = document.querySelector('div.active').innerText

    if ((isNaN(pontoMin)) && (isNaN(pontoMax))) {
        alert("Insira o ponto mínimo e o ponto máximo")

    } else if (isNaN(pontoMin)) {
        alert("Insira o ponto mínimo")

    } else if (isNaN(pontoMax)) {
        alert("Insira o ponto máximo")

        debugger
        let intervalo = (menorQProbabilidade - pontoMin);
        let probabilidade = ((1 / (pontoMax - pontoMin)) * intervalo);
        console.log(menorQProbabilidade, intervalo);
        //document.getElementById("tabela-probabilidade").style.display = 'block';
        calcMedidas(probabilidade)

    } else if (MenorEntreMaior_Unif == 'Entre') {
        if ((isNaN(inicialProbabilidade)) || (isNaN(finalProbabilidade))) {
            alert("Insira o(s) campo(s) que falta(m)")

        } else {
            let intervalo = finalProbabilidade - inicialProbabilidade;
            let probabilidade = (1 / (pontoMax - pontoMin)) * intervalo;
            console.log(inicialProbabilidade, finalProbabilidade, probabilidade);
            //document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }

    } else if (MenorEntreMaior_Unif == 'Maior') {
        if (isNaN(maiorQProbabilidade)) {
            alert("Insira o campo que falta")

        } else {
            let intervalo = pontoMax - maiorQProbabilidade;
            let probabilidade = (1 / (pontoMax - pontoMin)) * intervalo;
            console.log(maiorQProbabilidade, probabilidade);
            //document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }
    }

    function calcMedidas(probabilidade) {
        let media = (pontoMax + pontoMin) / 2;
        let desvio = Math.sqrt((Math.pow((pontoMax - pontoMin), 2)) / 12);
        let variacao = (desvio / media) * 100;
        document.querySelector('#resultadoUniforme').innerHTML = `<tr><div>${(probabilidade * 100).toFixed(2)}%</div><div>${media.toFixed(2)}</div><div>${desvio.toFixed(2)}</div><div>${variacao.toFixed(2)}%</div></tr>`
    }
}