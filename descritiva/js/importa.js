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

const botaoSubir = document.querySelector('#button')
const formVer = document.querySelector('.verificaPlanilha');

botaoSubir.onclick = () => {

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

                formVer.style.display = 'initial'

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

    let opcoes = `<input type="radio" name="radioOpc" value="${nomesPlanilhas[0]}" checked>  <label>${nomesPlanilhas[0]}</label><br>`
    for (let i = 1; i < nomesPlanilhas.length; i++) {
        opcoes += `<input type="radio" name="radioOpc" value="${nomesPlanilhas[i]}">  <label>${nomesPlanilhas[i]}</label><br>`
    }

    let divVer = document.querySelector('.radios')
    divVer.innerHTML = `<br>
        <p>Certo, detectamos que o inserido possui ${nomesPlanilhas.length} planilhas, marque abaixo qual delas vamos fazer análise:</p>
    <footer>A análise será feita automaticamente</footer>${opcoes}`

}


let preNomeVar = []
let preInput = []

const escolhaFinal = document.querySelector('.btnFinal')



escolhaFinal.onclick = () => {

    formVer.style.display = 'none'

    //aqui pegamos o radio (planilha) selecionada:
    let planEscolhida = document.querySelector('input[name="radioOpc"]:checked').value

    valoresEscolhidos = todasPlanilhas[planEscolhida]

    pegaValores(valoresEscolhidos)
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
}