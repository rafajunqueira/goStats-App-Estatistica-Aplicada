/* import MicroModal from 'micromodal'; */
/* import Jump from 'jump.js';*/
/* import doT from 'dot'; */
import Chart from 'chart.js';

class CorrelationNRegression {
  constructor() {
    this.submitButton = document.querySelector('[data-button-cr]');
    this.fileButton = document.querySelector('[data-cr-file]');
    this.buttonEmpty = document.querySelector('[button-cr-empty]');
    this.modalMessage = document.querySelector('[data-modal]').querySelector('[data-modal-message]');
    this.holderResult = document.querySelector('[data-result-holder]');
    this.canvasHolder = document.querySelector('[data-canvas]');
    this.containerResult = document.createElement('div');
    this.crTemplate = doT.template('<div class="c-prob-result"><p class="c-prob-result__cell"><b>Coeficiente de correlação:</b><br /> {{=it.cr}}</p><p class="c-prob-result__cell"><b>Nivel de correlção:</b> <br />{{=it.crNvl}}</p><p class="c-prob-result__cell"><b>Equação da reta:</b> <br />{{=it.equaCR}}</p></div>');
    this.dataX = { name: null, value: null, somX: null, somXsqr: null };
    this.dataY = { name: null, value: null, somY: null, somYsqr: null };
    this.dataXY = null;
    this.dataR = null;
    this.dataA = null;
    this.dataB = null;
    this.rateR = null;
    this.inputX = document.createElement('input');
    this.inputY = document.createElement('input');
    this.title = document.createElement('h2');
    this.containerFuture = document.createElement('div');
    this.valueX = null;
    this.valueY = null;
    this.result = null;
    this.setup();
  }

  setup() {
    this.setupListeners();
  }

  setupListeners() {
    this.buttonEmpty.addEventListener('click', () => CorrelationNRegression.setEmpty());

    this.fileButton.addEventListener('change', () => this.readFile());

    this.submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.recoverData();
      this.validateData();
    });
  }

  static setEmpty() {
    document.querySelector('[data-cr-name-x]').value = '';
    document.querySelector('[data-cr-name-y]').value = '';
    document.querySelector('[data-cr-x]').value = '';
    document.querySelector('[data-cr-y]').value = '';
  }

  readFile() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const file = this.fileButton.files[this.fileButton.files.length - 1];
      const inputX = document.querySelector('[data-cr-x]');
      const inputY = document.querySelector('[data-cr-y]');
      const regExp = /.csv$||.txt$/;
      if (regExp.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result.split(/\n/);
          inputX.value = data[0];
          inputY.value = data[1];
        };
        reader.readAsText(file);
      } else {
        this.modalMessage.innerHTML = 'Escolha um arquivo no formato csv';
        MicroModal.show('modal-1');
      }
    } else {
      this.modalMessage.innerHTML = 'Seu navegador nao suporta essa funcionalidade';
      MicroModal.show('modal-1');
    }
  }

  recoverData() {
    this.dataX.name = document.querySelector('[data-cr-name-x]').value;
    this.dataY.name = document.querySelector('[data-cr-name-y]').value;
    this.dataX.value = document.querySelector('[data-cr-x]').value.replace(/,/g, '.');
    this.dataY.value = document.querySelector('[data-cr-y]').value.replace(/,/g, '.');
  }

  validateData() {
    const regExpNumber = /^[\d]+([;,.][\d]+)*$/;

    if (!this.dataX.name || !this.dataY.name || !this.dataX.value || !this.dataY.value) { // eslint-disable-line
      this.modalMessage.innerHTML = 'Preencha todos os campos!!!';
      MicroModal.show('modal-1');
    } else if (!regExpNumber.test(this.dataX.value) || !regExpNumber.test(this.dataY.value)) {
      this.modalMessage.innerHTML = 'Preencha todos os corretamente!!!';
      MicroModal.show('modal-1');
    } else {
      this.convertData();
      if (this.dataX.value.length !== this.dataY.value.length) {
        this.modalMessage.innerHTML = 'Parece que a quantidade de históricos da variável dependente esta diferente da variável independente.' // eslint-disable-line
        MicroModal.show('modal-1');
      } else {
        this.generateMatrix();
        this.generateR();
        this.regression();
        this.futureProjection();
        this.createResult();
        this.createChart();
        this.appendResult();
      }
    }
  }

  convertData() {
    this.dataX.value = this.dataX.value.split(/;/);
    this.dataY.value = this.dataY.value.split(/;/);
    this.dataX.value = this.dataX.value.map(num => parseFloat(num));
    this.dataY.value = this.dataY.value.map(num => parseFloat(num));
  }

  generateMatrix() {
    this.dataX.somX = null;
    this.dataY.somY = null;
    this.dataX.somXsqr = null;
    this.dataY.somYsqr = null;
    this.dataXY = null;

    for (let index = 0; index < this.dataX.value.length; index += 1) {
      this.dataX.somX += this.dataX.value[index];
      this.dataY.somY += this.dataY.value[index];
      this.dataX.somXsqr += Math.pow(this.dataX.value[index], 2); // eslint-disable-line
      this.dataY.somYsqr += Math.pow(this.dataY.value[index], 2); // eslint-disable-line
      this.dataXY += (this.dataX.value[index] * this.dataY.value[index]);
    }
  }

  generateR() {
    const size = this.dataX.value.length;
    this.dataR = (size * this.dataXY) - (this.dataX.somX * this.dataY.somY);

    const qd1 = (size * this.dataX.somXsqr) - Math.pow(this.dataX.somX, 2); // eslint-disable-line
    const qd2 = (size * this.dataY.somYsqr) - Math.pow(this.dataY.somY, 2); // eslint-disable-line

    this.dataR = this.dataR / Math.sqrt(qd1 * qd2);
    this.dataR = this.dataR * 100;
    this.dataR = Math.round(this.dataR);
    this.dataR = this.dataR / 100;

    if (this.dataR < 0.3) {
      this.rateR = 'inexistente ou muito fraca';
    } else if (this.dataR >= 0.3 && this.dataR < 0.6) {
      this.rateR = 'fraca';
    } else if (this.dataR >= 0.6 && this.dataR <= 1) {
      this.rateR = 'média a forte';
    }
  }

  regression() {
    const size = this.dataX.value.length;
    this.dataA = (size * this.dataXY) - (this.dataX.somX * this.dataY.somY);
    const qd1 = (size * this.dataX.somXsqr) - Math.pow(this.dataX.somX, 2); // eslint-disable-line
    this.dataA = (this.dataA / qd1).toFixed(2);
    this.dataB = (this.dataY.somY / size) - (this.dataA * (this.dataX.somX / size));
    this.dataB = (Math.round(this.dataB * 100)) / 100;
  }

  futureProjection() {
    this.containerFuture.innerHTML = '';
    this.inputX.addEventListener('keyup', (e) => { this.listenerX(e); });
    this.inputY.addEventListener('keyup', (e) => { this.listenerY(e); });

    const title = document.createElement('h2');
    const nodeTitle = document.createTextNode('Calculo de projeção futura');
    const elemA = document.createElement('p');
    const nodeA = document.createTextNode(` = ${this.dataA} x`);
    const elemB = document.createElement('p');
    const nodeB = document.createTextNode(`+${this.dataB}`);

    title.appendChild(nodeTitle);
    elemA.appendChild(nodeA);
    elemB.appendChild(nodeB);

    title.classList.add('c-projection__title');
    elemA.classList.add('c-projection__text');
    elemB.classList.add('c-projection__text');
    this.inputX.classList.add('c-projection__input');
    this.inputY.classList.add('c-projection__input');
    this.containerFuture.classList.add('c-projection');

    this.containerFuture.appendChild(title);
    this.containerFuture.appendChild(this.inputY);
    this.containerFuture.appendChild(elemA);
    this.containerFuture.appendChild(this.inputX);
    this.containerFuture.appendChild(elemB);
  }

  listenerX(e) {
    if (this.inputX.value === '') {
      this.inputY.value = '';
    } else {
      this.valueX = e.currentTarget.value;

      this.valueY = ((this.dataA * this.valueX) + this.dataB).toFixed(2);
      this.inputY.value = this.valueY;
    }
  }

  listenerY(e) {
    if (this.inputY.value === '') {
      this.inputX.value = '';
    } else {
      this.valueY = e.currentTarget.value;
      this.valueX = ((this.valueY - this.dataB) / this.dataA).toFixed(2);
      this.inputX.value = this.valueX;
    }
  }

  createResult() {
    this.containerResult.innerHTML = '';
    this.result = this.crTemplate({
      cr: this.dataR,
      crNvl: this.rateR,
      equaCR: `y = ${this.dataA}x + ${this.dataB}`,
    });

    const resultCells = document.createElement('div');

    resultCells.innerHTML = this.result;

    this.containerResult.appendChild(resultCells);
    this.containerResult.appendChild(this.containerFuture);
  }

  createChart() {
    this.canvasHolder.innerHTML = '';

    const canvas = document.createElement('canvas');
    let yMenor = this.dataY.value[0];
    let yMaior = 0;
    const scatter = [];

    for (let index = 0; index < this.dataX.value.length; index += 1) {
      scatter.push({ x: this.dataX.value[index], y: this.dataY.value[index] });

      if (this.dataY.value[index] < yMenor) { yMenor = this.dataY.value[index]; }
      if (this.dataY.value[index] > yMaior) { yMaior = this.dataY.value[index]; }
    }

    const scatterChart = new Chart(canvas, { // eslint-disable-line
      type: 'scatter',
      data: {
        datasets: [{
          label: 'X e Y',
          data: scatter,
          backgroundColor: '#470097',
        },
        {
          type: 'line',
          label: 'Projeção',
          data: [{
            x: (yMaior - this.dataB) / this.dataA,
            y: yMaior,
          },
          {
            x: (yMenor - this.dataB) / this.dataA,
            y: yMenor,
          }],
          showLine: true,
          backgroundColor: 'rgba(0,0,255,0)',
          pointBorderColor: 'rgba(0,0,255,0)',
          borderColor: '#1aaad8',
        }],
      },
      options: {
        scales: {
          yAxes: [{
            beginAtZero: true,
          }],
          xAxes: [{
            beginAtZero: true,
          }],
        },
      },
    });

    this.canvasHolder.appendChild(canvas);
  }

  appendResult() {
    if (this.containerResult !== undefined) {
      if (this.holderResult.className.indexOf('is-active') === -1) {
        this.holderResult.classList.add('is-active');
      }

      this.holderResult.querySelector('[data-table-result]').innerHTML = '';
      this.holderResult.querySelector('[data-table-result]').appendChild(this.containerResult);
      /* setTimeout(() => {
        Jump('.s-section--result');
      }, 500); */
    }
  }
}

export default {
  create() {
    return new CorrelationNRegression();
  },
};

export const Class = CorrelationNRegression;
