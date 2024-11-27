document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('calc-display');
    let currentInput = '';
    
    document.querySelector('.buttons').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const value = e.target.textContent;
            
            if (value === 'C') {
                currentInput = '';
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput);
                } catch {
                    currentInput = 'Error';
                }
            } else {
                currentInput += value;
            }
            
            display.value = currentInput;
        }
    });
});