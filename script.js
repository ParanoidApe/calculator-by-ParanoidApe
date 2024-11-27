document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('calc-display');
    let currentInput = '';

    // Function to handle input (both button clicks and keyboard input)
    const handleInput = (value) => {
        if (value === 'C') {
            currentInput = '';
        } else if (value === '=') {
            try {
                currentInput = eval(currentInput); // Evaluate the expression
            } catch {
                currentInput = 'Error';
            }
        } else {
            currentInput += value;
        }
        display.value = currentInput;
    };

    // Handle button clicks
    document.querySelector('.buttons').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            handleInput(e.target.textContent);
        }
    });

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        const code = e.code;

        // Map numpad and regular keys to calculator buttons
        if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
            handleInput(key);
        } else if (code.startsWith('Numpad') && code !== 'NumpadEnter') {
            handleInput(code.replace('Numpad', '')); // Map Numpad keys (excluding Enter)
        } else if (key === 'Enter' || code === 'NumpadEnter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1); // Remove last character
            display.value = currentInput;
        } else if (key === 'Escape') {
            handleInput('C'); // Clear the input
        }

        // Highlight the corresponding button
        const button = [...document.querySelectorAll('button')].find(btn =>
            btn.textContent === key || 
            (key === 'Enter' && btn.textContent === '=') || 
            (code === 'NumpadEnter' && btn.textContent === '=')
        );
        if (button) {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 100); // Remove highlight
        }
    });
});
