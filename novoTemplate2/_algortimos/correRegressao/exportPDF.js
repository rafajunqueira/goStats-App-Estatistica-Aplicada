import html22pdf from 'html2pdf.js';

class ExportPDF {
  constructor() {
    this.elm = document.querySelector('[data-export-pdf]');
    this.loading = document.querySelector('[data-export-load]');
    this.instances = null;
    this.content = null;
    this.setup();
  }

  setup() {
    this.elm.addEventListener('click', () => {
      this.loading.classList.add('is-active');

      setTimeout(() => {
        this.loading.classList.remove('is-active');
        html22pdf(document.querySelector('[data-content-pdf]'), {
          filename: 'resultados_Fantastic.pdf',
          html2canvas: { width: 970 },
          jsPDF: { orientation: 'portrait', formart: 'a4' },
        });
      }, 2000);
    });
  }
}

export default {
  create() {
    return new ExportPDF();
  },
};

export const Class = ExportPDF;
