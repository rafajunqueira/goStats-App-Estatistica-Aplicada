function regex(valor) {
    let mascara = /^[0-9)\(;.]+$/g

    if (mascara.test(valor) == true) { //se der true o teste o valor pode conter ';' ou '.' ou '1 até 9'
        console.log("todos caracteres válidos")
        return true
    } else {
        console.log("existem caracteres inválidos")
        return false
    }
}


// MODAL DE ALERT PARA CARACTERES INVÁLIDOS
function triggerModal(msg = "Algum dado inserido está inválido (para decimais use ponto '.')") {
    // passagem de valor de msg ao modal
    document.querySelector('.modal-body').innerHTML = msg

    // disparando botão que anima modal
    document.querySelector('#triggerModal').click()
}