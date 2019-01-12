const fs = require('fs')
const path = require('path')

module.exports = {
  readFile,
  readFileInLines,
  writeFile
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

function writeFile (fileDirectory, fileName, fileContent) {
  const filePath = path.join(fileDirectory, fileName)
  return fs.writeFileSync(filePath, fileContent, 'utf-8')
}