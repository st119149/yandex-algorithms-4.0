const fs = require('fs')
let count = Number(fs.readFileSync("input.txt", "utf8").toString());

function getNums(count) {
  let result = [];
  let arr = Array(count).fill(1).map((v,i) => i+1);
  
  const foo = (temp = '') => {
  	if (temp.length === count) {
   		result.push(temp)
      return;
   	}
      
     for (let num of arr) {
    	if (!temp.includes(num))
    		foo(temp.concat(num));
    }
  }
  foo();
  return result;
}



fs.writeFileSync("output.txt", getNums(count).join('\n').trim())