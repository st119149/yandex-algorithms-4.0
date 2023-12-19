const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n')

const testsCount = Number(data[0])

let tests = [];

for (let i = 0; i < testsCount; i++) {
  tests.push(data[i+1].split(' ').map(v => Number(v)))
}

let result = [];

tests.forEach(test => {
  
  const [count, min, max] = test;
  
  let freeSlot = count % min,
      slotsCount = Math.floor(count/min);
      
  freeSlot -= (max-min)*slotsCount;

  
  result.push(freeSlot > 0 ? 'NO' : 'YES')
  
})



fs.writeFileSync("output.txt", result.join('\n'))