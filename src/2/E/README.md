[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## E. Подпалиндромы
Строка называется палиндромом, если она читается одинаково как слева направо, так и справа налево. Например, строки abba, ata являются палиндромами.
Вам дана строка. Ее подстрокой называется некоторая непустая последовательность подряд идущих символов. Напишите программу, которая определит, сколько подстрок данной строки является палиндромами.

### Формат ввода
Вводится одна строка, состоящая из прописных латинских букв. Длина строки не превышает 100000 символов.

### Формат вывода
Выведите одно число — количество подстрок данной строки, которые являются палиндромами
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
string = '' + string;
 
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
  let d1 = [],
      l=0, r=-1;
  for (let i=0; i<n; ++i) {
    let k = i>r ? 1 : Math.min(d1[l+r-i], r-i+1);
    while (i+k < n && i-k >= 0 && string[i+k] === string[i-k])  ++k;
    d1[i] = k;
    if (i+k-1 > r)
      l = i-k+1,  r = i+k-1;
  }
  
  let d2 = [];
      l=0, r=-1;
  for (let i=0; i<n; ++i) {
    let k = i>r ? 0 : Math.min(d2[l+r-i+1], r-i+1);
    while (i+k < n && i-k-1 >= 0 && string[i+k] === string[i-k-1])  ++k;
    d2[i] = k;
    if (i+k-1 > r)
      l = i-k,  r = i+k-1;
  }

  return d1.reduce((acc,v) => acc+v,0) + d2.reduce((acc,v) => acc+v,0)
}

fs.writeFileSync("output.txt", foo().toString())
```