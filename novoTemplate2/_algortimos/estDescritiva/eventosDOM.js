// AO FINAL, TODOS ELEMENTOS style="display: none" VIRAM BLOCK
const elementosOcultos = document.querySelectorAll('#ocultarElem')

// AO CLICAR NO FORM DE 
function ShowformImport() {
    const formImport = document.querySelector('#formImport')
    formImport.style.removeProperty('display')

    hideformIntro()
}

function ShowformManual() {
    const formManual = document.querySelector('#formManual')
    formManual.style.removeProperty('display')

    hideformIntro()
}

function hideformIntro() {
    const formIntro = document.querySelector('#formIntro')
    formIntro.style.display = 'none'
}