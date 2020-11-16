
function geraCabecalho(nomeVariavel) {
    // processo de geração de cabeçalho da tabela :
    let cabecalho = `<table class="table-responsive" border='1'>
                        <tr class='linhaCabec'>
                            <th>${nomeVariavel}</th>
                            <th>Frequência Simples</th>
                            <th>Frequência Simples % (Fr%)</th>
                            <th>Frequência Acumulada (Fac)</th>
                            <th>Frequência Acumulada % (Fac%)</th>
                        </tr>`
    return cabecalho
}

// usado em coluna 1, e moda med med
let valoresCol1
let valoresCol2

//abaixo gera colunas 1 e 2 
function tabelaContinua(arrayOrdenado, totalCol2) {

    valoresCol1 = []
    valoresCol2 = []


    //achando o priElemento do arrayOrdenado
    let priElemento = parseInt(arrayOrdenado.slice(0, 1))

    //achando o ultElemento do arrayOrdenado
    let ultElemento = parseInt(arrayOrdenado.slice(-1))

    //calc de Amplitude Total
    let AmpliTotal = ultElemento - priElemento

    //achando o index do 1º numero a ser pesquisado (1º maior que AmpliTotal)
    let indexInicial = arrayOrdenado.findIndex(elemento => elemento > AmpliTotal)

    //calc de qtd de Classes
    let qtdClasses = Math.sqrt(arrayOrdenado.length)

    //arredondando qtd de Classes e voltando para o numero anterior
    qtdClasses = Math.round(qtdClasses) - 1

    //calc de intervalo de Classe
    let intClasse = ''

    for (var i = indexInicial; i < arrayOrdenado.length; i++) {
        //Encontrando o intervalo de Classe: 
        let Ak = arrayOrdenado[i]
        parseFloat(Ak)
        intClasse = Ak / qtdClasses
        intClasse = parseFloat(intClasse)

        typeof (intClasse)

        //Se o intervalo de Classe for redondo, achamos o ideal
        if (intClasse == Math.round(intClasse)) {
            break
        }

        /*Se chegar ao final do array e não encontrar intervalo de Classe redondo,
        então acrescentamos +1 no qtdClasses e reiniciamos a busca*/
        if (i == arrayOrdenado.length - 1) {
            qtdClasses += 1
            const newLocal = indexInicial - 1
            i = newLocal
        }
    }

    let corpo = ''

    let numLinha = 0

    // lembre-se priElemento e ultElemento vem do arrayOrdenado
    for (let i = priElemento; i <= ultElemento; i += intClasse) {
        numLinha++

        if (i + intClasse >= ultElemento) {

            corpo += `<tr class='linha${numLinha}'>
                      <td class='col1_linha${numLinha}'>${i} |--- ${i + intClasse}</td>
                      <td class='calcFreq${numLinha}'>${qtdIndexEntre(arrayOrdenado, i, ultElemento) + 1}</td>
                      </tr>` // esse +1 serve para corrigir a falta

            valoresCol1.push(i)
            valoresCol1.push(i + intClasse)
            valoresCol2.push(qtdIndexEntre(arrayOrdenado, i, ultElemento) + 1)
            valoresCol2.push(0)
        } else {

            corpo += `<tr class='linha${numLinha}'>
                      <td class='col1_linha${numLinha}'>${i} |--- ${i + intClasse}</td>
                      <td class='calcFreq${numLinha}'>${qtdIndexEntre(arrayOrdenado, i, i + intClasse)}</td>
                      </tr>`

            valoresCol1.push(i)
            valoresCol1.push(i + intClasse)
            valoresCol2.push(qtdIndexEntre(arrayOrdenado, i, i + intClasse))
            valoresCol2.push(0)
        }
    }

    corpo += `<tr class='linhaTotal'>
                <td>Total:</td>
                <td class='totalFreq'>${totalCol2}</td>
                </tr>`

    // depois do for, o qtd de Classes (qtd de lihas da tabela)
    const qtdLinhas = qtdClasses

    return [corpo, qtdLinhas, valoresCol1, valoresCol2]
}

//abaixo gera colunas 1 e 2 (quali. nominal, ordinal, quanti. discreta)
function tabelaSimples(coluna1, coluna2, totalCol2) {
    let numLinha = 0

    const qtdLinhas = coluna1.length

    let corpo = ''

    for (let i = 0; i < qtdLinhas; i++) {
        numLinha++
        corpo += `<tr class='linha${numLinha}'>
                    <td class='col1_linha${numLinha}'>${coluna1[i]}</td>
                    <td class='calcFreq${numLinha}'>${coluna2[i]}</td>
                 </tr>`
    }

    corpo += `<tr class='linhaTotal'>
                <td>Total:</td>
                <td class='totalFreq'>${totalCol2}</td>
              </tr>`

    return [corpo, qtdLinhas]
}

// Col. 3 é de freq simples em porcentagem - %
function geraRestCol(qtdLinhas) {

    let linhaAtual = ''
    let vlCol3 = 0
    let vlCol4 = 0
    let vlCol5 = 0


    for (let i = 1; i <= qtdLinhas; i++) {
        linhaAtual = document.querySelector(`.linha${i}`)

        itensAtuais = linhaAtual.innerHTML

        vlFreq = document.querySelector(`.calcFreq${i}`)
        vlFreq = parseFloat(vlFreq.innerHTML)

        vlTotalFreq = document.querySelector(`.totalFreq`)
        vlTotalFreq = parseFloat(vlTotalFreq.innerHTML)

        // vlCol3 recebe o cálculo de Freq%
        vlCol3 = (vlFreq / vlTotalFreq) * 100
        vlCol3 = vlCol3.toFixed(2)

        // vlCol4 recebe o cálculo de calcFreqAcum
        vlCol4 += vlFreq

        // vlCol5 recebe o cálculo de calcFreqAcum
        vlCol3 = parseFloat(vlCol3) // convert valores para depois somar..
        vlCol5 = parseFloat(vlCol5)

        vlCol5 += vlCol3
        vlCol5 = vlCol5.toFixed(2)

        vlCol5 = parseFloat(vlCol5)


        let novosItens = itensAtuais +
            `<td class ='calcFreq%${i}'>${vlCol3}%</td>
        <td class ='calcFreqAcum${i}'>${vlCol4}</td>
        <td class ='calcFreqAcum%${i}'>${(vlCol5 > 100) ? vlCol5 = 100 : vlCol5 = vlCol5}%</td>
        `

        linhaAtual.innerHTML = novosItens
    }

    let finalTotal = document.querySelector('.linhaTotal')
    finalTotal.innerHTML += '<td>100%</td>'

}
