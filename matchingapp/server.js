// imports
const express = require('express')
const app = express();
const port = 3000;


// static files (middleware)
app.use(express.static('static'))
app.use('/styles', express.static(__dirname + 'static/styles'))
app.use('/scripts', express.static(__dirname + 'static/scripts'))
app.use('/images', express.static(__dirname + 'static/images'))


// set view
app.set('views', './view')
app.set('view engine', 'ejs')


app.get('', (req, res) => {
  res.render('index')
})

//app.get('', (req, res) => {
//  res.render('tutorial', { text: 'this is ejs'})
// })

//app.get('/about', (req, res) => {
//  res.render('about', { text: 'about page'})
// }) 




// listen
app.listen(port, () => {
  console.log(`web server running on http://localhost:${port}`)
})



/* ERROR (moet onderaan!!!!!!!!!) */
app.use( (req, res) => {
    res.status(404).send('Error 404 file not found')
})

