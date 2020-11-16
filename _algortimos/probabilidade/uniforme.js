document.querySelector('#btnCalcUniforme').onclick = () => {

    // Capturando elementos para usar em funções...
    let pontoMin = parseFloat(document.querySelector('#uniformeMinimo').value)
    let pontoMax = parseFloat(document.querySelector('#uniformeMaximo').value)
    let Menor, Inicial, Final, Maior

    // abaixo verificando qual botão foi clicado (a partir da classe ativa)
    const MenorEntreMaior_Unif = document.querySelector('div#botoesUniforme > div.active').innerText
    switch (MenorEntreMaior_Unif) {
        case 'Menor':
            Menor = parseFloat(document.querySelector('#intervaloUniforme').value)
            break;

        case 'Entre':
            Inicial = parseFloat(document.getElementsByName('uniforme3')[0].value)
            Final = parseFloat(document.getElementsByName('uniforme4')[0].value)
            break;

        case 'Maior':
            Maior = parseFloat(document.querySelector('#intervaloUniforme').value)
            break;
    }


    // Validações + cálculos
    if ((isNaN(pontoMin)) && (isNaN(pontoMax))) {
        alert("Insira o ponto mínimo e o ponto máximo")

    } else if (isNaN(pontoMin)) {
        alert("Insira o ponto mínimo")

    } else if (isNaN(pontoMax)) {
        alert("Insira o ponto máximo")

    } else if (MenorEntreMaior_Unif == 'Menor') {
        debugger
        let intervalo = (Menor - pontoMin);
        let probabilidade = ((1 / (pontoMax - pontoMin)) * intervalo);
        console.log(Menor, intervalo);
        calcMedidas(probabilidade)

    } else if (MenorEntreMaior_Unif == 'Entre') {
        debugger
        if ((isNaN(Inicial)) || (isNaN(Final))) {
            alert("Insira o(s) campo(s) que falta(m)")

        } else {
            debugger
            let intervalo = Final - Inicial;
            let probabilidade = (1 / (pontoMax - pontoMin)) * intervalo;
            console.log(Inicial, Final, probabilidade);
            calcMedidas(probabilidade)
        }

    } else if (MenorEntreMaior_Unif == 'Maior') {
        debugger
        if (isNaN(Maior)) {
            alert("Insira o campo que falta")

        } else {
            debugger
            let intervalo = pontoMax - Maior;
            let probabilidade = (1 / (pontoMax - pontoMin)) * intervalo;
            console.log(Maior, probabilidade);
            calcMedidas(probabilidade)
        }
    }


    // Exibição de Resultado
    function calcMedidas(probabilidade) {
        debugger
        let media = (pontoMax + pontoMin) / 2;
        let desvio = Math.sqrt((Math.pow((pontoMax - pontoMin), 2)) / 12);
        let variacao = (desvio / media) * 100;
        document.querySelector('.resultadoUniforme').innerHTML = `
        <div>Probabilidade: ${(probabilidade * 100).toFixed(2)}%</div>
        <div>Média: ${media.toFixed(2)}</div>
        <div>Desvio Padrão: ${desvio.toFixed(2)}</div>
        <div>Variância: ${variacao.toFixed(2)}%</div>`
    }
}