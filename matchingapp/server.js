const express = require('express')
const app = express();
const port = 1111;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`web server running on http://localhost:${port}`)
})