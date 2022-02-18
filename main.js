'use strict';

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

solver([1,2,3]);