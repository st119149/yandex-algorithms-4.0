const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().trim();

let temp = [];

for (let i = 0; i < data.length; i++) {
  if (
    data[i] === ')' && temp[temp.length-1] === '(' ||
    data[i] === ']' && temp[temp.length-1] === '[' ||
    data[i] === '}' && temp[temp.length-1] === '{'
  ) {
      temp.pop();
      continue;
  }
  temp.push(data[i]);
}




fs.writeFileSync("output.txt", temp.length ? 'no' : 'yes')