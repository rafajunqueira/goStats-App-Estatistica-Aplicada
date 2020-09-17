let selectedFile
//console.log(window.XLSX)
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0]
    //console.log('selectedFile :>> ', selectedFile)
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]


function userEscPlanilha([...nomesPlanilhas]) {

    let verificaPlanilha = document.querySelector('.verificaPlanilha')
    let div = ''
    for (let i = 0; i < nomesPlanilhas.length; i++) {
        div += `<input type="radio" name="gender" value="${nomesPlanilhas[i]}" checked><label>${nomesPlanilhas[i]}</label><br>`
    }
    console.log('div :>> ', div);

    verificaPlanilha.innerHTML = `<div class="form-dados" style="position: fixed">
    <div class="container descritiva-main form-custom formulario">
        <div class="row">
            <div class="col-md-12 col-sm-12 text-center">
                <blockquote class="blockquote">
                    <p class="mb-0">Certo, detectamos que o inserido possui ${nomesPlanilhas.length} planilhas, marque abaixo qual delas vamos fazer análise:</p>
                    <footer class="blockquote-footer">A análise será feita automaticamente</footer></blockquote>${div}
                    <a class="btn btn-outline-secondary btn-custom"
                    href="./manual/manual.html" style="width: 77%;">Já escolhi a Planilha!</a>
            </div>
        </div>
    </div>
</div>`
}

document.querySelector('#button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx')
    if (selectedFile) {
        let fileReader = new FileReader()
        fileReader.readAsBinaryString(selectedFile)
        fileReader.onload = async (event) => {
            let data = event.target.result
            let workbook = XLSX.read(data, { type: "binary" })

            let qtdPlanilhas = workbook.SheetNames.length
            let nomesPLanilhas = workbook.SheetNames

            if (qtdPlanilhas > 1) {
                await userEscPlanilha(nomesPLanilhas)
            }

            console.log('qtdPlanilhas :>> ', qtdPlanilhas);

            let planilhaEscolhida = workbook.Sheets["Modelo Discreto"]
            let tamanho = Object.values(planilhaEscolhida).length
            tamanho -= 2 // nesse 2 aqui descontamos tab de planilha (formatação excel)
            //console.log('tamanho :>> ', tamanho);

            let valores = Object.values(planilhaEscolhida)

            // esse arrayImportado passará depois para o input no HTML
            let arrayImportado = []

            for (let i = 1; i <= tamanho; i++) {

                let valorLinha = valores[i].v
                arrayImportado.push(valorLinha)

            }


            // let preNomeVar = document.querySelector('.nomeVariavel').value
            preNomeVar = arrayImportado.shift()
            // console.log('preNomeVar :>> ', preNomeVar);

            // let preInput = document.querySelector('#coleta_de_dados').value
            preInput = arrayImportado
            // console.log('arrayImportado :>> ', arrayImportado);

            //console.log('arrayImportado :>> ', arrayImportado)



            /* workbook.SheetNames.forEach(sheet => {
                 let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
                 //console.log(rowObject)
                 document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4)
             })*/
        }
    }
})


