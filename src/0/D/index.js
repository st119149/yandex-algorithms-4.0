const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const [first,second] = fileContent.toString().split('\n')


let chars = {};

for (let i = 0; i < first.length; i++) {
	chars[first[i]] = !chars[first[i]];
    chars[second[i]] = !chars[second[i]];
}

let isAnagram = true;
for (let char in chars) {
	if (chars[char]) {
    	isAnagram = false;
    }
}



fs.writeFileSync("output.txt", isAnagram ? 'YES' : 'NO')