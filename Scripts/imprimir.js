document.addEventListener('DOMContentLoaded', function () {
    const botaoImprimir = document.getElementById('botao-imprimir');
    const secaoConfig = document.querySelector('.config');
    const documento = document.getElementById('documento');
    const capa = document.getElementById('capa');
	const pagina1 = document.getElementById('pagina1');
	const pagina2 = document.getElementById('pagina2');
	const pagina3 = document.getElementById('pagina3');
	const contracapa = document.getElementById('contracapa');

    var inputsConfig = document.querySelectorAll('.input-config');

    const verificarInputsPreenchidos = () => Array.from(inputsConfig).every(input => input.value);
    const validarInputs = () => {
        if (verificarInputsPreenchidos()) {
            botaoImprimir.classList.add('botao-habilitado');
            botaoImprimir.classList.remove('botao-desabilitado');
        } else {
            botaoImprimir.classList.add('botao-desabilitado');
            botaoImprimir.classList.remove('botao-habilitado');
        }
    };

    inputsConfig.forEach(input => input.addEventListener('input', validarInputs));

    if (botaoImprimir && secaoConfig) {
        botaoImprimir.addEventListener('click', () => {
            if (!verificarInputsPreenchidos()) {
                alert('Você precisa preencher todos os campos para exportar esse documento.');
                return;
            }

            secaoConfig.classList.add('ocultar-na-impressao');

            documento.style.gridTemplateColumns = "auto";
            documento.style.gap = "0px";

            var elements = [capa, pagina1, pagina2, pagina3, contracapa];
            elements.forEach(function (el) {
                el.style.border = "0px solid #00003F";
            });

            // Dispara a impressão
            window.print();

            // Espera um pouco antes de remover a classe (por exemplo, 500 milissegundos)
            setTimeout(function () {
                secaoConfig.classList.remove('ocultar-na-impressao');

                documento.style.gridTemplateColumns = "auto auto";
                documento.style.gap = "2px";

                elements.forEach(function (el) {
                    el.style.border = "2px solid #00003F";
                });
            }, 500);

            // Adiciona ou remove a classe 'exportado' ao botão de exportar
            botaoImprimir.classList.toggle('exportado');
        });

        // Verifica se os inputs estão preenchidos inicialmente
        validarInputs();
    }
});
