//PROBABILIDADE NORMAL

//     const media = document.querySelector('#normalMedia').value
//     const desv = document.querySelector('#normalDesvio').value
//     const opt_intervalo = document.querySelector('label.active').innerText
//     const intervaloNormal = document.querySelector('#intervaloNormal').value


function buscaTabelaZ(variavel, media, desvio, variavelAux, auxiliar) {
    let probabilidade = 0;
    if (typeof variavelAux === 'undefined') {
        let numeroZ = (Math.abs((variavel - media) / desvio)).toFixed(2);
        if (numeroZ < 4) {
            numeroZ = numeroZ.toString();
            console.log(numeroZ);
            let tabelaZ = [];
            for (let i = 0; i < numeroZ.length; i++) {
                tabelaZ.push(numeroZ.charAt(i))
            }
            let row
            if (tabelaZ[2] !== '0') {
                row = tabelaZ[0] + tabelaZ[1] + tabelaZ[2];
            } else {
                row = tabelaZ[0]
            }
            let column = tabelaZ[3];
            let aux = tabela[row];
            console.log(aux[column])
            switch (auxiliar) {
                case "+":
                    if (variavel < media) {
                        probabilidade = (0.5 - aux[column]) * 100;
                    } else if (variavel > media) {
                        probabilidade = (0.5 + aux[column]) * 100;
                    } else if (variavel === media) {
                        probabilidade = (0.5) * 100;
                    }
                    break;
                case "-":
                    if (variavel < media) {
                        probabilidade = (0.5 + aux[column]) * 100;
                    } else if (variavel > media) {
                        probabilidade = (0.5 - aux[column]) * 100;
                    } else if (variavel === media) {
                        probabilidade = (0.5) * 100;
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (auxiliar) {
                case "+":
                    if (variavel < media) {
                        probabilidade = (0.5 - 0.5) * 100;
                    } else if (variavel > media) {
                        probabilidade = (0.5 + 0.5) * 100;
                    } else if (variavel === media) {
                        probabilidade = (0.5) * 100;
                    }
                    break;
                case "-":
                    if (variavel < media) {
                        probabilidade = (0.5 + 0.5) * 100;
                    } else if (variavel > media) {
                        probabilidade = (0.5 - 0.5) * 100;
                    } else if (variavel === media) {
                        probabilidade = (0.5) * 100;
                    }
                    break;
                default:
                    break;
            }
        }
        console.log(auxiliar);
        document.getElementById("medidas-probNormal").innerHTML = `<td>${probabilidade.toFixed(2)}%</td>`
    } else {
        let numeroZ1 = (Math.abs((variavel - media) / desvio)).toFixed(2);
        console.log(variavel, media, desvio, numeroZ1)
        numeroZ1 = numeroZ1.toString();
        console.log(numeroZ1);
        let tabelaZ1 = [];
        for (let i = 0; i < numeroZ1.length; i++) {
            tabelaZ1.push(numeroZ1.charAt(i))
        }
        let row1
        if (tabelaZ1[2] !== '0') {
            row1 = tabelaZ1[0] + tabelaZ1[1] + tabelaZ1[2];
        } else {
            row1 = tabelaZ1[0]
        }

        console.log(numeroZ1)
        let column1 = tabelaZ1[3];
        let aux1 = tabela[row1];

        let numeroZ2 = (Math.abs((variavelAux - media) / desvio)).toFixed(2);
        numeroZ2 = numeroZ2.toString();
        console.log(numeroZ2);
        let tabelaZ2 = [];
        for (let i = 0; i < numeroZ2.length; i++) {
            tabelaZ2.push(numeroZ2.charAt(i))
        }
        let row2
        if (tabelaZ2[2] !== '0') {
            row2 = tabelaZ2[0] + tabelaZ2[1] + tabelaZ2[2];
        } else {
            row2 = tabelaZ2[0]
        }
        console.log(row2, row1)
        let column2 = tabelaZ2[3];
        let aux2 = tabela[row2];
        let probabilidade
        if (variavel > media && variavelAux > media) {
            probabilidade = Math.abs((aux1[column1] * 100) - (aux2[column2] * 100))
        } else if (variavel < media && variavelAux < media) {
            probabilidade = Math.abs((aux1[column1] * 100) - (aux2[column2] * 100))
        } else if (variavel < media && variavelAux > media) {
            probabilidade = Math.abs((aux1[column1] * 100) + (aux2[column2] * 100));
        } else if (variavelAux === media && variavel < media) {
            probabilidade = (aux1[column1] * 100);
        } else if (variavel === media && variavelAux > media) {
            probabilidade = (aux2[column2] * 100);
        }
        console.log((aux1[column1] * 100), (aux2[column2] * 100));
        document.getElementById("medidas-probNormal").innerHTML = `<td>${probabilidade.toFixed(2)}%</td>`
    }
    document.getElementById("tabela-probNormal").style.display = 'block'
}
function calcProbNormal() {
    let media = parseFloat($('input[name="mediaInp"]').val());
    let desvio = parseFloat($('input[name="desvioInp"]').val());
    if (document.getElementById("comparacaoNormal").value === '0') {
        alert("Insira o intervalo!")
    } else if (document.getElementById("comparacaoNormal").value === '1') {
        let menorQProbabilidade = parseFloat($('input[name="menorQ-ProbabilidadeN"]').val());
        let auxiliar = "+";
        if (isNaN(menorQProbabilidade)) {
            alert("Insira o campo que falta")
        } else {
            buscaTabelaZ(menorQProbabilidade, media, desvio, undefined, auxiliar)
        }
    } else if (document.getElementById("comparacaoNormal").value === '2') {

        let inicialProbabilidade = parseFloat($('input[name="inicial-ProbabilidadeN"]').val());
        let finalProbabilidade = parseFloat($('input[name="final-ProbabilidadeN"]').val());
        if ((isNaN(inicialProbabilidade)) || (isNaN(finalProbabilidade))) {
            alert("Insira o(s) dado(s) que falta(m)")
        } else {
            buscaTabelaZ(inicialProbabilidade, media, desvio, finalProbabilidade)
        }
    } else if (document.getElementById("comparacaoNormal").value === '3') {
        let maiorQProbabilidade = parseFloat($('input[name="valor-ProbabilidadeN"]').val());
        let auxiliar = "-";
        if (isNaN(maiorQProbabilidade)) {
            alert("Insira o campo que falta")
        } else {
            buscaTabelaZ(maiorQProbabilidade, media, desvio, undefined, auxiliar)
        }
    }
}



// //PROBABILIDADE NORMAL
// document.querySelector('#btnCalcNormal').onclick = () => {
//     const media = document.querySelector('#normalMedia').value
//     const desv = document.querySelector('#normalDesvio').value
//     const opt_intervalo = document.querySelector('label.active').innerText
//     const intervaloNormal = document.querySelector('#intervaloNormal').value

//     let i, y, z, coluna, linha, p, probabilidade_int, prob = []

//     let vetIntervalo = intervaloNormal.split(';').map(Number)

//     switch (opt_intervalo) {
//         case 'Menor':
//             z = (vetIntervalo[0] - media) / desv
//             if (z < 0) z *= -1 // se o número for negativo, ele passa para positivo

//             i = z.toFixed(2)
//             y = [...i]

//             linha = parseFloat(y[0] + y[2])
//             coluna = parseInt(i[3])
//             //debugger
//             if (linha <= 39) {
//                 p = tabela[linha][coluna]
//             } else if (linha > 39) {
//                 p = 0.5000
//             }
//             //debugger
//             if (vetIntervalo[0] < media) {
//                 probabilidade_int = ((0.5 - p) * 100).toFixed(2)
//             } else {
//                 probabilidade_int = ((0.5 + p) * 100).toFixed(2)
//             }
//             break;

//         case 'Entre':
//             //debugger
//             for (let int of vetIntervalo) {
//                 if (int != media) {
//                     z = (int - media) / desv
//                     if (z < 0) {
//                         z = z * -1
//                     }

//                     i = z.toFixed(2)
//                     y = [...i]

//                     linha = parseFloat(y[0] + y[2])
//                     coluna = parseInt(i[3])
//                     if (linha <= 39) {
//                         p = tabela[linha][coluna]
//                     } else if (linha > 39) {
//                         p = 0.5000
//                     }
//                     prob.push(p)
//                 }
//             }

//             if (vetIntervalo[0] > vetIntervalo[1] || vetIntervalo[0] > media) {
//                 probabilidade_int = ((prob.reduce((a, b) => a + b)) * 100).toFixed(2)
//             } else {
//                 probabilidade_int = ((prob.reduce((a, b) => a - b)) * 100).toFixed(2)
//             }

//             break;

//         case 'Maior':
//             z = (vetIntervalo[0] - media) / desv
//             if (z < 0) z *= -1 // se o número for negativo, ele passa para positivo

//             i = z.toFixed(2)
//             y = [...i]

//             linha = parseFloat(y[0] + y[2])
//             coluna = parseInt(i[3])
//             //debugger
//             if (linha <= 39) {
//                 p = tabela[linha][coluna]
//             } else if (linha > 39) {
//                 p = 0.5000
//             }
//             //debugger
//             if (vetIntervalo[0] < media) {
//                 probabilidade_int = ((0.5 - p) * 100).toFixed(2)
//             } else {
//                 probabilidade_int = ((0.5 + p) * 100).toFixed(2)
//             }


//             /* --------- */

//             for (let int of vetIntervalo) {
//                 if (int != media) {
//                     z = (int - media) / desv
//                     if (z < 0) {
//                         z = z * -1
//                     }

//                     i = z.toFixed(2)
//                     y = [...i]

//                     linha = parseFloat(y[0] + y[2])
//                     coluna = parseInt(i[3])
//                     if (linha <= 39) {
//                         p = tabela[linha][coluna]
//                     } else if (linha > 39) {
//                         p = 0.5000
//                     }
//                     prob.push(p)
//                 }
//             }
//             let probabilidade_int2
//             if (vetIntervalo[0] > vetIntervalo[1] || vetIntervalo[0] > media) {
//                 probabilidade_int2 = ((prob.reduce((a, b) => a + b)) * 100).toFixed(2)
//             } else {
//                 probabilidade_int2 = ((prob.reduce((a, b) => a - b)) * 100).toFixed(2)
//             }


//             probabilidade_int = parseFloat(probabilidade_int) + parseFloat(probabilidade_int2 * 2)
//             probabilidade_int = probabilidade_int.toFixed(2)
//             break;

//     }

//     /* VOLTAR A EXIBIR a div resultadoNormal */
//     const resultadoNormal = document.querySelector('.resultadoNormal')

//     resultadoNormal.style.removeProperty('display')
//     resultadoNormal.innerHTML = `
//         <div>
//             Probabilidade: ${probabilidade_int}%
//         </div>
//         `
// }