const btnCalcImport = document.querySelector('#btnCalcImport')

btnCalcImport.onclick = () => {
    const varXImport = document.querySelector('#varXImport').value
    const varYImport = document.querySelector('#varYImport').value

    if (varXImport.trim() == '' && varYImport.trim() == '') {
        processaExcel()
        debugger
    } else {
        const formResultado = document.querySelector('#formResultado');
        formResultado.style.removeProperty('display')
        corelacao()
    }
}


let valoresEscolhidos


//Codigo responsa para ESCOLHER ARQ.
let selectedFile
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0]
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]


//Codigo responsa para SUBIR ARQ.

let todasPlanilhas

function processaExcel() {
    XLSX.utils.json_to_sheet(data, 'out.xlsx')
    if (selectedFile) {
        fileReader = new FileReader()
        fileReader.readAsBinaryString(selectedFile)
        fileReader.onload = (event) => {
            let data = event.target.result
            let workbook = XLSX.read(data, { type: "binary" })

            let qtdPlanilhas = workbook.SheetNames.length
            let nomesPlanilhas = workbook.SheetNames
            todasPlanilhas = workbook.Sheets

            console.log('todasPlanilhas :>> ', todasPlanilhas);


            if (qtdPlanilhas > 1) {
                //quando for mais de 1 PLanilha:

                modalEscolha(nomesPlanilhas)
            } else {

                //quando for somente 1 PLanilha:
                console.log('todasPlanilhas[0] :>> ', todasPlanilhas[workbook.SheetNames[0]]);
                valoresEscolhidos = todasPlanilhas[workbook.SheetNames[0]]

                pegaValores(valoresEscolhidos)
            }
        }
    }
}


//Codigo responsa para CRIAR modal de Escolha

function modalEscolha([...nomesPlanilhas]) {

    const formResultado = document.querySelector('#formResultado');
    formResultado.style.display = 'none'

    const verifImport = document.querySelector('#verifImport');
    verifImport.style.removeProperty('display')


    const divMsg = document.querySelector('#divMsg');
    divMsg.innerHTML = ''
    divMsg.innerHTML = `Certo, detectamos que o inserido possui ${nomesPlanilhas.length} planilhas, marque abaixo qual delas vamos fazer análise:`

    const selectsPlanilha = document.querySelector('#selectsPlanilha');
    selectsPlanilha.innerHTML = `<option>Selecione uma opção</option>`
    for (let i = 0; i < nomesPlanilhas.length; i++) {
        selectsPlanilha.innerHTML += `<option>${nomesPlanilhas[i]}</option>`
    }

    const formImport = document.querySelector('#formImport')
    formImport.style.display = 'none'
}


let preNomeVar = []
let preInput = []

const escolhaFinal = document.querySelector('#btnFinal')

escolhaFinal.onclick = () => {

    //aqui pegamos o select (planilha) selecionada:
    let planEscolhida = document.querySelector('#selectsPlanilha').value

    if (planEscolhida == 'Selecione uma opção') {
        alert('Por favor, selecione uma opção dentre as planilhas.')

    } else if (planEscolhida != 'Correlacao' && planEscolhida != 'Correlação') {
        alert('Por favor, selecione uma planilha com o conteúdo de Correlação.')

    } else {
        verifImport.style.display = 'none'

        const formImport = document.querySelector('#formImport');
        formImport.style.removeProperty('display')

        const divResultados = document.querySelector('#divResultados')
        divResultados.innerHTML = `Resultados (Planilha ${planEscolhida}):`

        valoresEscolhidos = todasPlanilhas[planEscolhida]
        pegaValores(valoresEscolhidos)
    }

}


function pegaValores(valoresEscolhidos) {
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

    valoresX.shift()
    valoresY.shift()

    debugger


    // detectando tab ativa para passar no input certo os dados da planilha:
    const tabAtiva = document.querySelector('a.active');

    switch (tabAtiva.id) {
        case 'manualTab':
            document.getElementById('varXManual').value = valoresX.join(';')
            document.getElementById('varYManual').value = valoresY.join(';')
            break;

        case 'importTab':
            document.getElementById('varXImport').value = valoresX.join(';')
            document.getElementById('varYImport').value = valoresY.join(';')
            break;
    }
}