const btnCalcImport = document.querySelector('#btnCalcImport')

btnCalcImport.onclick = () => {
    processaExcel()
    
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

//var escolhaFinal

//let arrayTeste = []

function modalEscolha([...nomesPlanilhas]) {

    const formImport = document.querySelector('#formImport');
    formImport.style.display = 'none'

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

}


let preNomeVar = []
let preInput = []

const escolhaFinal = document.querySelector('#btnFinal')



escolhaFinal.onclick = () => {

    //aqui pegamos o select (planilha) selecionada:
    let planEscolhida = document.querySelector('#selectsPlanilha').value

    if (planEscolhida == 'Selecione uma opção') {
        alert('Por favor, selecione uma opção dentre as planilhas.')
    } else {
        verifImport.style.display = 'none'

        valoresEscolhidos = todasPlanilhas[planEscolhida]

        pegaValores(valoresEscolhidos)

        const formImport = document.querySelector('#formImport');
        formImport.style.removeProperty('display')

        const divResultados = document.querySelector('#divResultados');
        divResultados.innerHTML = `Resultados (Planilha ${planEscolhida}):`
    }

}


function pegaValores(valoresEscolhidos) {

    let tamanho = Object.values(valoresEscolhidos).length
    tamanho -= 2 // nesse 2 aqui descontamos tab de planilha (formatação excel)

    let valores = Object.values(valoresEscolhidos)

    // esse arrayImportado passará depois para o input no HTML
    let arrayImportado = []
    
    for (let i = 1; i <= tamanho; i++) {

        let valorLinha = valores[i].v
        arrayImportado.push(valorLinha)
    }
    
    preNomeVar = arrayImportado.shift()
    preInput = arrayImportado
    
    geraResultado(preNomeVar, preInput)

    //return [preNomeVar, preInput]
}