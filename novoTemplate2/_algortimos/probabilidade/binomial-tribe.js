function analiseCombinatoria(valor) {
    // para valores negativos
    if (valor < 0) {

        return 'Valor deve ser maior ou igual a zero';

        // para valor = 0  ou igual a 1
    } else if ((valor == 0) || (valor == 1)) {

        return 1;

    } else {

        var acumula = 1;
        for (x = valor; x > 1; x--) {
            acumula = acumula * x;
        }
        return acumula;
    }
}


function calc_binomial(n) {
    //Coletando Dados;
    var binomial_table = document.getElementById('table_Binomial')

    var n = document.getElementById('binomial_N').value;
    let p = document.getElementById('binomial_P').value;
    let q = document.getElementById("binomial_Q").value;
    let k1 = document.getElementById('binomial_K').value;
    var k = k1.toString().split(';');
    let calc;
    let vetCalc = []
    // let probabilidade = 0
    let vetProbabilidade = []
    let totProbabilidade = 0
    for (let i = 0; i < k.length; i++) {
        calc = (analiseCombinatoria(n) / (analiseCombinatoria(k[i]) * analiseCombinatoria(n - k[i]))).toFixed(2);
        vetCalc.push(parseFloat(calc));

    }
    // Calculando e somando as probabilidades dos múltiplos resultados
    for (let i = 0; i < k.length; i++) {
        console.log(vetCalc[i], p, q, n, k)
        var probabilidade = ((vetCalc[i] * (p ** k[i]) * (q ** (n - k[i]))) * 100);
        console.log(probabilidade, '|', vetProbabilidade)
        vetProbabilidade.push(parseFloat(probabilidade));
    }
    for (let i = 0; i < vetProbabilidade.length; i++) {
        totProbabilidade += vetProbabilidade[i];
    }

    // Calculando Média
    let media = n * p;
    // Calculando Desvio Padrão
    let desvioPadrao = Math.sqrt((n * p * q)).toFixed(2);
    // Calculando CV
    let cv = ((desvioPadrao / media) * 100).toFixed(2);
    //montando array com os resultados
    var result_binomial = []
    //média
    result_binomial[0] = media
    //probabilidade
    result_binomial[1] = totProbabilidade
    //desvio padrão
    result_binomial[2] = desvioPadrao
    //coeficiente variação
    result_binomial[3] = cv
    //tabela
    result_binomial[4] = binomial_table

    //Montando a tabela
    table_probabilidade(result_binomial)
}