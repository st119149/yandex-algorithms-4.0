const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const data = fileContent.toString().split('\n')

const [firstCount, secondCount] = [Number(data[0]), Number(data[2])]
const [first, second] = [data[1].split(' ').map(v => Number(v)), data[3].split(' ').map(v => Number(v))]


let result = [];
let [firstIndex, secondIndex] = [0, 0];

console.log(firstCount,secondCount)

if (!firstCount) {
  result = second
} else if (!secondCount) {
	result = first

}
else {
for (let i = 0; i < first.length + second.length; i++) {
    if ((first[firstIndex] ?? Infinity) < (second[secondIndex] ?? Infinity) && firstIndex < first.length) {
        result.push(first[firstIndex]);
        firstIndex++;
    } else if (secondIndex < second.length) {
        result.push(second[secondIndex]);
        secondIndex++;
    }
}

}


fs.writeFileSync("output.txt", result.join(' '))