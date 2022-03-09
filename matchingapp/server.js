// imports
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

let db = '0';
console.log(process.env.TESTVAR);

const profielen = [{
  naam: "Jopie",
  email: "jopie123@gmail.com",
  leeftijd: 81,
  hobby: "Puzzelen",
  omgeving: "Noord-Holland"
}, 
{
  naam: "Gerard",
  email: "gerardus@gmail.com",
  leeftijd: 80,
  hobby: "Tuinieren",
  omgeving: "Zuid-Holland"
},
{
  naam: "Mary",
  email: "maryvo@gmail.com",
  leeftijd: 76,
  hobby: "Breien",
  omgeving: "Friesland"
}

]


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

app.get('/profiel', (req, res) => {
  res.render('profielaanmaken')
})

app.post('/matches', (req, res) => {
    //hobby bepalen
    //gegevens bewaren
    //lijst met matches op basis van hobby
  

  res.render('matches', {profielen})
})


// van tutorial
//app.get('', (req, res) => {
//  res.render('tutorial', { text: 'this is ejs'})
// })

//app.get('/about', (req, res) => {
//  res.render('about', { text: 'about page'})
// }) 







// ERROR
app.use( (req, res) => {
  res.status(404).send('Error 404 file not found')
})


// listen
app.listen(port, () => {
  console.log(`web server running on http://localhost:${port}`)
})

// connect to database

async function connectDB() {

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);

  } catch (error) {
    throw error;
  }
}