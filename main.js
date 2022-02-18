'use strict';

const readline = require('readline');

const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout,
});

const coef = [];

rl.question('Choose mode: for interactice press "0", for file mode - "1"...\n', num => {
    if (num === '0') interactiveMode();
    else if (num === '1') console.log('will be soon...');
    else console.log('You entered invalid number! Try again')
})

const interactiveMode = () => {
    console.log('Please insert coefficients:'); 
    askFunc();
}
 
const askFunc = () => {
    rl.question('a = ', a => {
        checkInput(a);
        rl.question('b = ', b => {
            checkInput(b);
            rl.question('c = ', c => {
                checkInput(c);
            });
        });
    });    
}

const checkInput = arg => {
    if (isNaN(arg)) {
        console.log(`Error. Expected a valid real number, got ${arg} instead`);
    } else if (arg === '0' && coef.length === 0) {
        console.log('Error! a cannot be 0!');
        askFunc();
    } else {
        arg = +arg;
        coef.push(arg);
    }

    if (coef.length === 3) {
        rl.close();
        solver(coef);
    }
}
const solver = ([...args]) => {
    let x1;
    let x2;
    
    const a = args[0];
    const b = args[1];
    const c = args[2];

    let eq =`(${a})x^2 + (${b})x + (${c}) = 0`;
    const d = b*b - 4*a*c;

    console.log(`Equation is: ${eq}`);

    if (d < 0) console.log('There are no roots(')
    else if (d === 0) {
        x1 = -b/(2*a);
        console.log(`There is one root:\nx = ${x1}`)
    }
    else if (d > 0) {
        x1 = (-b + Math.sqrt(d))/(2*a);
        x2 = (-b - Math.sqrt(d))/(2*a);
        console.log(`There are two roots:\nx1 = ${x1}\nx2 = ${x2}`)
    }
}
