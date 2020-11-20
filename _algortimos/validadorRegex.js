
// função que valida a partir de máscara regex
function regex(valor) {

    // a var verPontVirg serve para verificar se o campo tem somente ';'
    let verPontVirg = valor.replace(';', '')
    
    // criando expressão dentro da var mascara   
    let mascara = /^[0-9)\(;.]+$/g

    if (mascara.test(valor) == true && verPontVirg.trim() != '') {
        // SE PASSAR: todos caracteres válidos
        return true
    } else {
        // SE não PASSAR: existem caracteres inválidos
        return false
    }
}

// MODAL DE ALERT PARA CARACTERES INVÁLIDOS
function triggerModal(msg = "Algum campo inserido está inválido ou em branco (para decimais use ponto '.')") {
    // passagem de valor de msg ao modal
    document.querySelector('.modal-body').innerHTML = msg

    // disparando botão que anima modal
    document.querySelector('#triggerModal').click()
}