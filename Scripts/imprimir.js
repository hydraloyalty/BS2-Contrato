 document.addEventListener('DOMContentLoaded', function () {

    var botaoImprimir = document.getElementById('botao-imprimir');
    var secaoConfig = document.querySelector('.config');
	var documento = document.getElementById('documento');
    var capa = document.getElementById('capa');
	var pagina1 = document.getElementById('pagina1');
	var pagina2 = document.getElementById('pagina2');
	var pagina3 = document.getElementById('pagina3');
	var contracapa = document.getElementById('contracapa');

    var inputsConfig = document.querySelectorAll('.input-config');

    // Função para verificar se todos os inputs estão preenchidos
    function verificarInputsPreenchidos() {
        var todosPreenchidos = true;
        inputsConfig.forEach(function (input) {
            if (!input.value) {
                todosPreenchidos = false;
            }
        });
        return todosPreenchidos;
    }

    // Função para lidar com a validação dos inputs
    function validarInputs() {
        var todosPreenchidos = verificarInputsPreenchidos();
        if (todosPreenchidos) {
            botaoImprimir.disabled = false; // Habilita o botão de exportar se todos os inputs estiverem preenchidos
        } else {
            botaoImprimir.disabled = true; // Desabilita o botão de exportar se algum input não estiver preenchido
        }
    }

    // Adiciona um listener de evento a cada input para validar quando o conteúdo muda
    inputsConfig.forEach(function (input) {
        input.addEventListener('input', validarInputs);
    });

    if (botaoImprimir && secaoConfig) {
        botaoImprimir.addEventListener('click', function () {
            // Adiciona uma classe para ocultar a seção de configuração
            secaoConfig.classList.add('ocultar-na-impressao');
			
			documento.style.gridTemplateColumns  = "auto";
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