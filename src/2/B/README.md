[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## B. Основание строки
Строка S была записана много раз подряд, после чего от получившейся строки взяли префикс и дали вам. Ваша задача определить минимально возможную длину исходной строки S.

### Формат ввода
В первой и единственной строке входного файла записана строка, которая содержит только латинские буквы, длина строки не превышает 50000 символов. 

### Формат вывода
Выведите ответ на задачу.
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString().trim();

let string = fileContent;

let n = string.length,
	p = 1e7+7,
    x_ = 33,
    h = [0],
    h2 = [0],
    x = [1],
    x2=[1];
string = ' ' + string;
 
for (let i = 1; i <= n; i++) {
	h[i] = (h[i-1] * x_ + string.charCodeAt(i)) % p;
    x[i] = (x[i-1] * x_) % p;
}

function isEqual(from1, from2, slen) {
	return ( 
	      ( (h[from1 + slen - 1] + h[from2 -1]*x[slen]) % p  === 
	      (h[from2 + slen - 1] + h[from1 - 1]*x[slen]) % p ) 
	);

}

function foo() {
	let max = 0;
    
    for (let i = 1; i <= n-1; i++) {
    	if (isEqual(1, n + 1 -i, i)) {
          max = i;
          console.log(max, 'max')
      }
      
    }
    
    return n-max;
}
fs.writeFileSync("output.txt", foo().toString())
```
