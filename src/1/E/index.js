const fs = require('fs');
let fileContent = fs.readFileSync("input.txt", "utf8").toString();
const data = fileContent.trim().split('\n').slice(1);

function bitSort(array) {
  let numLength = array[0].length,
    strResult = `Initial array:
${array.join(', ')}
**********
`;
        
  for (let i = 0; i < numLength; i++) {
    let bucket = new Array(10).fill(1).map(v => [])
    for (let j = 0; j < array.length; j++) {
      bucket[array[j][numLength-i-1]].push(array[j])
    }
    
    strResult += `Phase ${i+1}
${bucket.map((v,i) => `Bucket ${i}: ${v.length ? v.join(', ') : 'empty'}`).join('\n')}
**********
`;
    
    array = bucket.reduce((acc,v) => {acc.push(...v); return acc}, [])
  }
  
  strResult += `Sorted array:
${array.join(', ')}
`;
  return strResult;
}



fs.writeFileSync("output.txt", bitSort(data));
