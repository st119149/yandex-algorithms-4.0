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