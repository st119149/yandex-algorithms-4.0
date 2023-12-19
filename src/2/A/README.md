[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## A. Равенство подстрок
Дана строка S, состоящая из строчных латинских букв.
Определите, совпадают ли строки одинаковой длины L, начинающиеся с позиций A и B.

### Формат ввода
В первой строке записана S (1 ≤ |S| ≤ 2 ⋅ 105), состоящая из строчных латинских букв.
Во второй строке записано число Q (1 ≤ Q ≤ 2 ⋅ 105) — количество запросов.
В следющих Q строках записаны запросы: целые числа L, A и B (1 ≤ L ≤ |S|, 0 ≤ A, B ≤ (|S| - L)) — длина подстрок и позиции, с которых они начинаются.

### Формат вывода
Если строки совпадают — выведите "yes", иначе — "no".
```
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8").toString().split('\n');


let string = fileContent[0],
	testsCount = Number(fileContent[1]),
    tests = [];
for (let i = 0; i < testsCount; i++) {
	tests.push(fileContent[i+2].split(' ').map(Number));
}

let n = string.length,
	p = BigInt(1e9+7),
    x_ = BigInt(257),
    h = [BigInt(0)],
    x = [BigInt(1)];
string = ' ' + string;
 
for (let i = 1; i <= n; i++) {
	h[i] = (h[i-1] * x_ + BigInt(string.charCodeAt(i))) % p;
    x[i] = (x[i-1] * x_) % p;
}

  // console.log(string)
function isEqual(from1, from2, slen) {
  // console.log(from1, from2, slen)
	return ( 
	      ( (h[from1 + slen - 1] + h[from2 -1]*x[slen]) % p  === 
	      (h[from2 + slen - 1] + h[from1 - 1]*x[slen]) % p ) 
	);

}

tests.forEach(test => {
	const [slen, from1, from2] = test;
	result.push(isEqual(from1 + 1, from2 + 1, slen) ? 'yes' : 'no')
})

fs.writeFileSync("output.txt", result.join('\n'))
```