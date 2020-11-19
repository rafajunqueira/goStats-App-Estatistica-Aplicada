
function geraGrafico(cor, reg, a = null, b = null) {

	var valX = cor.split(';')
	var valY = reg.split(';')
	

	var ctx = document.querySelector('.myChart')
	/* ctx.style */

	ctx.getContext('2d');
	Chart.defaults.global.defaultFontSize = 25;
	var dados = [];

	//Monta os pontos no grafico//
	for (var i = 0; i < cor.length; i++) {
		var dd = {
			x: valY[i],
			y: valX[i]
		}
		dados.push(dd)
	}


	var reta = [{ x: Math.min(...valY), y: (Math.min(...valY) - b) / a }, { x: Math.max(...valY), y: (Math.max(...valY) - b) / a }];


	var ctx = document.querySelector('.myChart')

	// variável auxiliar para excluir gráfico anteriormente usado
	let delGrafAnt

	if (delGrafAnt == 'sim') {
		chart.destroy()
	}

	
	new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				type: 'line',
				label: 'Reta Regressão',
				data: reta,
				fill: false,
				backgroundColor: "#18d26e",
				borderColor: "#18d26e",
				pointRadius: 3
			}, {
				type: 'bubble',
				label: 'Pontos',
				data: dados,
				backgroundColor: "rgba(76,78,80, .7)",
				borderColor: "transparent",
			}]
		},
		options: {
			legend: {
				labels: {
					fontSize: 12
				}
			},
			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom',
					ticks: {
						fontSize: 12
					}

				}],
				yAxes: [{
					type: 'linear',
					position: 'left',
					ticks: {
						fontSize: 12
					}
				}],

			}
		}
	});

	delGrafAnt = 'sim'
}