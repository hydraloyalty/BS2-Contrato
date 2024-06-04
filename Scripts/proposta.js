function formatValue(value) {
            return value.replace(/[^\d,]/g, '').replace(',', '.');
        }

        function formatToBRL(value) {
            return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function formatPercentage(value) {
            return value.toFixed(2).replace('.', ',') + '%';
        }

        function calcular() {
            const iValor = document.getElementById('i-valor').value;
            const iParcelas = document.getElementById('i-parcelas').value;
			const iCarencia = document.getElementById('i-carencia').value;

            const m2 = parseFloat(formatValue(iValor)) || 0;
            const n2 = parseInt(iParcelas) || 0;
            const o2 = 0.0075; // 0,75%
			
			document.getElementById('prazo-carencia').innerText = iCarencia;

            if (n2 > 0) {
                const p2 = m2 * (o2 / (1 - Math.pow(1 + o2, -n2)));
                const q2 = p2 * n2;
                const propostaJuros = q2 - m2;

                document.getElementById('valor').innerText = formatToBRL(m2);
                document.getElementById('parcelas').innerText = n2;
                document.getElementById('proposta-parcelas').innerText = formatToBRL(p2);
                document.getElementById('proposta-juros').innerText = formatToBRL(propostaJuros);
                document.getElementById('proposta-devido').innerText = formatToBRL(q2);
                document.getElementById('taxa-juros').innerText = formatPercentage(o2 * 100);
            } else {
                document.getElementById('valor').innerText = '';
                document.getElementById('parcelas').innerText = '';
                document.getElementById('proposta-parcelas').innerText = '';
                document.getElementById('proposta-juros').innerText = '';
                document.getElementById('proposta-devido').innerText = '';
                document.getElementById('taxa-juros').innerText = '';
            }
        }
		
        document.getElementById('i-valor').addEventListener('input', calcular);
        document.getElementById('i-parcelas').addEventListener('input', calcular);
		document.getElementById('i-carencia').addEventListener('input', calcular);