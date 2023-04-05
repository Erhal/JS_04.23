// FIRST TASK

let inputNum = '';

while (true) {
    inputNum = prompt('Enter a number:')?.trim();

    // Check if the input is a finite number, not empty, not negative, and not a decimal
    if (
        isFinite(inputNum) &&
        inputNum !== '' &&
        inputNum >= 0 &&
        inputNum % 1 === 0
    ) {
        break;
    } else {
        console.log('Incorrect input!');
    }
}

const NUM = Number(inputNum);

let factorial = 1;
for (let i = 2; i <= NUM; i++) {
    factorial *= i;
}

let isPrime = true;
if (NUM < 2) {
    isPrime = false;
} else {
    for (let i = 2; i <= Math.sqrt(NUM); i++) {
        if (NUM % i === 0) {
            isPrime = false;
            break;
        }
    }
}

let delimiters = [];
for (let i = 1; i <= NUM; i++) {
    if (NUM % i === 0) {
        delimiters.push(i);
    }
}

console.log(`Number: ${NUM}`);
console.log(`Factorial: ${factorial}`);
console.log(`Square: ${NUM * NUM}`);
console.log(`isPrime: ${isPrime}`);
console.log(`isEven: ${NUM % 2 === 0}`);
console.log(
    NUM !== 0
        ? `Delimiters: ${delimiters.reverse().join(', ')}`
        : 'Delimiters: 0 have no delimiters',
);
