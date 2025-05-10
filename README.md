# File Uprouter

## How to use

1. fill in `port`, `dns`,  and `keySeed` in `config.js`
2. run `npm start`

### How to upload
Request Data
```js
{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: {
    data: "file data (base64-string)",
    extension: "file extension (string)",
    key: "Auth-key"
  }
}
```