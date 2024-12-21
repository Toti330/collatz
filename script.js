document.getElementById('startButton').addEventListener('click', () => {
    const input = document.getElementById('numberInput');
    const number = parseInt(input.value);
    
    if (isNaN(number) || number <= 0) {
        alert('Please enter a positive integer!');
        return;
    }

    document.querySelector('.chatbox').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.chatbox').style.display = 'none';
        animateCollatz(number);
    }, 500);
});

function animateCollatz(number) {
    const outputContainer = document.getElementById('outputContainer');
    let currentNumber = number;
    let step = 0;

    function displayStep() {
        const stepContainer = document.createElement('div');
        stepContainer.classList.add('step-container');
        
        // Display current number in a circle
        const numberCircle = document.createElement('div');
        numberCircle.classList.add('number-circle');
        numberCircle.textContent = currentNumber;
        stepContainer.appendChild(numberCircle);

        // Display arrow
        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrow.textContent = '→';  // You can replace this with a more complex arrow graphic if you prefer
        stepContainer.appendChild(arrow);

        // Display the Collatz equation
        const equation = document.createElement('div');
        if (currentNumber % 2 === 0) {
            equation.textContent = `${currentNumber} is even, divide by 2 → ${currentNumber / 2}`;
        } else {
            equation.textContent = `${currentNumber} is odd, multiply by 3 and add 1 → ${3 * currentNumber + 1}`;
        }
        stepContainer.appendChild(equation);
        
        outputContainer.appendChild(stepContainer);
        
        // Calculate next step
        if (currentNumber === 1) {
            const endText = document.createElement('div');
            endText.textContent = "End";
            outputContainer.appendChild(endText);
        } else {
            currentNumber = (currentNumber % 2 === 0) ? currentNumber / 2 : 3 * currentNumber + 1;
            step++;
            setTimeout(displayStep, 1000); // Recursively display next step after a delay
        }

        // Scroll to the bottom after each step
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }
    
    displayStep();  // Start the animation
}
