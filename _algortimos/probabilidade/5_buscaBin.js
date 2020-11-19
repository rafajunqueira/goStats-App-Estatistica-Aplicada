// função de busca binária:
function buscaBin(callback, array, vlBusca, inicio = 0, fim = array.length - 1) {
    if (fim >= inicio) {
        // truncando casas decimais da mediana
        let mediana = Math.trunc((fim + inicio) / 2)

        // Enviando ao callback a mediana
        let resultado = callback(array[mediana], vlBusca)

        // switch para verificar se mediana é o valor buscado
        switch (true) {
            case (resultado > 0): // procura na metade maior
                return buscaBin(callback, array, vlBusca, mediana + 1, fim)

            case (resultado < 0): // procura na metade menor
                return buscaBin(callback, array, vlBusca, inicio, mediana - 1)

            default: // Condição para sair da recursividade
                return array[mediana]
        }
    }

    // Se erro, retornar este modal:
    triggerModal('Houve um erro no processamento.')
}

// função auxiliar de comparação
function fnComp(tb, lin) {
    switch (true) {
        case (tb.lin == lin):
            return 0

        case (tb.lin > lin):
            return -1

        default:
            return 1
    }
}