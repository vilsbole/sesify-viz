const fs = require('fs')
const path = require('path')

// read file
let indexContent = fs.readFileSync(path.resolve(__dirname, '../src/app/index.html'), 'utf8')
// fix relative urls
indexContent = indexContent
  .split(`"/metamask-deps-explorer-sesify/`)
  .join(`"./`)
// insert data script
indexContent = indexContent
  .split(`<body>`)
  .join(`<body><script src="./data-injection.js"></script>`)
// write file
fs.writeFileSync(__dirname + '/../src/app/index.html', indexContent)
