const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().split('\n')
const testsCount = Number(data[0].split(' ')[1]);
const array = data[1].split(' ').map(v => Number(v));
let tests = [];
for (let i = 0; i < testsCount; i++) {
	tests.push(data[i+2].split(' ').map(v => Number(v)))
}

let result = [];
tests.forEach(test => {
    let pivot = array[test[0]];
    for (let i = test[0]+1; i <= test[1]; i++) {
      if (array[i] !== pivot) {
        result.push(Math.max(array[i], pivot))
        return;
      }
    }
    
  	result.push('NOT FOUND')
	
})


fs.writeFileSync("output.txt", result.join('\n'))