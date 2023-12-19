const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const data = fileContent.toString().split(' ').map(v => Number(v))

const mData = [ data[0]*data[3], data[1]*data[3], data[2]*data[1], data[3]*data[1] ]

let result = [mData[0]+mData[2], mData[1]]

for (let i = 2; i <= mData[0]; i++) {
	if (result[0]%i === 0 && result[1]%i === 0) {
    	result[0] /= i;
        result[1] /= i
        i--;
    }
    
}


fs.writeFileSync("output.txt", result.join(' '))