
/* ----------- EVENTOS DE JS (Manipulação DOM em inputs específicos) ---------- */

// função ligada em auto-completar a porcentagem de Fracasso/Sucesso
const EvFracasso = () => document.querySelector('#Sucesso').value = 100 - document.querySelector('#Fracasso').value
const EvSucesso = () => document.querySelector('#Fracasso').value = 100 - document.querySelector('#Sucesso').value

// Ao trocar abas(nav) o resultado é zerado
const trocarAbas = () => {
    document.querySelector('.resultadoBinomial').innerHTML = ''
    document.querySelector('.resultadoNormal').innerHTML = ''
    document.querySelector('.resultadoUniforme').innerHTML = ''
}