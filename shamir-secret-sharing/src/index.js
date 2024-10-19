const fs = require('fs');

function readInput(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(points, k) {
    let secret = 0;

    for (let i = 0; i < k; i++) {
        let x_i = points[i].x;
        let y_i = points[i].y;

        let term = y_i;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j].x) / (x_i - points[j].x);
            }
        }
        secret += term;
    }

    return Math.round(secret);
}

function main() {
    const input = readInput('./data/input.json'); 

    const n = input.keys.n;
    const k = input.keys.k;

    let points = [];
    
    for (let i = 1; i <= n; i++) {
        const root = input[i.toString()];
        const base = root.base;
        const value = root.value;

        const x = parseInt(i); 
        const y = decodeValue(base, value); 
        points.push({ x, y });
    }

    const secret = lagrangeInterpolation(points, k);
    console.log(`The constant term (c) is: ${secret}`);

    fs.writeFileSync('./output/results.txt', `The constant term (c) is: ${secret}`);
}

main();
