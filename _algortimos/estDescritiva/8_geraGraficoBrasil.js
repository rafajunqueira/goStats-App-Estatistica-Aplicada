
// *******************GRÁFICOS CHART.JS***********************/


// variável auxiliar para excluir gráfico anteriormente usado
let delGrafAnt
let chart


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


    // switch excluir gráfico anteriormente usado
    switch (true) {
        case (delGrafAnt == true):
            chart.destroy()

        default:

            var ctx = document.querySelector('.myChart')

            chart = ctx.getContext('2d') //Este comando diz que usaremos graficos 2d

            Chart.defaults.scale.ticks.beginAtZero = true; //Configuração para grafico de barras iniciar no zero

            // Não exibe legendas do gráfico:
            Chart.defaults.global.legend.display = false;
            //Chart.defaults.global.tooltips.enabled = false;

            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: valoresCol2,
                    datasets: [{
                        label: '',
                        backgroundColor: paletaCores,
                        borderColor: ['white'],
                        data: valoresCol1,
                        steppedLine: true,
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: document.querySelector('#formularioDescritiva > div.tabelas > table > tbody > tr.linhaCabec > th:nth-child(1)').innerHTML
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Frequência Simples'
                            }
                        }]
                    }
                }
            })
    }
    delGrafAnt = true

}