const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
const [a,b,n] = fileContent.toString().trim().split('\n').map(Number);


if (a > Math.ceil(b/n)) {
	fs.writeFileSync("output.txt", "Yes")
} else {
	fs.writeFileSync("output.txt", "No")
}
	  


