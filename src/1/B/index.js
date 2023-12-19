const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n');
const length = Number(data[0]);
const array = data[1].split(' ').map(v => Number(v))

function partition(array, from, to, x) {
  let e = from, g = from;
  
  for (let i = from; i < to; i++) {
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
  return [e,g]
}

function quickSort(array, from = 0, to = array.length) {
	if (to-from <= 1) {
    	return array;
    }
    const random = array[Math.floor(from + Math.random()*(to-from))]

    let [e,g] = partition(array, from, to, random)

    quickSort(array, from, e)
    quickSort(array, g, to)
    return array
}


if (length != 0) {
	fs.writeFileSync("output.txt", quickSort(array).join(' '));
}

