const fs = require('fs')
const path = require('path')

module.exports = {
  readFile,
  readFileInLines
}

function readFile (fileDirectory, fileName) {
  const filePath = path.join(fileDirectory, fileName)
  return fs.readFileSync(filePath, 'utf-8')
}

function readFileInLines (fileDirectory, fileName) {
  const fileContents = readFile(fileDirectory, fileName)
  return fileContents
    .split('\n')
    .filter(x => x)
}
