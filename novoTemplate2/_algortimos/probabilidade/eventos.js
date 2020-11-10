
/* ----------- EVENTOS DE JS (Manipulação DOM em inputs específicos) ---------- */

const EvFracasso = () => {
    document.querySelector('#Sucesso').value = 100 - document.querySelector('#Fracasso').value
}

const EvSucesso = () => {
    document.querySelector('#Fracasso').value = 100 - document.querySelector('#Sucesso').value
}

const trocarAbas = () => {
    document.querySelector('.resultadoBinomial').innerHTML = ''
    document.querySelector('.resultadoNormal').innerHTML = ''
    document.querySelector('.resultadoUniforme').innerHTML = ''
}


/* -------- */


/* NORMAL: gerar input duplo quando o label 'Entre' for clicado: */
const EntreNormal = document.querySelector('#EntreNormal')

EntreNormal.onclick = () => {
    const vlNormal = document.querySelector('#vlNormal');
    vlNormal.innerHTML =
        `<input type="text" id="intervalo1" placeholder="Valor 1" class="form-control" autocomplete="on" name="normal3">
         <input type="text" id="intervalo2" placeholder="Valor 2" class="form-control" autocomplete="on" name="normal3" style="margin-left: 5px;">`
}

/* NORMAL: voltar input único quando o label 'Menor/Maior' for clicado: */
let inputUnicoNormal = () => {
    const vlNormal = document.querySelector('#vlNormal');
    vlNormal.innerHTML = `
    <input type="text" id="intervalo" placeholder="Informe o valor a ser calculado" class="form-control" required="" autocomplete="on" name="normal3">
    <div class="input-group-append" id="limparNormal">
        <span class="input-group-text" style="cursor:grab" onclick="this.parentNode.previousElementSibling.value= ''">Limpar</span>
    </div>`
}

document.querySelector('#MenorNormal').onclick = () => inputUnicoNormal()
document.querySelector('#MaiorNormal').onclick = () => inputUnicoNormal()


/* -------- */


/* UNIFORME: gerar input duplo quando o label 'Entre' for clicado: */
const EntreUniforme = document.querySelector('#EntreUniforme')

EntreUniforme.onclick = () => {
    const vlUniforme = document.querySelector('#vlUniforme');
    vlUniforme.innerHTML =
        `<input type="text" id="intervalo1" placeholder="Valor 1" class="form-control" autocomplete="on" name="uniforme3">
         <input type="text" id="intervalo2" placeholder="Valor 2" class="form-control" autocomplete="on" name="uniforme4" style="margin-left: 5px;">`
}

/* UNIFORME: voltar input único quando o label 'Menor/Maior' for clicado: */
let inputUnicoUnif = () => {
    const vlUniforme = document.querySelector('#vlUniforme');
    vlUniforme.innerHTML = `
    <input type="text" id="intervalo" placeholder="Informe o valor a ser calculado" class="form-control" required="" autocomplete="on" name="uniforme3">
    <div class="input-group-append" id="limparUniforme">
        <span class="input-group-text" style="cursor:grab" onclick="this.parentNode.previousElementSibling.value= ''">Limpar</span>
    </div>`
}

document.querySelector('#MenorUniforme').onclick = () => inputUnicoUnif()
document.querySelector('#MaiorUniforme').onclick = () => inputUnicoUnif()