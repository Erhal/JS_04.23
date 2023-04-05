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


// SECOND TASK

let characters = '';
let count = 0;

while (true) {
    characters = prompt(
        'Enter the first value (not more than 3 characters and not less than 1, no spaces):',
    );

    // Check if the input is not less than 1 character, not more than 3 characters, and no spaces
    if (
        characters?.length >= 1 &&
        characters?.length <= 3 &&
        characters.indexOf(' ') === -1
    ) {
        break;
    } else {
        console.log('Incorrect input!');
    }
}

while (true) {
    count = Number(
        prompt(
            'Enter the second value (only a positive number greater than 0 and less than 10):',
        ),
    );

    // Check if the input is a number, more than 0, less than 10, and not a decimal
    if (!isNaN(count) && count > 0 && count < 10 && count % 1 === 0) {
        break;
    } else {
        console.log('Incorrect input!');
    }
}

const RESULT = new Array(count).fill(`${characters} `.repeat(count)).join('\n');

console.log(RESULT);