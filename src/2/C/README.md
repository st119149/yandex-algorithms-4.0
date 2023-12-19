[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## C. Z-функция
Дана непустая строка S, длина которой N не превышает 106. Будем считать, что элементы строки нумеруются от 0 до N-1.
Вычислите z-функцию z[i] для всех i от 0 до N-1. z[i] определяется как максимальная длина подстроки, начинающейся с позиции i и совпадающей с префиксом всей строки. z[0] = 0

### Формат ввода
Одна строка длины N, 0 < N ≤ 106, состоящая из прописных латинских букв.

### Формат вывода
Выведите N чисел — значения z-функции для каждой позиции, разделённые пробелом. 
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

function z_function() {
    let z = new Array(string.length-1).fill(0);

    for (let i = 1, l = 0, r = 0; i < string.length; i++) {
        if (i <= r) {                            
            z[i] = Math.min(z[i - l], r - i + 1);     
        }

        while (i + z[i] < string.length) {
            if ( isEqual(1,i+1,z[i]+1)) {
                z[i]++;
            } else {
                break;
            }
        }

        if (z[i] > 0 && i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }

    return z;
}
fs.writeFileSync("output.txt", z_function().join(' '))
```