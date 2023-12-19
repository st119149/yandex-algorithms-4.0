const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let [count, array, x] = fileContent.toString().split('\n');

array = array.split(' ').map(v => Number(v));
x = Number(x);
count = Number(count);



function partition(array, x) {
  let e = 0, g = 0;
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] === x) {
      [array[g], array[i]] = [array[i], array[g]];
      g++;
    }
    
    if (array[i] < x) {
      [array[g], array[i]] = [array[i], array[g]];
      [array[e], array[g]] = [array[g], array[e]];
      g++;
      e++;
    }
  }
  //return array
  return e
}

const less = partition(array,x);
const bigger = array.length - partition(array,x)


fs.writeFileSync("output.txt", count === 0 ? '0\n0' : [less,bigger].join('\n'))