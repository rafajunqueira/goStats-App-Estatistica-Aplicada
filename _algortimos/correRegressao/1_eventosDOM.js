
/* ----------- EVENTOS DE JS ---------- */

// ao trocarAbas, formResultado não é mais exibido
const trocarAbas = () => {
const formResultado = document.querySelector('#formResultado');
formResultado.style.display = 'none'
}



// funcao para no momento de keyup na equacao final X seja recalculdo
function regressaoX(vetval) {
	let vet = recalculaEq(vetval)

	let a = (vet[0]).toFixed(4); let b = (vet[1]).toFixed(4)

	var x_future = document.getElementById('x_future').value;
	let future_y = (Number(a) * Number(x_future) + Number(b)).toFixed(2)


	document.getElementById('y_future').value = future_y;

}

// funcao para no momento de keyup na equacao final Y seja recalculdo
function regressaoY(vetval) {
	let vet = recalculaEq(vetval)

	let a = (vet[0]).toFixed(4); let b = (vet[1]).toFixed(4)

	var y_future = document.getElementById('y_future').value;
	let future_x = ((Number(y_future) - Number(b)) / Number(a)).toFixed(2)


	document.getElementById('x_future').value = future_x;

}