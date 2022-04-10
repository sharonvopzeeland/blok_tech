// imports
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

const bodyParser = require('body-parser');
const slug = require('slug');

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

let db = null;





// static files (middleware)
app.use(express.static('static'))
app.use('/styles', express.static(__dirname + 'static/styles'))
app.use('/scripts', express.static(__dirname + 'static/scripts'))
app.use('/images', express.static(__dirname + 'static/images'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set view
app.set('views', './view')
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('start')
})

app.get('/index', (req, res) => {
  res.render('index')
})



app.get('/matches', async (req, res) => {
const query = {"hobby": "Puzzelen"};
const filtered = await db.collection('profielen').find(query).toArray();
console.log(filtered);

res.render('matches', {profielen: filtered})
});


app.get('/profiel', async (req, res) => {


  // (thirdparty) API -> het werkt niet..
  // async function getData() {
  //   let res = fetch('https://api.countrystatecity.in/v1/countries/IN/states/MH/cities')
  //   return await res.json();
  // };

  // getData().then(data => {
  //   console.log(data)
  // })
  
  res.render('profielaanmaken')
  
});


app.post('/matches', async (req, res) => {


  let toevoegenProfiel = {
    slug: slug(req.body.name),
    name: req.body.name,
    email: req.body.email,
    leeftijd: req.body.leeftijd,
    hobby: req.body.hobby,
    omgeving: req.body.omgeving,
  };

 
  console.log(toevoegenProfiel);
  await db.collection('profielen').insertOne(toevoegenProfiel, async (error, item) => {
    
    const id = item.insertedId;
    const query = {"hobby": req.body.hobby, _id:{$ne: id}};
    const filtered = await db.collection('profielen').find(query).toArray();
    

    res.render('matches', {profielen: filtered})
  });

  
  



})



// ERROR
app.get('*', (req, res) => {
  res.status(404).render('404')
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

// listen
app.listen(port, () => {
  console.log(`web server running on http://localhost:${port}`);

  connectDB().then( () => console.log('We have a connection to mongo!'))
})

