document.addEventListener("DOMContentLoaded", function() {
	const inputGerente = document.getElementById('i-gerente');
	const gerente = document.getElementById('gerente');

	// Function to update the text content
	function updateGerenteText() {
		const value = inputGerente.value;
		const displayValue = value.trim() === '' ? '[Gerente]' : value;
		gerente.innerText = displayValue;
	}

	// Initial call to set the text when the page loads
	updateGerenteText();

	// Event listener to update the text whenever the input value changes
	inputGerente.addEventListener('input', updateGerenteText);
});
