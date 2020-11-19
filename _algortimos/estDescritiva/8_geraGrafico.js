
// *******************GRÁFICOS CHART.JS***********************/



let geraCoresAleat = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};


function geraGraf(qtdLinhas) {

    let valoresCol1 = []
    let valoresCol2 = []
    let paletaCores = []

    let cache // o cache é um acumulador

    for (let i = 1; i <= qtdLinhas; i++) {
        // aqui selecionamos na coluna 1 linha i os valores:
        cache = document.querySelector(`.col1_linha${i}`).innerHTML
        valoresCol1.push(cache)

        // aqui selecionamos na coluna 2 linha i os valores:
        cache = document.querySelector(`.calcFreq${i}`).innerHTML
        cache = parseFloat(cache)
        valoresCol2.push(cache)

        // aqui geramos a quantidade de cores exata para o gráfico
        paletaCores.push(geraCoresAleat())

    }

    //*********************TIPO DE GRÁFICO ************************/
    let tipodegrafico
    let titulodegrafico
    let quantDados = valoresCol1.length
    let tipodados = qualTipo(valoresCol1)

    if ((quantDados >= 10) && (tipodados == "number")) {
        tipodegrafico = 'line' //grafico Quantitativa Continua
        titulodegrafico = 'Quantitativa Contínua'
    } else if ((quantDados < 10) && (tipodados == "number")) {
        tipodegrafico = 'bar' //grafico Quantitativa Discreta
        titulodegrafico = 'Quantitativa Discreta'
    } else if (tipodados == "string") {
        tipodegrafico = 'pie' //grafico Qualitativa Ordinal ou Nominal
        titulodegrafico = 'Qualitativa Ordinal ou Nominal'
    }


    // variável auxiliar para excluir gráfico anteriormente usado
    let delGrafAnt

    if (delGrafAnt === 'sim') {
        chart.destroy()
    }

    var ctx = document.querySelector('.myChart')

    let chart
    chart = ctx.getContext('2d') //Este comando diz que usaremos graficos 2d

    Chart.defaults.scale.ticks.beginAtZero = true; //Configuração para grafico de barras iniciar no zero

    chart = new Chart(ctx, {
        type: tipodegrafico,
        data: {
            labels: valoresCol1,
            datasets: [{
                label: '',
                backgroundColor: paletaCores,
                borderColor: ['white'],
                data: valoresCol2,
                steppedLine: true,
            }]
        },
        options: {

        }
    })

    delGrafAnt = 'sim'

}