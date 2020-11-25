// AO FINAL, TODOS ELEMENTOS style="display: none" VIRAM BLOCK
const elementosOcultos = document.querySelectorAll('#ocultarElem')

// AO CLICAR NO FORM DE Import na tela inicial da Estatística descritiva
function ShowformImport() {
    const formImport = document.querySelector('#formImport')
    formImport.style.removeProperty('display')

    hideformIntro()
}

// AO CLICAR NO FORM DE Manual na tela inicial da Estatística descritiva
function ShowformManual() {
    const formManual = document.querySelector('#formManual')
    formManual.style.removeProperty('display')

    hideformIntro()
}

// AO CLICAR NO FORM DE Import/Manual esconder tela inicial
function hideformIntro() {
    const formIntro = document.querySelector('#formIntro')
    formIntro.style.display = 'none'
}





// *******************FUNÇÃO TROCAR IMAGEM ICONES************************/


var foto = 6;
var fotoPopulacao = document.getElementById('fotoPopulacao')
var fotoAmostra = document.getElementById('fotoAmostra')

function mudaFoto(foto) {
    if (document.getElementsByName('amostra_ou_populacao')[0].checked) {
        fotoAmostra.src = "../../imagens/amostraclick.png"
        fotoPopulacao.src = "../../imagens/populacao.png"
    }
    if (document.getElementsByName('amostra_ou_populacao')[1].checked) {
        fotoPopulacao.src = "../../imagens/populacaoclick.png"
        fotoAmostra.src = "../../imagens/amostra.png"
    }
}