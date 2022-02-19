'use strict';

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout,
});

let coef;

rl.question('Choose mode: for interactice press "0", for file mode - "1"...\n', num => {
    if (num === '0') interactiveMode();
    else if (num === '1') fileMode();
    else {
        console.log('You entered invalid number!');
        process.exit(1);
    }
})

const interactiveMode = () => {
    console.log('Please insert coefficients:'); 
    askFunc();
}
 
const fileMode = () => {
    rl.question(
        `Please enter the name of txt file with coefficients (e.g. test.txt)\nIt should contain information like this: 1 0 0\n`,
         fileName => {
             if (fs.existsSync(fileName)) {
                const data = fs.readFileSync(fileName, 'utf8');
                const strData = data.split(' ');
                const coef = strData.map(parseFloat);

                for (const el of coef) {
                    if (coef[0] === 0) {
                        console.log('Error! a cannot be 0!');
                        process.exit(1);
                    } else if (isNaN(el)) {
                        console.log(`Wrong type. Expected a valid real number, got ${el} instead`);
                        process.exit(1);
                    }
                }
                solver(coef);

            } else {
                console.log(`File ${fileName} doesn't exist or has invalid format`);
                process.exit(1);
            }
         })
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
    process.exit(1);
}
