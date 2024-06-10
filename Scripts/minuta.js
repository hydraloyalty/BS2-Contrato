document.addEventListener('DOMContentLoaded', function () {
    const botaoImprimir = document.getElementById('minuta');
    const secaoConfig = document.querySelector('.config');
    const documento = document.getElementById('documento');
    const capa = document.getElementById('capa');
    const pagina1 = document.getElementById('pagina1');
    const pagina2 = document.getElementById('pagina2');
    const pagina3 = document.getElementById('pagina3');
    const contracapa = document.getElementById('contracapa');

    const inputsConfig = document.querySelectorAll('.input-config');
    const inputsRequeridos = ['i-rs', 'i-cnpj', 'i-gerente'].map(id => document.getElementById(id));

    const elementosTexto = [
        { id: 'valor', texto: 'VALOR DO CRÉDITO' },
        { id: 'parcelas', texto: 'PARCELAS' },
        { id: 'proposta-parcelas', texto: 'VALOR DAS PARCELAS' },
        { id: 'prazo-carencia', texto: 'DIAS DE CARÊNCIA' },
        { id: 'proposta-juros', texto: 'VALOR TOTAL DE JUROS' },
        { id: 'proposta-devido', texto: 'VALOR TOTAL DEVIDO' },
        { id: 'taxa-juros', texto: 'TAXA DE JUROS' },
        { id: 'banco', texto: '' },
        { id: 'agencia', texto: '' },
        { id: 'conta', texto: '' },
        { id: 'dia', texto: 'DIA' },
        { id: 'mes', texto: 'MÊS' },
        { id: 'ano', texto: 'ANO' }
    ];

    const elementosOcultar = ['a-gerente', 'a-diretor', 'selo'].map(id => document.getElementById(id));

    const verificarInputsPreenchidos = () => inputsRequeridos.every(input => input.value);

    const validarInputs = () => {
        if (!verificarInputsPreenchidos()) {
            botaoImprimir.classList.add('minuta-desabilitado');
            botaoImprimir.classList.remove('minuta-habilitado');
        } else {
            botaoImprimir.classList.add('minuta-habilitado');
            botaoImprimir.classList.remove('minuta-desabilitado');
        }
    };

    inputsConfig.forEach(input => input.addEventListener('input', validarInputs));

    if (botaoImprimir && secaoConfig) {
        botaoImprimir.addEventListener('click', () => {
            if (!verificarInputsPreenchidos()) {
                alert('Você precisa preencher os campos de Gerente, CNPJ e Razão Social para baixar a Minuta de Contrato.');
                return;
            }

            secaoConfig.classList.add('ocultar-na-impressao');
            documento.style.gridTemplateColumns = 'auto';
            documento.style.gap = '0px';

            const elements = [capa, pagina1, pagina2, pagina3, contracapa];
            elements.forEach(el => el.style.border = '0px solid #00003F');

            elementosTexto.forEach(item => {
                const el = document.getElementById(item.id);
                if (el) {
                    el.dataset.originalText = el.textContent;
                    el.textContent = item.texto;
                }
            });

            elementosOcultar.forEach(el => {
                if (el) {
                    el.dataset.originalDisplay = el.style.display;
                    el.style.display = 'none';
                }
            });

            window.print();

            setTimeout(() => {
                secaoConfig.classList.remove('ocultar-na-impressao');
                documento.style.gridTemplateColumns = 'auto auto';
                documento.style.gap = '2px';

                elements.forEach(el => el.style.border = '2px solid #00003F');

                elementosTexto.forEach(item => {
                    const el = document.getElementById(item.id);
                    if (el && el.dataset.originalText !== undefined) {
                        el.textContent = el.dataset.originalText;
                    }
                });

                elementosOcultar.forEach(el => {
                    if (el && el.dataset.originalDisplay !== undefined) {
                        el.style.display = el.dataset.originalDisplay;
                    }
                });
            }, 500);

            botaoImprimir.classList.toggle('exportado');
        });

        validarInputs();
    }
});
