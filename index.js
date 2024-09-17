const express = require('express')
const sha256 = require('js-sha256').sha256
const app = express()
const file = require('./file')
const port = 3056
const keySeed = ""
const dns = ""
const authKey = sha256(keySeed)

if(dns.length === 0) {
  console.log("dns is empty")
  process.exit(1)
}

if(keySeed.length === 0) {
  console.log("keySeed is empty")
  process.exit(1)
}

app.use(express.static('files'))
app.use(express.json({ 
  limit: "100mb"
}))

app.post('/upload', function(req, res, next) {
  if(!('data' in req.body && 'extension' in req.body && 'key' in req.body)) {
    res.status(400).json({ error: 'missing body arguments' })
    return
  }
  const { data, extension, key } = req.body
  if(key !== authKey) {
    res.status(403).json({ error: 'forbidden' })
    return
  }
  const fileName = file.saveFile(data, extension)
  res.status(200).json({ 
    status: 'success',
    url: `${dns}:${port}/${fileName}`
  })
})

app.listen(port, () => {
  file.init()
  console.log(`file-uprouter listening on port ${port}`)
  console.log(`The auth-key: ${authKey}`)
})