'use strict';

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout,
});

const coeff = [];

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
    } else if (arg === '0' && coeff.length === 0) {
        console.log('Error! a cannot be 0!');
        askFunc();
    } else {
        arg = +arg;
        coeff.push(arg);
    }

    if (coeff.length === 3) {
        rl.close();
        solver(coeff);
    }
}


