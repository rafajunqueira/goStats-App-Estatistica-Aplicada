function probabilidadeUniforme() {
    mediaedesvioUniforme.innerHTML = ``
    var vlrMaximo = document.getElementById("uniforme_max").value;
    var vlrMinimo = document.getElementById('uniforme_min').value;
    var diferenca = Number(vlrMaximo) + Number(vlrMinimo)
    diferenca /= 2
    let desvio = Math.pow((vlrMaximo - vlrMinimo), 2)

    desvio = Math.sqrt((desvio / 12)).toFixed(2)

    mediaedesvioUniforme.innerHTML += `Media: ${diferenca}<br>Desvio Padrão:${desvio}`

}

function uniforme_maisq() {
    maisqUniforme.innerHTML = ''
    let vlrMinimo = document.getElementById('uniforme_max').value;
    let vlrMaximo = document.getElementById('uniforme_min').value;
    let int = document.getElementById('uniforme_mais').value;
    var prob = (1 / Number((vlrMaximo) - vlrMinimo) * Number((vlrMaximo) - Number(int))) * 100
    if (prob < 0) prob *= -1
    maisqUniforme.innerHTML += `Probabilidade: ${prob}%`


}
function uniforme_menosq() {
    maisqUniforme.innerHTML = ''
    let vlrMinimo = document.getElementById("uniforme_max").value;
    let vlrMaximo = document.getElementById('uniforme_min').value;
    let int = document.getElementById('uniforme_menos').value;
    let intervalo = (vlrMinimo - int)
    if (intervalo < 0) intervalo *= -1
    let prob = (1 / (vlrMaximo - vlrMinimo) * intervalo) * 100
    if (prob < 0) prob *= -1
    maisqUniforme.innerHTML += `Probabilidade: ${prob.toFixed(2)}%`


}
function uniforme_entre() {
    entreUniforme.innerHTML = ''
    let vlrMinimo = document.getElementById("uniforme_max").value;
    let vlrMaximo = document.getElementById('uniforme_min').value;
    let entre = document.getElementById('uniforme_entre1').value;
    let ate = document.getElementById('uniforme_entre2').value;
    let intervalo = entre - ate
    let prob = (1 / (vlrMaximo - vlrMinimo) * intervalo) * 100
    if (prob < 0) prob *= -1
    entreUniforme.innerHTML += `Probabilidade:${prob.toFixed(2)}%`
}

function clearDate() {
    document.getElementById("uniforme_max").value = "";
    document.getElementById('uniforme_min').value = "";
    document.getElementById('uniforme_mais').value = "";
    document.getElementById('uniforme_menos').value = "";
    document.getElementById('uniforme_entre1').value = "";
    document.getElementById('uniforme_entre2').value = "";
    document.getElementById('entreUniforme').innerHTML = "";
    document.getElementById('maisqUniforme').innerHTML = "";
    document.getElementById('mediaedesvioUniforme').innerHTML = "";
    document.getElementById("uniforme_max").focus();

}