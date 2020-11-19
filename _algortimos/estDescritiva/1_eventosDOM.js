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


/******************* CONTROLADOR DE SLIDER ***********************/

// CONTROLA SELECT
const slctMedSeparatriz = document.querySelector('.medidasSeparatriz')

slctMedSeparatriz.onchange = () => {
    const novoSlider = document.querySelector('#slider')
    const medidasSeparatriz = document.querySelector('option:checked').innerHTML

    switch (medidasSeparatriz) {
        case 'Quartil (25 em 25%)':
            novoSlider.step = 25
            novoSlider.min = 25
            break;

        case 'Quintil (20 em 20%)':
            novoSlider.step = 20
            novoSlider.min = 20
            break;

        case 'Decil (10 em 10%)':
            novoSlider.step = 10
            novoSlider.min = 10
            break;

        case 'Percentil (1 em 1%)':
            novoSlider.step = 1
            novoSlider.min = 1
            break;
    }

    alteraSlider(qtdLinhasTabela)
}



// CONTROLA SLIDER MUDAR:
const nivelSlider = document.querySelector('#slider')

nivelSlider.oninput = () => {
    alteraSlider(qtdLinhasTabela)
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