const btnCalc = document.querySelector('#btnCalc')
const vlResult = document.querySelector('.vlResult')

btnCalc.onclick = () => {
    const media = document.querySelector('#normalMedia').value
    const desv = document.querySelector('#normalDesvio').value
    const opt_intervalo = document.querySelector('.active').innerText
    const intervalo = document.querySelector('#intervalo').value

    let i = 0, y = 0, z = 0, coluna = 0, linha = 0, p = 0, probabilidade_int = 0
    let prob = []


    let vetIntervalo = intervalo.split(';').map(num => Number(num))

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


            probabilidade_int = parseFloat(probabilidade_int) + parseFloat(probabilidade_int2*2)
            probabilidade_int = probabilidade_int.toFixed(2)
            break;

    }

    /* VOLTAR A EXIBIR a div Resultado */
    vlResult.style.removeProperty('display')
    vlResult.innerHTML = `
        <div>
            Probabilidade:${probabilidade_int}%
        </div>
        `
}