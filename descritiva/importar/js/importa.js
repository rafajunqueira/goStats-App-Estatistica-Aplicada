
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

            if (qtdPlanilhas > 1) {
                modalEscolha(nomesPlanilhas)
            } //falta quando for somente 1 PLanilha
        }
    }
}


//Codigo responsa para CRIAR modal de Escolha

//var escolhaFinal

//let arrayTeste = []

function modalEscolha([...nomesPlanilhas]) {


    //console.log('nomesPlanilhas :>> ', nomesPlanilhas);
    
    let opcoes = `<input type="radio" name="radioOpc" value="${nomesPlanilhas[0]}" checked>  <label>${nomesPlanilhas[0]}</label><br>`
    for (let i = 1; i < nomesPlanilhas.length; i++) {
        opcoes += `<input type="radio" name="radioOpc" value="${nomesPlanilhas[i]}">  <label>${nomesPlanilhas[i]}</label><br>`
    }

    let DOM_divReferencia = document.querySelector('#divReferencia')
    DOM_divReferencia.innerHTML +=
        `<p class="mb-0">Certo, detectamos que o inserido possui ${nomesPlanilhas.length} planilhas, marque abaixo qual delas vamos fazer análise:</p>
    <footer class="blockquote-footer">A análise será feita automaticamente</footer></blockquote>${opcoes}`



    

    //arrayTeste.push(escolhaFinal)
    //console.log('escolhaFinal :>> ', escolhaFinal);
}




let preNomeVar = []
let preInput = []

//console.log('escolhaFinal :>> ', escolhaFinal);

//console.log('arrayTeste :>> ', arrayTeste[0]);

const escolhaFinal = document.querySelector('.optFinal')

escolhaFinal.onclick = () => {

console.log('passou :>> ');
    //aqui pegamos o radio selecionado:
    let planEscolhida = document.querySelector('input[name="radioOpc"]:checked').value
    console.log('todasPlanilhas :>> ', todasPlanilhas);
    let valoresEscolhidos = todasPlanilhas[planEscolhida]
    let tamanho = Object.values(valoresEscolhidos).length
    tamanho -= 2 // nesse 2 aqui descontamos tab de planilha (formatação excel)

    let valores = Object.values(valoresEscolhidos)

    // esse arrayImportado passará depois para o input no HTML
    let arrayImportado = []

    for (let i = 1; i <= tamanho; i++) {

        let valorLinha = valores[i].v
        arrayImportado.push(valorLinha)

    }

    //console.log('arrayImportado :>> ', arrayImportado);


    preNomeVar = arrayImportado.shift()

    preInput = arrayImportado
}