const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const array = fileContent.toString().split('\n')[1].split(' ').map(v => Number(v))

const result = [], less = [0], bigger = [];
bigger[array.length-1] = 0;

for (let i = 1; i < array.length; i++) {
  less[i] = (i) * (array[i]-array[i-1]) + less[i-1]
}

for (let i = array.length-2; i >= 0; i--) {
  bigger[i] = bigger[i+1] + (array.length-1-i)*(array[i+1] - array[i])
}

for (let i = 0; i < array.length; i++) {
  result[i] = less[i] + bigger[i]
}


fs.writeFileSync("output.txt", result.join(' '))