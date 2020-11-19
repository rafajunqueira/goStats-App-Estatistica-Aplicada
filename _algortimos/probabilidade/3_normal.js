//PROBABILIDADE NORMAL
document.querySelector('#btnCalcNormal').onclick = () => {
    let media = document.querySelector('#normalMedia').value
    let desvio = document.querySelector('#normalDesvio').value
    let intervaloAtivo = document.querySelector('label.active').innerText // aqui peguei a label que estiver com classe ativa no momento do click
    let intervaloNormal = document.querySelector('#intervaloNormal').value

    // Validando campos:
    switch (true) {
        case (regex(media) == false):
        case (regex(desvio) == false):
        case (regex(intervaloAtivo) == false):
        case (regex(intervaloNormal) == false):
            return triggerModal()
    }

    // declaração de variáveis que serão usadas depois nos cálculos
    let varConversao, posicao, probFinal


    function processaNormal(gap = arrayIntervalo[0]) {
        // passagem de valor da formula de probabilidade Normal
        varConversao = (gap - media) / desvio

        // capturando valor absoluto de varConversao
        varConversao = Math.abs(varConversao)

        // cortando casas decimais de varConversao
        varConversao = varConversao.toFixed(2)

        // espalhando em array varConversao
        varConversao = [...varConversao]

        // declarando variáveis de localização na tabela Normal
        let lin = varConversao[0] + varConversao[2]
        let col = Number(varConversao[3])

        if (lin <= 39) {
            // aqui vamos usar a busca binária para localizar na tb a coordenada (tabelaNormal.js)
            const vetArea = buscaBin(fnComp, tb, lin)
            posicao = vetArea.col[col]
        } else {
            posicao = 0.5000
        }
    }

    // criando array a partir do split e convertendo estes para Number
    let arrayIntervalo = intervaloNormal.split(';').map(Number)

    // switch com Intervalo escolhido para gerar em probFinal o resultado
    switch (intervaloAtivo) {
        case 'Maior':
            processaNormal()

            if (arrayIntervalo[0] > media) {
                probFinal = ((0.5 - posicao) * 100).toFixed(2)
                

            } else {
                probFinal = ((0.5 + posicao) * 100).toFixed(2)
            }
            break;

        case 'Menor':
            processaNormal()

            if (arrayIntervalo[0] <= media) {
                probFinal = ((0.5 - posicao) * 100).toFixed(2)

            } else { probFinal = ((0.5 + posicao) * 100).toFixed(2) }
            
            break;

        case 'Entre':
            let prob = []

            for (let int of arrayIntervalo) {
                if (int != media) {
                    processaNormal(int)

                    prob.push(posicao)
                }
            }
            
            if (arrayIntervalo[0] > arrayIntervalo[1] || arrayIntervalo[0] > media) {
                probFinal = ((prob.reduce((a, b) => a + b)) * 100).toFixed(2)
            } else {
                probFinal = ((prob.reduce((a, b) => a - b)) * 100).toFixed(2)
            }
            break;
    }


    /* VOLTAR A EXIBIR a div resultadoNormal */
    const resultadoNormal = document.querySelector('.resultadoNormal')


    // passando resultados para essa div:
    resultadoNormal.style.removeProperty('display')
    resultadoNormal.innerHTML = `
        <div>
            Probabilidade: ${probFinal}%
        </div>
        `
    

}