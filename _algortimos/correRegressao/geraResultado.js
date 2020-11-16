function corelacao() {

	const tabAtiva = document.querySelector('a.active');
	let cor
	let reg

	switch (tabAtiva.id) {
		case 'manualTab':
			cor = document.getElementById('varXManual').value;
			reg = document.getElementById('varYManual').value;
			break;

		case 'importTab':
			cor = document.getElementById('varXImport').value;
			reg = document.getElementById('varYImport').value;
			break;
	}


	const corelacao_results = document.querySelector('#corelacao_results')
	corelacao_results.innerHTML = ''


	let vetCorrelacao = cor.toString().split(';');
	let vetregressao = reg.toString().split(';');

	let x = 0; let xy = 0; let y = 0; let xx = 0; let yy = 0; var vetval = [];
	let n = vetCorrelacao.length
	for (let i = 0; i < vetCorrelacao.length; i++) {
		x += Number(vetCorrelacao[i])
		y += Number(vetregressao[i])
		xy += Number(vetregressao[i] * vetCorrelacao[i])
		xx += Number(Math.pow(vetCorrelacao[i], 2))
		yy += Number(Math.pow(vetregressao[i], 2))
	}
	//-----------CORRELACAO--------------------------------------------------//
	let calcdividendo = (n * xy) - (x * y)
	let calcdivisor = (Math.sqrt((n * xx - (x * x))).toFixed(2) * Math.sqrt((n * yy - y * y)).toFixed(2)).toFixed(2)
	let r = parseFloat(((calcdividendo / calcdivisor) * 100)).toFixed(2)

	//----------- DETECTANDO O GRAU --------------------------------------------------//
	let grau
	let valor = r
	debugger
	if (valor < 30) {
		grau = "Fraca"
	} else if (valor === 30 || valor < 70) {
		grau = "Moderada"
	} else if (valor === 70 || valor < 100) {
		grau = "Forte"
	} else if (valor === 100) {
		grau = "Perfeita"
	}

	//----------REGRESSAO-----------------------------------------------------//
	var a = ((n * xy - x * y) / (n * xx - x * x))
	vetval.push(a)
	let regy = y / n
	let regx = x / n
	var b = (regy - a * regx)
	vetval.push(b)

	a = parseFloat(a.toFixed(2))
	b = parseFloat(b.toFixed(2))


	const correlacao = document.querySelector('#correlacao')
	const eqReta = document.querySelector('#eqReta');

	correlacao.innerHTML = `<div><b>Correlação: ${r} % [${grau}]</b><div>`

	eqReta.innerHTML = `
	<div><b>Equação da reta:</b><div>
	<input type="text" id="y_future" oninput="regressaoY()" placeholder="Y" style="width: 75px;border-radius: 7px;padding-left: 5px;">
	= ${a.toFixed(2)}
	<input type="text" id="x_future" oninput="regressaoX()" placeholder="X" style="width: 75px;border-radius: 7px;padding-left: 5px;">
+ (${b.toFixed(2)})`
	debugger
	corrigeGrafico()

	return vetval

}

function corrigeGrafico() {
	// Inversão de parâmetros para que o gráfico fique no eixo certo
	const tabAtiva = document.querySelector('a.active');
	let cor
	let reg
	debugger
	switch (tabAtiva.id) {
		case 'manualTab':
			reg = document.getElementById('varXManual').value;
			cor = document.getElementById('varYManual').value;
			break;

		case 'importTab':
			reg = document.getElementById('varXImport').value;
			cor = document.getElementById('varYImport').value;
			break;
	}


	debugger
	let vetCorrelacao = cor.toString().split(';');
	let vetregressao = reg.toString().split(';');

	let x = 0; let xy = 0; let y = 0; let xx = 0; let yy = 0; var vetval = [];
	let n = vetCorrelacao.length
	for (let i = 0; i < vetCorrelacao.length; i++) {
		x += Number(vetCorrelacao[i])
		y += Number(vetregressao[i])
		xy += Number(vetregressao[i] * vetCorrelacao[i])
		xx += Number(Math.pow(vetCorrelacao[i], 2))
		yy += Number(Math.pow(vetregressao[i], 2))
	}
	//-----------CORRELACAO--------------------------------------------------//
	let calcdividendo = (n * xy) - (x * y)
	let calcdivisor = (Math.sqrt((n * xx - (x * x))).toFixed(2) * Math.sqrt((n * yy - y * y)).toFixed(2)).toFixed(2)
	let r = parseFloat(((calcdividendo / calcdivisor) * 100)).toFixed(2)


	//----------REGRESSAO-----------------------------------------------------//
	var a = ((n * xy - x * y) / (n * xx - x * x))
	vetval.push(a)
	let regy = y / n
	let regx = x / n
	var b = (regy - a * regx)
	vetval.push(b)

	a = parseFloat(a.toFixed(2))
	b = parseFloat(b.toFixed(2))
	debugger
	graficocorelaco(cor, reg, a, b)

	return vetval
}

function recalculaEq() {

	const tabAtiva = document.querySelector('a.active');
	let cor
	let reg

	switch (tabAtiva.id) {
		case 'manualTab':
			cor = document.getElementById('varXManual').value;
			reg = document.getElementById('varYManual').value;
			break;

		case 'importTab':
			cor = document.getElementById('varXImport').value;
			reg = document.getElementById('varYImport').value;
			break;
	}

	corelacao_results.innerHTML = ''


	let vetCorrelacao = cor.toString().split(';');
	let vetregressao = reg.toString().split(';');

	let x = 0; let xy = 0; let y = 0; let xx = 0; let yy = 0; var vetval = [];
	let n = vetCorrelacao.length
	for (let i = 0; i < vetCorrelacao.length; i++) {
		x += Number(vetCorrelacao[i])
		y += Number(vetregressao[i])
		xy += Number(vetregressao[i] * vetCorrelacao[i])
		xx += Number(Math.pow(vetCorrelacao[i], 2))
		yy += Number(Math.pow(vetregressao[i], 2))
	}
	//-----------CORRELACAO--------------------------------------------------//
	let calcdividendo = (n * xy) - (x * y)
	let calcdivisor = (Math.sqrt((n * xx - (x * x))).toFixed(2) * Math.sqrt((n * yy - y * y)).toFixed(2)).toFixed(2)
	let r = parseFloat(((calcdividendo / calcdivisor) * 100)).toFixed(2)

	//----------- DETECTANDO O GRAU --------------------------------------------------//
	let grau
	let valor = r
	debugger
	if (valor < 30) {
		grau = "Fraca"
	} else if (valor === 30 || valor < 70) {
		grau = "Moderada"
	} else if (valor === 70 || valor < 100) {
		grau = "Forte"
	} else if (valor === 100) {
		grau = "Perfeita"
	}

	//----------REGRESSAO-----------------------------------------------------//
	var a = ((n * xy - x * y) / (n * xx - x * x))
	vetval.push(a)
	let regy = y / n
	let regx = x / n
	var b = (regy - a * regx)
	vetval.push(b)

	a = parseFloat(a.toFixed(2))
	b = parseFloat(b.toFixed(2))

	return vetval

}

function regressaoX(vetval) {
	let vet = recalculaEq(vetval)

	let a = (vet[0]).toFixed(4); let b = (vet[1]).toFixed(4)

	var x_future = document.getElementById('x_future').value;
	let future_y = (Number(a) * Number(x_future) + Number(b)).toFixed(2)


	document.getElementById('y_future').value = future_y;

}

function regressaoY(vetval) {
	let vet = recalculaEq(vetval)

	let a = (vet[0]).toFixed(4); let b = (vet[1]).toFixed(4)

	var y_future = document.getElementById('y_future').value;
	let future_x = ((Number(y_future) - Number(b)) / Number(a)).toFixed(2)


	document.getElementById('x_future').value = future_x;

}

function graficocorelaco(cor, reg, a = null, b = null) {

	var valX = cor.split(';')
	var valY = reg.split(';')
	debugger

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

	if (delGrafAnt === 'sim') {
		chart.destroy()
	}

	debugger
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



// --------------------------------FIM CORRELAÇÃO E REGRESSÃO --------------------------------------------------