const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8").toString();

const data = fileContent.trim().split('\n'), 
      vCount = Number(data[0]),
      matrix = data.slice(1).map(str => str.trim().split(' ').map(Number));

function getMax(matrix) {
  let result = {sum:0, parts: []},
      sums = {};
  
  function getSums(parts, sums) {
    let last = parts[parts.length-1],
        lastI = parts.length-1;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] !== last) {
        sums[i] += matrix[i][lastI]
      }
    }
    return sums;
  }
  
  function foo(parts = [2], sums = [...Array(matrix.length).fill(0)]) {
    let calculatedSums = getSums(parts, sums)
    if (parts.length === vCount) {
      let sum = calculatedSums.reduce((acc,v) => acc+v,0)
      if (sum > result.sum)
        result = {sum,parts}
      return;
    }
    foo(parts.concat(2), [...calculatedSums])
    foo(parts.concat(1), [...calculatedSums])
  }
  foo();
  
  return result;
}
      
const result = getMax(matrix)
fs.writeFileSync("output.txt", result.sum + '\n' + result.parts.join(' '))
