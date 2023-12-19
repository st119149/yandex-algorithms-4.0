const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const [x1,y1,x2,y2] = fileContent.toString().trim().split(' ').map(v => Number(v))

let l1 = Math.sqrt(x1*x1 + y1*y1),
   l2 = Math.sqrt(x2*x2 + y2*y2),
   alpha = Math.atan2(y1,x1),
   beta = Math.atan2(y2,x2),
   angle = Math.min(Math.abs(alpha - beta), 2 * Math.PI - Math.abs(alpha - beta)),
   result = Math.min(Math.min(l1,l2) * angle + Math.abs(l1-l2), l1+l2)

fs.writeFileSync("output.txt", result.toString())