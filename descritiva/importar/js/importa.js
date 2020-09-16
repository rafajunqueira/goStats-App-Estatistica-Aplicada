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

document.querySelector('#button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx')
    if (selectedFile) {
        let fileReader = new FileReader()
        fileReader.readAsBinaryString(selectedFile)
        fileReader.onload = (event) => {
            let data = event.target.result
            let workbook = XLSX.read(data, { type: "binary" })
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


