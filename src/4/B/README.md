[К оглавлению](https://github.com/st119149/yandex-algorithms-4.0/blob/main/README.md)

## B. Затерянный мир
Территория зоопарка Юрского периода «Затерянный мир» представляет собой решётку N × N, в каждой клетке которой находится вольер для динозавра. Директор зоопарка Степан Савельев планирует расселить в зоопарке N динозавров. Вольеры отделены друг от друга невысоким забором. Сотрудникам зоопарка известно, что динозавр не покидает пределов своего вольера, и не ломает забор, если он не видит на территории парка других динозавров. Зрительный аппарат у динозавров таков, что он видит всех динозавров, которые находятся на одной строке, на одном столбце или на одной диагонали с ним. Если же динозавр видит другого ящера, то ломает забор и вступает в борьбу. Директор зоопарка не хочет терпеть убытки, поэтому просит вас посчитать количество способов так расселить динозавров в зоопарке, чтобы никакой ящер не видел остальных динозавров.

### Формат ввода
Задано единственное число N (N ≤ 10).

### Формат вывода
Необходимо вывести количество способов, которыми можно расселить в зоопарке N динозавров, чтобы у зоопарка не было убытков. 
```
const fs = require('fs');
let n = Number(fs.readFileSync("input.txt", "utf8").toString().trim());

function getCount() {
  let result = 0;
  const initBusy = {
    horizontal: {},
    vertical: {},
    posDiagonal: {},
    negDiagonal: {}
  }

  function isBusy(busy,i,j) {
    const {horizontal, vertical, posDiagonal, negDiagonal} = busy;
    return horizontal[i] ||
            vertical[j] ||
            posDiagonal[i+j] ||
            negDiagonal[i-j]
  }
  
  function next(busy, i,j) {
    do {
      if (j+1 < n && !busy.horizontal[i])
        j++;
      else if (i + 1 < n) {
        i++;
        j = 0;
      } else
        return [null,null];
    } while (isBusy(busy, i,j))
    return [i,j]
  }

  function foo(busy = initBusy,i = 0,j = 0, dinoCount = 0) {
    if (i === null || j === null || dinoCount-i<0) 
      return;
      
    let newBusy = {
      horizontal: {...busy.horizontal},
      vertical: {...busy.vertical},
      posDiagonal: {...busy.posDiagonal},
      negDiagonal: {...busy.negDiagonal},
    }
  
    foo(newBusy, ...next(newBusy, i,j), dinoCount)
    newBusy = undefined;
    
    dinoCount++;
    busy.horizontal[i] = true;
    busy.vertical[j] = true;
    busy.posDiagonal[i+j] = true;
    busy.negDiagonal[i-j] = true;
    
    if (dinoCount === n) {
      result+=1;
      return;
    }
    
    foo(busy, ...next(busy,i,j), dinoCount)
    
    } 
  foo();
  
  return result;
}
fs.writeFileSync("output.txt", getCount(n).toString())
```