const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n');
const rowsCount = Number(data[0].split(' ')[0]);
let array = [];

for (let i = 1; i <= rowsCount; i++) {
  array.push(data[i].split(' ').map(v => Number(v)))
}

function getSquareLength(array) {
  let dp = new Array(rowsCount).fill(1).map(v => []);
  let max = 0;
  
  for (let i = 0; i < array.length; i++) {
   
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 0) {
        dp[i][j] = 0
      } else {
        dp[i][j] = Math.min(dp[i-1]?.[j-1] ?? 0, dp[i-1]?.[j] ?? 0, dp[i]?.[j-1] ?? 0) + 1;
        max = Math.max(dp[i][j],max)
      }
    } 
  }
  return max
  
}


fs.writeFileSync("output.txt", getSquareLength(array).toString())