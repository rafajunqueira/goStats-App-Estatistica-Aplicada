
// variaveis auxiliares a serem usadas no quickSort
let passadas = 0, comparacoes = 0, trocas = 0

function quickSort(vetor, fnComp, inicio = 0, fim = vetor.length - 1) {
    //console.log({vetor, inicio, fim})
    if (fim > inicio) {  // Garante que haja, PELO MENOS, DOIS elementos para ordenar
        passadas++
        let posDiv = inicio - 1
        let posPivot = fim
        for (let i = inicio; i < fim; i++) {
            comparacoes++
            //if(vetor[i] < vetor[posPivot]) {
            if (fnComp(vetor[posPivot], vetor[i])) {     // Parâmetros invertidos
                posDiv++
                [vetor[i], vetor[posDiv]] = [vetor[posDiv], vetor[i]]
                trocas++
            }
        }
        // Último incremento de posDiv, após o loop terminar
        posDiv++
        [vetor[posDiv], vetor[posPivot]] = [vetor[posPivot], vetor[posDiv]]
        trocas++
        quickSort(vetor, fnComp, inicio, posDiv - 1)    // Lado esquerdo
        quickSort(vetor, fnComp, posDiv + 1, fim)       // Lado direito
        return vetor
    }
}
