document.addEventListener('DOMContentLoaded', (event) => {
            const inputs = {
                'i-cnpj': 'cnpj',
                'i-rs': 'razaosocial',
                'i-banco': 'banco',
                'i-agencia': 'agencia',
				'i-conta': 'conta'
            };

            for (let inputId in inputs) {
                let inputElement = document.getElementById(inputId);
                let targetId = inputs[inputId];
                let targetElement = document.getElementById(targetId);

                // Store the original content of the target element
                targetElement.dataset.originalContent = targetElement.textContent;

                inputElement.addEventListener('input', () => {
                    if (inputElement.value.trim() === '') {
                        targetElement.textContent = targetElement.dataset.originalContent;
                    } else {
                        targetElement.textContent = inputElement.value;
                    }
                });
            }
        });