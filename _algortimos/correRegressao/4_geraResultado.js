//funcao que inicia o calc da correlacao
function correRegressao() {

	const tabAtiva = document.querySelector('a.active');
	let cor, reg

	// pegandocos valores do input de acordo com a tab
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


	const correRegResult = document.querySelector('#correRegResult')
	correRegResult.innerHTML = ''


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

// funcao para corrigir grafico
function corrigeGrafico() {
	// Inversão de parâmetros para que o gráfico fique no eixo certo
	const tabAtiva = document.querySelector('a.active');
	let cor
	let reg
	debugger

	// abaixo no switch, ocorre a troca de parametros, devido ao erro na troca do eixo x com y no gráfico
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
	geraGrafico(cor, reg, a, b)

	return vetval
}


// funcao que recalcula Eq. depois de corrigir gráfico
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

	correRegResult.innerHTML = ''


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



// --------------------------------FIM CORRELAÇÃO E REGRESSÃO --------------------------------------------------