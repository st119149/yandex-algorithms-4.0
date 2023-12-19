const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n')

const array = data[1].split(' ').map(v => Number(v));


function merge(left, right) {
    let arr = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    return [...arr, ...left,...right]
}

function mergeSort(array) {
  const half = array.length / 2
  
  if(array.length <= 1){
    return array 
  }
 
  const left = array.splice(0, half)

  return merge(left.length > 1 ? mergeSort(left) : left, array.length > 1 ? mergeSort(array) : array)
}


if (!Number(data[0])) {
	fs.writeFileSync("output.txt", '')
} else {
	fs.writeFileSync("output.txt", mergeSort(array).join(' '))
}

