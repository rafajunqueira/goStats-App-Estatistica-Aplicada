//PROBABILIDADE NORMAL
document.querySelector('#btnCalcNormal').onclick = () => {
    let media = document.querySelector('#normalMedia').value
    let desv = document.querySelector('#normalDesvio').value
    let intervaloAtivo = document.querySelector('label.active').innerText // aqui peguei a label que estiver com classe ativa no momento do click
    let intervaloNormal = document.querySelector('#intervaloNormal').value

    function processaNormal(gap = arrayIntervalo[0]) {
        // passagem de valor da formula de probabilidade Normal
        varConversao = (gap - media) / desv

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

    let varConversao, posicao, probFinal

    let arrayIntervalo = intervaloNormal.split(';').map(Number)

    // switch com Intervalo escolhido para gerar em probFinal o resultado
    switch (intervaloAtivo) {
        case 'Maior':
            processaNormal()

            if (arrayIntervalo[0] > media) {
                probFinal = ((0.5 - posicao) * 100).toFixed(2)
                debugger

            } else {
                probFinal = ((0.5 + posicao) * 100).toFixed(2)
            }
            break;

        case 'Menor':
            processaNormal()

            if (arrayIntervalo[0] <= media) {
                probFinal = ((0.5 - posicao) * 100).toFixed(2)

            } else { probFinal = ((0.5 + posicao) * 100).toFixed(2) }
            debugger
            break;

        case 'Entre':
            let prob = []

            for (let int of arrayIntervalo) {
                if (int != media) {
                    processaNormal(int)

                    prob.push(posicao)
                }
            }
            debugger
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
    debugger

}

function buscaBin(callback, array, vlBusca, inicio = 0, fim = array.length - 1) {
    if (fim >= inicio) {
        // truncando casas decimais da mediana
        let mediana = Math.trunc((fim + inicio) / 2)

        // Enviando ao callback a mediana
        let resultado = callback(array[mediana], vlBusca)

        // switch para verificar se mediana é o valor buscado
        switch (true) {
            case (resultado > 0): // procura na metade maior
                return buscaBin(callback, array, vlBusca, mediana + 1, fim)

            case (resultado < 0): // procura na metade menor
                return buscaBin(callback, array, vlBusca, inicio, mediana - 1)

            default: // Condição para sair da recursividade
                return array[mediana]
        }
    }

    // Se erro, retornar este modal:
    triggerModal('Houve um erro no processamento.')
}

// função auxiliar de comparação
function fnComp(tb, lin) {
    switch (true) {
        case (tb.lin == lin):
            return 0

        case (tb.lin > lin):
            return -1

        default:
            return 1
    }
}