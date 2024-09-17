const fs = require('node:fs')

function saveFile(data, extension) {
  const fileName = `${Date.now()}.${extension}`
  const base64 = Buffer.from(data, 'base64')
  fs.writeFileSync(`files/${fileName}`, base64)
  return fileName
}

function init() {
  if(fs.existsSync('files')) return
  fs.mkdirSync('files')
  console.log('Created folder "files"')
}


module.exports = { saveFile, init }
