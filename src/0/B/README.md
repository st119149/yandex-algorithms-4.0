[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)
## B. Сложить две дроби
Даны две рациональные дроби: a/b и c/d. Сложите их и результат представьте в виде несократимой дроби m/n.

### Формат ввода
Программа получает на вход 4 натуральных числа a, b, c, d, каждое из которых не больше 100.

### Формат вывода
Программа должна вывести два натуральных числа m и n такие, что m/n=a/b+c/d и дробь m/n – несократима.
```
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
```