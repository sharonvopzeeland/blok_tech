const express = require('express')
const app = express();
const port = 1111;


/* ROUTES */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/index', (req, res) => {
    res.send('Dit is de index!')
  })

app.get('/home', (req, res) => {
    res.send('Dit is home!')
})

app.get('/profielaanmaken', (req, res) => {
    res.send('Dit is een profiel aanmaken!')
})

app.get('/chats', (req, res) => {
    res.send('Dit zijn chats!')
})


app.listen(port, () => {
  console.log(`web server running on http://localhost:${port}`)
})