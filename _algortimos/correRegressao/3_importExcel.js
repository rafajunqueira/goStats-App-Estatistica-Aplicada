// ao clicar no botão de Import, fazer o seguinte:
document.querySelector('#btnCalcImport').onclick = () => {
    // capturando valores no input de import:
    const varXImport = document.querySelector('#varXImport').value
    const varYImport = document.querySelector('#varYImport').value

    // se os inputs estiverem vazios, temos que proceder com a planilha
    if (varXImport.trim() == '' && varYImport.trim() == '') {
        processaExcel()
    } else { // Se tudo ok, prosseguir com os cálculos

        // exibir formResultado
        const formResultado = document.querySelector('#formResultado');
        formResultado.style.removeProperty('display')

        // exec correRegressao a partir dos parâmetros capturados
        correRegressao()
    }
}

// declarando variáveis que vão ser usadas no mom. de escolha entre as planilhas
let todasPlanilhas, selectedFile, valoresEscolhidos

//Codigo responsa para ESCOLHER ARQ.
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0]
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]

//processaExcel é responsa para SUBIR ARQ.:
function processaExcel() {
    XLSX.utils.json_to_sheet(data, 'out.xlsx')
    if (selectedFile) {
        fileReader = new FileReader()
        fileReader.readAsBinaryString(selectedFile)
        fileReader.onload = (event) => {
            let data = event.target.result
            let workbook = XLSX.read(data, { type: "binary" })

            // qtdPlanilhas tem o tamanho da qtd de planilhas no xlsx
            let qtdPlanilhas = workbook.SheetNames.length

            // nomesPlanilhas tem o nome de todas planilhas no xlsx
            let nomesPlanilhas = workbook.SheetNames

            // todasPlanilhas as planilhas no xlsx
            todasPlanilhas = workbook.Sheets

            switch (true) {
                //quando for somente 1 planilha:
                case (qtdPlanilhas = 1):
                    // valoresEscolhidos vai receber essa plan que está no array 0
                    valoresEscolhidos = todasPlanilhas[workbook.SheetNames[0]]

                    // e depois passar para pegaValores
                    pegaValores(valoresEscolhidos)
                    break;

                default:
                    //quando for mais de 1 planilha, perguntar ao user qual ele quer:
                    modalEscolha(nomesPlanilhas)
                    break;
            }
        }
    }
}


//Código responsa de modal de Escolha entre as planilhas no arquivo subido:
function modalEscolha([...nomesPlanilhas]) {

    // display = 'none' em formImport, para dar espaço ao verifImport
    const formImport = document.querySelector('#formImport')
    formImport.style.display = 'none'

    // exibindo verifImport
    const verifImport = document.querySelector('#verifImport');
    verifImport.style.removeProperty('display')

    // exibindo msg de planilhas
    const divMsg = document.querySelector('#divMsg');
    divMsg.innerHTML = ''
    divMsg.innerHTML = `Certo, detectamos que o inserido possui ${nomesPlanilhas.length} planilhas, marque abaixo qual delas vamos fazer análise:`

    // alimentando select com as planilhas dentro do xlsx
    const selectsPlanilha = document.querySelector('#selectsPlanilha');
    selectsPlanilha.innerHTML = `<option>Selecione uma opção</option>`
    for (let i = 0; i < nomesPlanilhas.length; i++) {
        selectsPlanilha.innerHTML += `<option>${nomesPlanilhas[i]}</option>`
    }

}


// quando o botão de escolha Final for clicado, fazer o seguinte
document.querySelector('#btnFinal').onclick = () => {

    //aqui pegamos o option(planilha) no select selecionado:
    let planEscolhida = document.querySelector('#selectsPlanilha').value

    // validações de input:
    if (planEscolhida == 'Selecione uma opção') {
        triggerModal('Por favor, selecione uma opção dentre as planilhas.')

    } else if (planEscolhida != 'Correlacao' && planEscolhida != 'Correlação') {
        triggerModal('Por favor, selecione uma planilha com o conteúdo de Correlação.')

    } else { // se tudo ok, proceder:
        // verifImport é ocultado
        verifImport.style.display = 'none'

        // formImport é exibido
        const formImport = document.querySelector('#formImport');
        formImport.style.removeProperty('display')

        // divResultados (título) é alimentado pelo nome da plan escolhida
        const divResultados = document.querySelector('#divResultados')
        divResultados.innerHTML = `Resultados (Planilha ${planEscolhida}):`

        // proceder com os valores dentro da planilha escolhida
        valoresEscolhidos = todasPlanilhas[planEscolhida]
        pegaValores(valoresEscolhidos)
    }

}

// pegaValores processa valores dentro da planilha:
function pegaValores(valoresEscolhidos) {

    // esse -2 são elementos dentro de Object desnecessários
    let tamanho = Object.values(valoresEscolhidos).length - 2
    let valoresX = []

    for (let i = 1; tamanho / 2 >= i; i++) {
        valoresX.push(valoresEscolhidos[`A${i}`].v)
    }
    debugger

    let valoresY = []

    for (let i = 1; tamanho / 2 >= i; i++) {
        valoresY.push(valoresEscolhidos[`B${i}`].v)
    }
    debugger

    // removendo primeiro elem. do array (é o nome da coluna na planilha)
    valoresX.shift()
    valoresY.shift()

    debugger

    // ao final os inputs recebem o que foi processado na planilha
            document.getElementById('varXImport').value = valoresX.join(';')
            document.getElementById('varYImport').value = valoresY.join(';')
           
}