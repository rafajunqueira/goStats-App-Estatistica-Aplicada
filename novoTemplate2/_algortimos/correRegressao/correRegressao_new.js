var TypeStatistic = document.getElementById('TypeStatistic')
document.getElementById('Change_aboutSystem').click
document.getElementById('Change_EstatDescritiva').style.display = "none"
document.getElementById('Change_Probabilidade').style.display = "none"
document.getElementById('Change_CorelaRegress').style.display = "none"
document.getElementById('Change_sobreNos').style.display = "none"

function Change(id) {
	switch (id) {
		case "btn_aboutSystem":
			document.getElementById('Change_aboutSystem').style.display = "block"
			document.getElementById('Change_EstatDescritiva').style.display = "none"
			document.getElementById('Change_Probabilidade').style.display = "none"
			document.getElementById('Change_CorelaRegress').style.display = "none"
			document.getElementById('Change_sobreNos').style.display = "none"
			break
		case "btn_probabilidade":
			document.getElementById('Change_aboutSystem').style.display = "none"
			document.getElementById('Change_EstatDescritiva').style.display = "none"
			document.getElementById('Change_Probabilidade').style.display = "block"
			document.getElementById('Change_CorelaRegress').style.display = "none"
			document.getElementById('Change_sobreNos').style.display = "none"
			break
		case "btn_CorreRegres":
			document.getElementById('Change_aboutSystem').style.display = "none"
			document.getElementById('Change_EstatDescritiva').style.display = "none"
			document.getElementById('Change_Probabilidade').style.display = "none"
			document.getElementById('Change_CorelaRegress').style.display = "block"
			document.getElementById('Change_sobreNos').style.display = "none"
			break
		case "btn_SobreNos":
			document.getElementById('Change_aboutSystem').style.display = "none"
			document.getElementById('Change_EstatDescritiva').style.display = "none"
			document.getElementById('Change_Probabilidade').style.display = "none"
			document.getElementById('Change_CorelaRegress').style.display = "none"
			document.getElementById('Change_sobreNos').style.display = "block"
			break
	}

}
function Function_Sair() {
	window.location.href = "index.html"
}

function ApagaTabelaeGrafico() {
	if (document.querySelector('tbody').innerHTML != "") {
		document.querySelector('tbody').innerHTML = ""
		document.getElementById('table_secundaria').innerHTML = ""
		$('#myChart').remove()
		$('.graficos').append('<canvas id="myChart" width="20" height="20"></canvas>')
	}
}

function Opcao(opt) {
	switch (opt) {
		case "quali_nominal":
			document.getElementById('TypeStatistic').innerHTML = "Qualitativa Nominal"
			document.getElementById("desc_type").value = "NOMINAL"
			document.getElementById('Change_aboutSystem').style.display = "none"
			document.getElementById('Change_EstatDescritiva').style.display = "block"
			document.getElementById('Change_Probabilidade').style.display = "none"
			document.getElementById('Change_CorelaRegress').style.display = "none"
			document.getElementById('Change_sobreNos').style.display = "none"
			ApagaDados()
			ApagaTabelaeGrafico()
			break;
		case "quali_ordinal":
			document.getElementById('TypeStatistic').innerHTML = "Qualitativa Ordinal"
			document.getElementById("desc_type").value = "ORDINAL"
			document.getElementById('Change_aboutSystem').style.display = "none"
			document.getElementById('Change_EstatDescritiva').style.display = "block"
			document.getElementById('Change_Probabilidade').style.display = "none"
			document.getElementById('Change_CorelaRegress').style.display = "none"
			document.getElementById('Change_sobreNos').style.display = "none"
			ApagaDados()
			ApagaTabelaeGrafico()

			break;
		case "quanti_discreta":
			document.getElementById('TypeStatistic').innerHTML = "Quantitativa Discreta"
			document.getElementById("desc_type").value = "DISCRETA"
			document.getElementById('Change_aboutSystem').style.display = "none"
			document.getElementById('Change_EstatDescritiva').style.display = "block"
			document.getElementById('Change_Probabilidade').style.display = "none"
			document.getElementById('Change_CorelaRegress').style.display = "none"
			document.getElementById('Change_sobreNos').style.display = "none"
			ApagaDados()
			ApagaTabelaeGrafico()
			break;
		case "quanti_continua":
			document.getElementById('TypeStatistic').innerHTML = "Quantitativa Continua"
			document.getElementById("desc_type").value = "CONTINUA"
			document.getElementById('Change_aboutSystem').style.display = "none"
			document.getElementById('Change_EstatDescritiva').style.display = "block"
			document.getElementById('Change_Probabilidade').style.display = "none"
			document.getElementById('Change_CorelaRegress').style.display = "none"
			document.getElementById('Change_sobreNos').style.display = "none"
			ApagaDados()
			ApagaTabelaeGrafico()
			break;
	}

}


// -------------Coletando dados da aba estatistica DESCRITIVA UPLOADS-------------------

// UPLOAD DESCRITIVA--------------
var input1 = document.querySelectorAll('input[type="file"]')[0]

input1.addEventListener('change', function (e) {
	var reader = new FileReader()
	reader.onload = function () {
		var lines = reader.result.split('\n').map(function (line) {
			return line.split(',')
		})
		lines.pop()
		var arr = ''
		for (let i = 0; i < lines.length; i++) {
			arr += lines[i]
			arr += ';'
		}

		Newarr = arr.substring(0, (arr.length - 1))
		document.getElementById('arr_dados').value = Newarr

	}

	reader.readAsText(input1.files[0])
}, true)

// UPLOAD CORRELAÇÃO--------------
var input = document.querySelectorAll('input[type="file"]')[1]

input.addEventListener('change', function (e) {
	var reader = new FileReader()
	reader.onload = function () {
		var lines = reader.result.split('\n').map(function (line) {
			return line.split(';')
		})

		lines.pop()
		var pacoteX = [], pacoteY = [];
		for (var i = 0; i < lines.length; i++) {
			if (lines[i][0] != '') {
				pacoteX.push(parseFloat(lines[i][0]))
				pacoteY.push(parseFloat(lines[i][1]))
			}

		}

		var pacX = ''
		var pacY = ''

		for (let i = 0; i < lines.length; i++) {
			pacX += pacoteX[i]
			pacX += ';'
			pacY += pacoteY[i]
			pacY += ';'
		}



		NewX = pacX.substring(0, (pacX.length - 1))
		NewY = pacY.substring(0, (pacY.length - 1))
		document.getElementById('varX').value = NewX
		document.getElementById('varY').value = NewY

	}

	reader.readAsText(input.files[0])
}, true)

// -------------Coletando dados da aba estatistica DESCRITIVA--------------------
function ColetaDados() {
	AmoOrPop = document.getElementsByName('opt')[0]
	arr = document.getElementById("arr_dados").value
	nomeVar = document.getElementById("nomeVariavel").value
	tipoDescritiva = document.getElementById("desc_type").value
	Table_principal = document.getElementById("table_Principal")
	arrDados = arr.split(';')
	ApagaTabelaeGrafico()
}


// ------------------Apagando os dados-------------------------------------------
function ApagaDados() {
	document.getElementById('arr_dados').value = ''
	document.getElementById('nomeVariavel').value = ''
	document.getElementById('arr_dados').focus()
	document.getElementById('valorSeparatriz').value = ''
}


// ------------------Função do Botão Entrada de Dados-------------------------------------------
function DescButton() {

	ColetaDados()

	if (tipoDescritiva == "NOMINAL") {
		qualitativaNominal()
	} else if (tipoDescritiva == "ORDINAL") {
		qualitativaOrdinal()
	} else if (tipoDescritiva == "DISCRETA") {
		quantitativaDiscreta()
	} else {
		quantitativaContinua()
	}

	document.getElementById('change_name').innerHTML = nomeVar.toUpperCase()

}

// ------------------Ordenando o array em ordem númerica ou alfabeto------------------------------------------
function Ordena_array(Dados) {
	// Colocando os dados em um array usando QUICKSORT
	if (Dados.length <= 1) {
		return Dados
	} else {
		var left = []
		var right = []
		var newArray = []
		var pivot = Dados.pop()
		var length = Dados.length

		for (var i = 0; i < length; i++) {
			if (Dados[i] <= pivot) {
				left.push(Dados[i])
			} else {
				right.push(Dados[i])
			}
		}
		return newArray.concat(Ordena_array(left), pivot, Ordena_array(right))
	}
}


// function Ordena_array(Dados){
// 	// Colocando os dados em um array
// 	var data = Dados.split(';')

// 	if(isNaN(data[0] / data[1])){
// 		data.sort()
// 	}else{
// 		data.sort((a,b) => a-b)

// 	}
// 		return data
// }

// ------------------Criando as colunas da Tabela-------------------------------------------
function CreateColums(table_id, arr, tipoDescritiva) {

	//Colocando os dados na chave e retornando a quantidade de cada elemento no indice 
	var quantDados = {};
	var acum = 0;
	for (let i = 0; i < arr.length; i++) {
		if (quantDados[arr[i]]) {
			quantDados[arr[i]] += 1
			acum++
		} else {
			quantDados[arr[i]] = 1
			acum++
		}
	}

	//Coluna Variavel
	var Variavel = []

	//Coluna FI 
	var FI = Object.values(quantDados)

	//Coluna FR
	var FR = []

	//Coluna FAC
	var FAC = []

	//Coluna FAC%
	var FACpc = []

	var facDiscreta = 0

	var acumFacDiscreta = 0

	var facTotPorcDisc = 0

	var facPorc = 0

	var totMedia = 0

	var qtdRepeticoes = 0

	var moda = []

	var vetFac = []

	var indiceDiscreta = []

	var porcFreqDiscreta = []

	var fiVarianca = []
	// Colocando o que o usuário digitou em um array
	for (var chave in quantDados) {
		facDiscreta += quantDados[chave]

		facPorc = Math.round((quantDados[chave] / acum) * 100)

		facTotPorcDisc = facPorc + acumFacDiscreta

		//Calcula a média do indice
		var media = chave * quantDados[chave]

		totMedia += media

		//Adiciona o fac% no vetor
		vetFac.push(facTotPorcDisc)

		fiVarianca.push(quantDados[chave])

		facTotPorcDisc = facPorc + acumFacDiscreta

		acumFacDiscreta += facPorc

		FAC.push(facDiscreta)

		FACpc.push(facTotPorcDisc)

		Variavel.push(chave)

		//Adiciona o indice ao vetor
		indiceDiscreta.push(chave)

		porcFreqDiscreta.push(Math.round((quantDados[chave] / acum) * 100))

		// estrutura de seleção para descobrir se o índice atual é maior ou igual ao do vetor
		if (qtdRepeticoes == quantDados[chave]) {
			// Se for igual o adicionamos no vetor
			qtdRepeticoes = quantDados[chave]
			moda.push(chave)
		} else if (qtdRepeticoes < quantDados[chave]) {
			// Senao excluímos o valor no vetor e adicionamos o novo valor
			qtdRepeticoes = quantDados[chave]
			moda.pop()

			moda.push(chave)
		}

		calculos_second_table(acum, valorSeparatriz, vetFac, arr, indiceDiscreta, media, totMedia, moda, fiVarianca, facDiscreta)


	}


	MountTable(Variavel, FI, FR, FAC, FACpc, acum, table_id, tipoDescritiva)

}


function calculos_second_table(acum, valorSeparatriz, vetFac, arr, indiceDiscreta, media, totMedia, moda, fiVarianca, facDiscreta) {

	ColetaDados()
	//----------------Calculando Medida Separatriz-------------------------------------

	// pega o valor da medida separatriz 
	valorSeparatriz = Number(document.getElementById('valorSeparatriz').value);

	// pega qual medida separatriz será consultada
	value_select = document.getElementById('value_select').value

	var travaPosicao = 0

	var porcentagem = (acum / 100)

	var MedidaSeparatriz

	if (tipoDescritiva == 'DISCRETA') {
		switch (value_select) {

			// Medida Separatriz: Quartil de 25% em 25%
			case "1":
				var posicao = (25 * valorSeparatriz)
				if (posicao == 100) {
					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {
						if (posicao <= vetFac[i] && travaPosicao == 0) {

							MedidaSeparatriz = indiceDiscreta[i]

							travaPosicao++
						}
					}
				}
				break

			//Medida Separatriz: Decil de 10% em 10%
			case "2":
				var posicao = (10 * (valorSeparatriz))
				if (posicao == 100) {
					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {
						if (posicao <= vetFac[i] && travaPosicao == 0) {
							MedidaSeparatriz = indiceDiscreta[i]
							travaPosicao++
						}
					}
				}

				break
			//Medida separatriz: Quintil de 20% em 20%
			case "3":
				var posicao = ((20 * valorSeparatriz))
				if (posicao == 100) {
					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {
						if (posicao <= vetFac[i] && travaPosicao == 0) {
							MedidaSeparatriz = indiceDiscreta[i]
							travaPosicao++
						}
					}
				}

				break
			// Medida separatriz: Percentil
			case "4":
				var posicao = (valorSeparatriz)
				if (posicao == 100) {

					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {
						if (posicao <= vetFac[i] && travaPosicao == 0) {
							MedidaSeparatriz = indiceDiscreta[i]
							travaPosicao++
						}
					}
				}
				break
		}

		//---------- Calculando Moda, Média e Mediana --------------------------

		var mediana = 0
		if (acum % 2 == 0) {
			var pos = acum / 2

			mediana += Number(arr[pos + 1])

			mediana += Number(arr[pos])

			mediana = mediana / 2

		} else {
			var pos = Math.round(acum / 2)
			mediana += Number(arr[pos])

		}
		var media = (totMedia / acum).toFixed(1)


		var totVarianca = 0

		for (var i = 0; i < indiceDiscreta.length; i++) {
			var calc = Math.pow((indiceDiscreta[i] - media), 2).toFixed(2)
			var calc2 = Number(calc * fiVarianca[i])
			totVarianca += calc2
		}

		if (AmoOrPop.checked) { facDiscreta-- }

		var desvioPadrao = totVarianca / facDiscreta
		desvioPadrao = Math.sqrt(desvioPadrao).toFixed(2)
		var coeficienteVariacao = Number((desvioPadrao / media) * 100).toFixed(2)

		MountTableMetricaDesc(MedidaSeparatriz, media, mediana, moda, desvioPadrao, coeficienteVariacao)

	} else if (tipoDescritiva == 'NOMINAL' || tipoDescritiva == 'ORDINAL') {
		switch (value_select) {
			// Medida Separatriz: Quartil de 25% em 25%
			case "1":
				var posicao = (25 * valorSeparatriz)

				if (posicao == 100) {
					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {

						if (posicao <= vetFac[i] && travaPosicao == 0) {

							MedidaSeparatriz = indiceDiscreta[i]

							travaPosicao++
						}
					}
				}
				break

			//Medida Separatriz: Decil de 10% em 10%
			case "2":

				var posicao = (10 * valorSeparatriz)
				if (posicao == 100) {

					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {


						if (posicao <= vetFac[i] && travaPosicao == 0) {
							MedidaSeparatriz = indiceDiscreta[i]
							travaPosicao++
						}
					}
				}
				break
			//Medida separatriz: Quintil de 20% em 20%
			case "3":
				var posicao = (20 * valorSeparatriz)

				if (posicao == 100) {

					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {

						if (posicao <= vetFac[i] && travaPosicao == 0) {
							MedidaSeparatriz = indiceDiscreta[i]
							travaPosicao++
						}
					}
				}
				break
			// Medida separatriz: Percentil
			case "4":
				var posicao = valorSeparatriz

				if (posicao == 100) {

					let pos = indiceDiscreta.length - 1
					MedidaSeparatriz = indiceDiscreta[pos]
				} else {
					for (var i = 0; i < vetFac.length; i++) {

						if (posicao <= vetFac[i] && travaPosicao == 0) {
							MedidaSeparatriz = indiceDiscreta[i]
							travaPosicao++
						}
					}
				}
				break
		}

		//Calculo da Moda Media e Mediana

		var posicao = []
		var mediana2 = ""
		var moda2 = ""

		//Caso o valor inserido seja par
		if (acum % 2 == 0) {
			let pos = acum / 2
			posicao.push(arr[pos - 1])
			posicao.push(arr[pos])
		} else {
			//Caso o valor inserido seja ímpar
			let pos = Math.round(acum / 2)
			posicao.push(arr[pos])
		}

		for (let i = 0; i < posicao.length; i++) {
			mediana2 += posicao[i]
		}
		for (let i = 0; i < moda.length; i++) {
			moda2 += moda[i]
		}

		MountTableMetricaDesc(MedidaSeparatriz, media, mediana2, moda2)

	}

}

// ------------------ Montando as tabelas -------------------------------------------
function MountTable(Variavel, FI, FR, FAC, FACpc, acum, table_id, tipoDescritiva) {

	//Montando a tabela
	for (let i = 0; i < Variavel.length; i++) {
		var tr = document.createElement('tr')
		var col_variavel = document.createElement('td')
		col_variavel.append(Variavel[i])
		var col_fi = document.createElement('td')
		col_fi.append(FI[i])
		var col_fr = document.createElement('td')
		FR[i] = Math.round((FI[i] / acum) * 100)
		col_fr.append(FR[i])
		var col_fac = document.createElement('td')
		col_fac.append(FAC[i])
		var col_facPC = document.createElement('td')
		col_facPC.append(FACpc[i])
		tr.appendChild(col_variavel)
		tr.appendChild(col_fi)
		tr.appendChild(col_fr)
		tr.appendChild(col_fac)
		tr.appendChild(col_facPC)
		table_id.appendChild(tr)

	}
	mountChart(Variavel, FR, tipoDescritiva)
}

function MountTableMetricaDesc(MedidaSeparatriz, media, mediana, moda, desvioPadrao, coeficienteVariacao) {
	ColetaDados()
	var tabela = ""
	document.getElementById('table_secundaria').innerHTML = ''

	if (tipoDescritiva == 'NOMINAL' || tipoDescritiva == 'ORDINAL') {
		tabela += '<thead>'
		tabela += '<th>Moda</th>'
		tabela += '<th>' + moda + '</th>'
		tabela += '<th>Mediana</th>'
		tabela += '<th>' + mediana + '</th>'
		tabela += '<th>Medida Separatriz</th>'
		tabela += '<th>' + MedidaSeparatriz + '</th>'
		tabela += '<thead>'

	} else if (tipoDescritiva == 'DISCRETA') {
		tabela += '<thead>';
		tabela += '<tr>';
		tabela += '<th>Moda</th>';
		tabela += '<th>' + moda + '</th>';
		tabela += '<th>Mediana</th>';
		tabela += '<th>' + mediana + '</th>';
		tabela += '<th>Média</th>';
		tabela += '<th>' + media + '</th>';

		tabela += '<tr>';
		tabela += '<th>Medida Separatriz</th>';
		tabela += '<th>' + MedidaSeparatriz + '</th>';
		tabela += '<th>Desvio Padrão</th>';
		tabela += '<th>' + desvioPadrao + '</th>';
		tabela += '<th>Coeficiente Variação</th>';
		tabela += '<th>' + coeficienteVariacao + '</th>';

		tabela += '</tr>';
		tabela += '</thead>';
	} else {
		tabela += '<thead>';
		tabela += '<tr>';
		tabela += '<th>Moda</th>';
		tabela += '<th>' + moda + '</th>';
		tabela += '<th>Mediana</th>';
		tabela += '<th>' + mediana + '</th>';
		tabela += '<th>Média</th>';
		tabela += '<th>' + media + '</th>';

		tabela += '<tr>';
		tabela += '<th>Medida Separatriz</th>';
		tabela += '<th>' + MedidaSeparatriz + '</th>';
		tabela += '<th>Desvio Padrão</th>';
		tabela += '<th>' + desvioPadrao + '</th>';
		tabela += '<th>Coeficiente Variação</th>';
		tabela += '<th>' + coeficienteVariacao + '</th>';

		tabela += '</tr>';
		tabela += '</thead>';
	}


	document.getElementById('table_secundaria').innerHTML += tabela
}


//------------------- Montando o gráfico --------------------------------------------


function mountChart(col_variavel, col_fr, tipoDescritiva) {
	var type_chart = ""
	if (tipoDescritiva == "NOMINAL" || tipoDescritiva == "ORDINAL") {
		type_chart = "pie"
	} else if (tipoDescritiva == "DISCRETA") {
		type_chart = "bar"
	}

	var color = []
	for (let i = 0; i < col_variavel.length; i++) {
		let r = Math.floor(Math.random() * 255),
			g = Math.floor(Math.random() * 255),
			b = Math.floor(Math.random() * 255);
		color.push(`rgb(${r},${g},${b})`)
	}

	var NOME_VARIAVEL = nomeVar //Nome da VARIAVEL (TABELO/GRAFICO
	var VARIAVEL = col_variavel // Dados que o usuário digitou
	var DADOS = col_fr // FI%
	var COR = color //geração de cores 
	var ctx = document.getElementById('myChart').getContext('2d');
	Chart.defaults.global.defaultFontSize = 20;
	var myChart = new Chart(ctx, {
		type: type_chart,
		data: {
			labels: VARIAVEL, // Dados que o usuário digitou
			datasets: [{
				label: NOME_VARIAVEL,  //Nome da VARIAVEL (TABELO/GRAFICO
				data: DADOS, // FI%
				backgroundColor: COR,
				borderWidth: 1
			}]
		},
		options: {
			animation: {
				duration: 3500,

			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}


// ---------------------------------- Qualitativa Nominal e Ordinal ------------------------------------
function qualitativaNominal() {
	ColetaDados()
	let arr_Nominal = Ordena_array(arrDados)
	CreateColums(Table_principal, arr_Nominal, tipoDescritiva, valorSeparatriz)

}

function qualitativaOrdinal() {
	// A ordem na tabela será na ordem que o usuário digitou os dados
	ColetaDados()

	CreateColums(Table_principal, arrDados, tipoDescritiva, valorSeparatriz)
}


// --------------------------------FIM Qualitativa -----------------------------------------------------

// ---------------------------------- Quantitativa Discreta e Continua ------------------------------------

function quantitativaDiscreta() {
	ColetaDados()
	let arr_Discreta = Ordena_array(arrDados)
	CreateColums(Table_principal, arr_Discreta, tipoDescritiva, valorSeparatriz)
}

function quantitativaContinua() {
	ColetaDados()

	let arr_Continua = arrDados.sort((a, b) => a - b)

	var n = arr_Continua.length;

	var xmin = arr_Continua[0];

	var xmax = arr_Continua[n - 1];

	var k = Math.sqrt(n);

	k = Math.round(k)

	var quantDados = {};

	var acum = 0;

	for (let i = 0; i < arr_Continua.length; i++) {
		if (quantDados[arr_Continua[i]]) {
			quantDados[arr_Continua[i]] += 1
			acum++
		} else {
			quantDados[arr_Continua[i]] = 1
			acum++
		}
	}

	var medianaPosicao = Math.round(acum / 2)
	var pos = arr_Continua[medianaPosicao - 1]


	var pos1 = pos 

	// teste = 1;2;3;10;30;70;100;500;600;739;815;937;1000

	//calculo feito para descobrir a amplitude
	var alt = xmax - xmin
	var ic = 0
	//calculo feito para descobir quantos elementos pular ic=alt/k 
	// while (alt % k != 0) {
	// 	alt++
	// }
	alt+=3
	ic = Math.floor(alt / (k - 1))
	console.log('MedianaPOS:',medianaPosicao,'|Posição:',pos,'|ic:',ic)
	var valorInicial = Number(xmin);

	var indiceContinua = [];

	var porcFreqContinua = [];

	var factotPorcContinua = 0;

	var acumFacContinua = 0;

	var facContinua = 0;

	var xi = 0

	var YesorNot = 0

	var moda = []

	var valMaior = -1

	var pontoMedio = 0

	var xiVarianca = []

	var fiVarianca = []


	//-------------------------- GERANDO TABELA --------------------------------------------->

	while (valorInicial <= xmax) {

		var valorFinal = 0

		let cont = 0

		valorFinal = Number(valorInicial + ic)

		if (valorFinal > xmax) {
			valorFinal = Number(xmax) + 2
		}


		for (let i = 0; i < arr_Continua.length; i++) {
			if (arr_Continua[i] >= valorInicial & arr_Continua[i] <= valorFinal -1) {
				cont++
				if (arr_Continua[i] == arr_Continua[medianaPosicao]) {
					if(acum % 2 == 0){
					var limiteInferior = valorInicial
					var facAnterior = facContinua
					var limiteInferior1 = valorInicial
					var facAnterior1 = facContinua
					YesorNot = 2
				} else {
					YesorNot = 1
					var limiteInferior = valorInicial
					var facAnterior = facContinua
				}
			}
		}
		}
		if (YesorNot == 1) {
			var frSimples = cont
			YesorNot = 0
		} else if (YesorNot == 2) {
			var frSimples = cont
			var frSimples1 = cont
			YesorNot = 0
		}

		var mediana = limiteInferior + ((medianaPosicao - facAnterior) / frSimples) * ic.toFixed(3)
		var mediana1 = limiteInferior1 + ((medianaPosicao + 1 - facAnterior1) / frSimples1) * ic.toFixed(3)
		console.log( limiteInferior,medianaPosicao,facAnterior,frSimples,ic)	
		console.log(mediana, mediana1)
		let facPorc = Math.round((cont / acum) * 100)

		factotPorcContinua = facPorc + acumFacContinua

		pontoMedio = (valorInicial + valorFinal) / 2

		// ------------------------------- CRIANDO A PRIMEIRA TABELA ---------------------------------------------------------

		var first_table = ""
		first_table += "<tr>"
		first_table += `<td>${valorInicial} |--------${valorFinal}</td>`
		first_table += "<td>" + cont + "</td>"
		first_table += "<td>" + Math.round((cont / acum) * 100) + "</td>"
		first_table += "<td>" + facContinua + "</td>"
		first_table += "<td>" + factotPorcContinua + "</td>"
		first_table += "</tr>"
		Table_principal.innerHTML += first_table

		// ---------------------------------- FIM DA TABELA ------------------------------------------------------------------

		valorSeparatriz = Number(document.getElementById('valorSeparatriz').value);
		value_select = document.getElementById('value_select').value


		var xi1 = ((valorInicial + valorFinal) / 2) * cont
		xiVarianca.push(pontoMedio)
		fiVarianca.push(cont)
		xi += xi1

		if (valMaior == cont) {
			moda.push(pontoMedio)
		} else if (valMaior < cont) {
			valMaior = cont
			while (moda.length) {
				moda.pop()
			}
			moda.push(pontoMedio)
		}

		var travaPosicao = 0

		var posicao = acum / 4

		if (value_select == 1 && travaPosicao == 0) {

			switch (valorSeparatriz) {
				case 1:

					if (posicao >= facContinua && travaPosicao == 0) {
						var MedidaSeparatriz = valorInicial + ((posicao - facContinua) / cont) * ic
						travaPosicao++
					}
					break;

				case 2:
					var MedidaSeparatriz = mediana
					travaPosicao++
					break;

				case 3:
					posicao = posicao * 3
					if (posicao >= facContinua && travaPosicao == 0) {
						var MedidaSeparatriz = valorInicial + ((posicao - facContinua) / cont) * ic
						travaPosicao++
					}
					break;

				case 4:
					posicao = posicao * 4
					if (posicao >= facContinua && travaPosicao == 0) {
						var MedidaSeparatriz = valorInicial + ((posicao - facContinua) / cont) * ic
						travaPosicao++
					}
					break

			}

		}

		var posicaoDecil = Math.round(acum / 10)

		if (value_select == 2) {
			var posicao = posicaoDecil * valorSeparatriz

			if (posicao >= facContinua && travaPosicao == 0) {
				var calcDecil = valorInicial + ((posicao - facContinua) / cont) * ic
				travaPosicao++
				var MedidaSeparatriz = calcDecil
			}
		}

		var posicaoQuintil = Math.round(acum / 5)
		if (value_select == 3) {
			var posicao = posicaoQuintil * valorSeparatriz

			if (posicao >= facContinua && travaPosicao == 0) {
				var calcQuintil = valorInicial + ((posicao - facContinua) / cont) * ic
				travaPosicao++
				var MedidaSeparatriz = calcQuintil
			}
		}

		var posicaoPorcentil = acum / 100
		if (value_select == 4) {
			var posicao = posicaoPorcentil * valorSeparatriz

			if (posicao >= facContinua && travaPosicao == 0) {
				var calcPorcentil = valorInicial + ((posicao - facContinua) / cont) * ic
				travaPosicao++
				var MedidaSeparatriz = calcPorcentil
			}
		}


		facContinua += cont

		acumFacContinua += facPorc

		let indice = `${valorInicial} --- ${valorFinal}`
		//Adiciona o indice ao vetor 
		indiceContinua.push(indice)

		//Adiciona a porcentagem ao vetor
		porcFreqContinua.push(Math.round((cont / acum) * 100))

		var valorInicial = valorFinal

	}

	var totVarianca = 0

	var media = (xi / facContinua).toFixed(1)

	var stop = 0

	for (let i = 0; i < xiVarianca.length; i++) {
		let calc = Math.pow((xiVarianca[i] - Number(media)), 2).toFixed(2)

		let calc2 = Number(calc * fiVarianca[i])

		totVarianca += calc2
	}

	if (AmoOrPop.checked) { acumFacContinua-- }

	var desvioPadrao = totVarianca / facContinua
	desvioPadrao = Math.sqrt(desvioPadrao).toFixed(2)
	var coeficienteVariacao = Number((desvioPadrao / media) * 100).toFixed(2)



	//------------------- CRIANDO A SEGUNDA TABELA -----------------------------------------

	var tabela = ""
	tabela += '<thead>';
	tabela += '<tr>';
	tabela += '<th>Moda</th>';
	tabela += '<th>' + moda + '</th>';
	tabela += '<th>Mediana</th>';
	tabela += '<th>' + mediana + '</th>';
	tabela += '<th>Média</th>';
	tabela += '<th>' + media + '</th>';

	tabela += '<tr>';
	tabela += '<th>Medida Separatriz</th>';
	tabela += '<th>' + MedidaSeparatriz + '</th>';
	tabela += '<th>Desvio Padrão</th>';
	tabela += '<th>' + desvioPadrao + '</th>';
	tabela += '<th>Coeficiente Variação</th>';
	tabela += '<th>' + coeficienteVariacao + '</th>';

	tabela += '</tr>';
	tabela += '</thead>';


	document.getElementById('table_secundaria').innerHTML += tabela



	//-------------------------- GERANDO GRAFICO --------------------------------------------->
	var color = []
	for (let i = 0; i < indiceContinua.length; i++) {
		let r = Math.floor(Math.random() * 255),
			g = Math.floor(Math.random() * 255),
			b = Math.floor(Math.random() * 255);
		color.push(`rgb(${r},${g},${b})`)
	}

	// gera as cores do grafico
	var COR = color

	//Nome da VARIAVEL (TABELO/GRAFICO
	var NOME_VARIAVEL = nomeVar

	// Dados que o usuário digitou
	var VARIAVEL = indiceContinua

	// FI% 
	var DADOS = porcFreqContinua

	var ctx = document.getElementById('myChart').getContext('2d');
	Chart.defaults.global.defaultFontSize = 20;
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: VARIAVEL,
			datasets: [{
				fontSize: 200,
				label: NOME_VARIAVEL,
				data: DADOS,
				backgroundColor: COR,
				borderWidth: 1
			}]
		},
		options: {
			animation: {
				duration: 3500,

			},
			scales: {
				xAxes: [{
					display: false,
					barPercentage: 1.3,
					ticks: {
						// fontSize: 20,
						max: 3

					}
				}],
				yAxes: [{
					ticks: {
						// fontSize: 20,
						beginAtZero: true
					}
				}]
			}
		}
	});
}
// --------------------------------FIM Quantitativa -----------------------------------------------------




// --------------------------------ÍNICIO PROBABILIDADES -----------------------------------------------------


//---------------------- BINOMIAL --------------------------
function analiseCombinatoria(valor) {
	// para valores negativos
	if (valor < 0) {

		return 'Valor deve ser maior ou igual a zero';

		// para valor = 0  ou igual a 1
	} else if ((valor == 0) || (valor == 1)) {

		return 1;

	} else {

		var acumula = 1;
		for (x = valor; x > 1; x--) {
			acumula = acumula * x;
		}
		return acumula;
	}
}


function calc_binomial(n) {
	//Coletando Dados;
	var binomial_table = document.getElementById('table_Binomial')

	var n = document.getElementById('binomial_N').value;
	let p = document.getElementById('binomial_P').value;
	let q = document.getElementById("binomial_Q").value;
	let k1 = document.getElementById('binomial_K').value;
	var k = k1.toString().split(';');
	let calc;
	let vetCalc = []
	// let probabilidade = 0
	let vetProbabilidade = []
	let totProbabilidade = 0
	for (let i = 0; i < k.length; i++) {
		calc = (analiseCombinatoria(n) / (analiseCombinatoria(k[i]) * analiseCombinatoria(n - k[i]))).toFixed(2);
		vetCalc.push(parseFloat(calc));

	}
	// Calculando e somando as probabilidades dos múltiplos resultados
	for (let i = 0; i < k.length; i++) {
		console.log(vetCalc[i], p, q, n, k)
		var probabilidade = ((vetCalc[i] * (p ** k[i]) * (q ** (n - k[i]))) * 100);
		console.log(probabilidade, '|', vetProbabilidade)
		vetProbabilidade.push(parseFloat(probabilidade));
	}
	for (let i = 0; i < vetProbabilidade.length; i++) {
		totProbabilidade += vetProbabilidade[i];
	}

	// Calculando Média
	let media = n * p;
	// Calculando Desvio Padrão
	let desvioPadrao = Math.sqrt((n * p * q)).toFixed(2);
	// Calculando CV
	let cv = ((desvioPadrao / media) * 100).toFixed(2);
	//montando array com os resultados
	var result_binomial = []
	//média
	result_binomial[0] = media
	//probabilidade
	result_binomial[1] = totProbabilidade
	//desvio padrão
	result_binomial[2] = desvioPadrao
	//coeficiente variação
	result_binomial[3] = cv
	//tabela
	result_binomial[4] = binomial_table

	//Montando a tabela
	table_probabilidade(result_binomial)
}


// ----------------------------- NORMAL -------------------------------------------------------------------
function selectNormal() {
	selected_Entre_Normal.innerHTML = ''
	let valueNormal = document.getElementById('inputGroupSelect02').value;
	if (valueNormal == 2) {
		document.getElementById("normal_qtd").value = "";
		selected_Entre_Normal.innerHTML += `<div class="row">
		<div class="col-md-1"></div>
		<div class="col-md-5">
		  <form class="form-inline">
			<div class="input-group">
			  <div class="input-group-prepend">
				<span class="input-group-text" id="basic-addon1">De</span>
			  </div>
			  <input type="text" class="form-control" placeholder="DE" aria-label="Username" aria-describedby="basic-addon1" id="normal_de">
			</div>
		  </form>
		</div>
		<div class="col-md-5">
		  <form class="form-inline">
			<div class="input-group">
			  <div class="input-group-prepend">
				<span class="input-group-text" id="basic-addon1">Ate</span>
			  </div>
			  <input type="text" class="form-control" placeholder="Ate" aria-label="Username" aria-describedby="basic-addon1" id="normal_ate">
			</div>
		  </form>
		</div>
	  </div>`
	}
}

function calc_normal() {
	/*
		SELECT
		"1" -> Maior Que
		"2" -> Entre
		"3" -> Menor Que
	*/

	var normal_table = document.getElementById('table_Normal')
	let quantidade = document.getElementById("normal_qtd").value;
	let media = document.getElementById('normal_media').value;
	let desvio = document.getElementById('normal_desvio').value;
	let value = document.getElementById('inputGroupSelect02').value;

	let tabelaDistribuicao = [];
	tabelaDistribuicao[0] = [0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359];
	tabelaDistribuicao[1] = [0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753];
	tabelaDistribuicao[2] = [0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141];
	tabelaDistribuicao[3] = [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517];
	tabelaDistribuicao[4] = [0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879];
	tabelaDistribuicao[5] = [0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224];
	tabelaDistribuicao[6] = [0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549];
	tabelaDistribuicao[7] = [0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852];
	tabelaDistribuicao[8] = [0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133];
	tabelaDistribuicao[9] = [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389];
	tabelaDistribuicao[10] = [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621];
	tabelaDistribuicao[11] = [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830];
	tabelaDistribuicao[12] = [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015];
	tabelaDistribuicao[13] = [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177];
	tabelaDistribuicao[14] = [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319];
	tabelaDistribuicao[15] = [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441];
	tabelaDistribuicao[16] = [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545];
	tabelaDistribuicao[17] = [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633];
	tabelaDistribuicao[18] = [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706];
	tabelaDistribuicao[19] = [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767];
	tabelaDistribuicao[20] = [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817];
	tabelaDistribuicao[21] = [0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857];
	tabelaDistribuicao[22] = [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890];
	tabelaDistribuicao[23] = [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916];
	tabelaDistribuicao[24] = [0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936];
	tabelaDistribuicao[25] = [0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952];
	tabelaDistribuicao[26] = [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964];
	tabelaDistribuicao[27] = [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974];
	tabelaDistribuicao[28] = [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981];
	tabelaDistribuicao[29] = [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986];
	tabelaDistribuicao[30] = [0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990];
	tabelaDistribuicao[31] = [0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993];
	tabelaDistribuicao[32] = [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995];
	tabelaDistribuicao[33] = [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997];
	tabelaDistribuicao[34] = [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998];
	tabelaDistribuicao[35] = [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998];
	tabelaDistribuicao[36] = [0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999];
	tabelaDistribuicao[37] = [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999];
	tabelaDistribuicao[38] = [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999];
	tabelaDistribuicao[39] = [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000];
	var result_normal = []


	if (value == 0 || value == 1) {
		let scoreZ = ((quantidade - media) / desvio)
		let x = (scoreZ * 10).toFixed(0)
		let corretor = (scoreZ * 10)
		console.log(scoreZ, '|', x, '|', corretor)
		if (scoreZ < 0) scoreZ *= -1;
		if (corretor < 0) corretor *= -1
		if (x < 0) x *= -1
		if (x > corretor) x--

		for (let i = 0; i <= tabelaDistribuicao[x].length; i++) {
			// console.log(tabelaDistribuicao[x])
			console.log((scoreZ * 100), (scoreZ * 100).toFixed(0))
			let score = scoreZ * 100
			let y = 0
			if (score < 10) {
				y = score.toFixed(0)

				if (y > score) y--

			} else {
				y = score - (x * 10)
			}

			if (i == y) {

				var prob = tabelaDistribuicao[x][i]
				console.log(tabelaDistribuicao[x][i])
				prob = ((0.5 - prob) * 100).toFixed(2)
				console.log(y, '|', prob)
			}
		}

		result_normal[1] = prob
	} else {

		let de = document.getElementById('normal_de').value;
		let ate = document.getElementById('normal_ate').value;

		let scoreZ1 = ((de - media) / desvio).toFixed(2)
		let scoreZ2 = ((ate - media) / desvio).toFixed(2)

		if (scoreZ1 < 0) scoreZ1 *= -1
		if (scoreZ2 < 0) scoreZ2 *= -1

		let x1 = Math.floor(scoreZ1 * 10)
		let corretor2 = scoreZ2 * 10
		let corretor1 = scoreZ1 * 10
		if (x1 > corretor1) { x1 = x1 - 1 }
		let x2 = Math.floor(scoreZ2 * 10)
		if (x2 > corretor2) { x2 = x2 - 1 }

		for (let i = 0; i <= tabelaDistribuicao[x1].length; i++) {
			let y = (scoreZ1 * 100) - (x1 * 10)
			if (i == y) {
				var prob1 = tabelaDistribuicao[x1][i]
				console.log(prob1)
			}
		}
		for (let i = 0; i <= tabelaDistribuicao[x2].length; i++) {
			let y = (scoreZ2 * 100) - (x2 * 10)
			if (i == y) {
				var prob2 = tabelaDistribuicao[x2][i]
				console.log(prob2)
			}
		}
		let probabilidade = 0
		if (de < media - 1) {
			probabilidade = prob2 - prob1
		}else {
			console.log('<')
			probabilidade = (prob2 + prob1)
		}
		if (probabilidade < 0) probabilidade *= -1
		probabilidade *= 100
		result_normal[1] = (probabilidade).toFixed(2)
	}

	result_normal[0] = media;
	result_normal[2] = desvio;
	result_normal[3] = "-";
	result_normal[4] = normal_table;

	table_probabilidade(result_normal)
}

function table_probabilidade(vet) {
	tabela = ""
	tabela += "<tr>"
	tabela += "<td>" + vet[0] + "</td>"
	tabela += "<td>" + vet[1] + "</td>"
	tabela += "<td>" + vet[2] + "</td>"
	tabela += "<td>" + vet[3] + "</td>"
	tabela += "</tr>"

	vet[4].innerHTML = tabela
}



//---------------------- UNIFORME --------------------------
function probabilidadeUniforme() {
	mediaedesvioUniforme.innerHTML = ``
	var vlrMaximo = document.getElementById("uniforme_max").value;
	var vlrMinimo = document.getElementById('uniforme_min').value;
	var diferenca = Number(vlrMaximo) + Number(vlrMinimo)
	diferenca /= 2
	let desvio = Math.pow((vlrMaximo - vlrMinimo), 2)

	desvio = Math.sqrt((desvio / 12)).toFixed(2)

	mediaedesvioUniforme.innerHTML += `Media: ${diferenca}<br>Desvio Padrão:${desvio}`

}

function uniforme_maisq() {
	maisqUniforme.innerHTML = ''
	let vlrMinimo = document.getElementById('uniforme_max').value;
	let vlrMaximo = document.getElementById('uniforme_min').value;
	let int = document.getElementById('uniforme_mais').value;
	var prob = (1 / Number((vlrMaximo) - vlrMinimo) * Number((vlrMaximo) - Number(int))) * 100
	if (prob < 0) prob *= -1
	maisqUniforme.innerHTML += `Probabilidade: ${prob}%`


}
function uniforme_menosq() {
	maisqUniforme.innerHTML = ''
	let vlrMinimo = document.getElementById("uniforme_max").value;
	let vlrMaximo = document.getElementById('uniforme_min').value;
	let int = document.getElementById('uniforme_menos').value;
	let intervalo = (vlrMinimo - int)
	if (intervalo < 0) intervalo *= -1
	let prob = (1 / (vlrMaximo - vlrMinimo) * intervalo) * 100
	if (prob < 0) prob *= -1
	maisqUniforme.innerHTML += `Probabilidade: ${prob.toFixed(2)}%`


}
function uniforme_entre() {
	entreUniforme.innerHTML = ''
	let vlrMinimo = document.getElementById("uniforme_max").value;
	let vlrMaximo = document.getElementById('uniforme_min').value;
	let entre = document.getElementById('uniforme_entre1').value;
	let ate = document.getElementById('uniforme_entre2').value;
	let intervalo = entre - ate
	let prob = (1 / (vlrMaximo - vlrMinimo) * intervalo) * 100
	if (prob < 0) prob *= -1
	entreUniforme.innerHTML += `Probabilidade:${prob.toFixed(2)}%`
}

function clearDate() {
	document.getElementById("uniforme_max").value = "";
	document.getElementById('uniforme_min').value = "";
	document.getElementById('uniforme_mais').value = "";
	document.getElementById('uniforme_menos').value = "";
	document.getElementById('uniforme_entre1').value = "";
	document.getElementById('uniforme_entre2').value = "";
	document.getElementById('entreUniforme').innerHTML = "";
	document.getElementById('maisqUniforme').innerHTML = "";
	document.getElementById('mediaedesvioUniforme').innerHTML = "";
	document.getElementById("uniforme_max").focus();

}

// --------------------------------FIM PROBABILIDADES ----------------------------------------------------------

//-----------------------------------------CORRELAÇÃO E REGRESSÃO ------------------------------------------------//

function corelacao(a) {
	corelacao_results.innerHTML = ''
	let cor = document.getElementById('varX').value;
	let reg = document.getElementById('varY').value;
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

	// r = parseFloat(r)
	a = parseFloat(a.toFixed(2))
	b = parseFloat(b.toFixed(2))

	// regressao_future.innerHTML=' '		
	corelacao_results.innerHTML += `Correlação: ${r} %  | y = ${a.toFixed(2)}X + ${b.toFixed(2)}`


	graficocorelaco(cor, reg, a, b)
	return vetval

}

function regressaoX(vetval) {
	let vet = corelacao(vetval)

	let a = (vet[0]).toFixed(4); let b = (vet[1]).toFixed(4)
	// graficocorelaco()
	var x_future = document.getElementById('x_future').value;
	var y_future = document.getElementById('y_future').value;


	let future_y = (Number(a) * Number(x_future) + Number(b)).toFixed(2)


	document.getElementById('y_future').value = future_y;

}
function regressaoY(vetval) {
	let vet = corelacao(vetval)

	let a = (vet[0]).toFixed(4); let b = (vet[1]).toFixed(4)
	// graficocorelaco()
	var x_future = document.getElementById('x_future').value;
	var y_future = document.getElementById('y_future').value;


	let future_x = ((Number(y_future) - Number(b)) / Number(a)).toFixed(2)


	document.getElementById('x_future').value = future_x;

}

function graficocorelaco(cor, reg, a = null, b = null) {

	var valX = cor.split(';')
	var valY = reg.split(';')


	var ctx = document.getElementById("myChartgraficoCorrelacao").getContext('2d');
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


	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				type: 'line',
				label: 'Projeção:',
				data: reta,
				fill: false,
				backgroundColor: "rgba(46,158,79, .7)",
				borderColor: "rgba(46,158,79, .7)",
				pointRadius: 0
			}, {
				type: 'bubble',
				label: 'Dados:',
				data: dados,
				backgroundColor: "rgba(76,78,80, .7)",
				borderColor: "transparent",
			}]
		},
		options: {
			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom'
				}],

			}
		}
	});
}



// --------------------------------FIM CORRELAÇÃO E REGRESSÃO --------------------------------------------------
