// imports
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const slug = require('slug');

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

let db = null;

const fetch = require('node-fetch');




const profielen = [
  {
    "url": "jopie.jpeg",
    "naam": "Jopie",
    "email": "jopie123@gmail.com",
    "leeftijd": 81,
    "hobby": "Puzzelen",
    "omgeving": "Noord-Holland"
  }, 

  {
    "url": "henry.jpeg",
    "naam": "Henry",
    "email": "henrybooms@gmail.com",
    "leeftijd": 79,
    "hobby": "Puzzelen",
    "omgeving": "Zuid-Holland"
  },

  {
    "url": "joop.jpeg",
    "naam": "Joop",
    "email": "joopkaars@gmail.com",
    "leeftijd": 72,
    "hobby": "Puzzelen",
    "omgeving": "Noord-Holland"
  },

  {
    "url": "leone.jpeg",
    "naam": "Leone",
    "email": "leonehogeslag@gmail.com",
    "leeftijd": 76,
    "hobby": "Puzzelen",
    "omgeving": "Friesland"
  },

  {
    "url": "miep.jpeg",
    "naam": "Miep",
    "email": "miepmop@gmail.com",
    "leeftijd": 88,
    "hobby": "Puzzelen",
    "omgeving": "Groningen"
  },

  {
    "url": "frank.jpg",
    "naam": "Frank",
    "email": "frankus@gmail.com",
    "leeftijd": 80,
    "hobby": "Kaarten",
    "omgeving": "Zuid-Holland"
  },

  {
    "url": "piet.jpeg",
    "naam": "Piet",
    "email": "pietje00@gmail.com",
    "leeftijd": 84,
    "hobby": "Kaarten",
    "omgeving": "Limburg"
  },

  {
    "url": "ruud.jpeg",
    "naam": "Ruud",
    "email": "ruudkastoe@gmail.com",
    "leeftijd": 69,
    "hobby": "Kaarten",
    "omgeving": "Zeeland"
  },

  {
    "url": "sientje.jpeg",
    "naam": "Sientje",
    "email": "sientje56@gmail.com",
    "leeftijd": 65,
    "hobby": "Kaarten",
    "omgeving": "Noord-Holland"
  },

  {
    "url": "toni.jpeg",
    "naam": "Toni",
    "email": "toontjeboontje@gmail.com",
    "leeftijd": 76,
    "hobby": "Kaarten",
    "omgeving": "Drenthe"
  }

]


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

  const cities = await fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities")
  .then((data) => data)
  .catch((err) => console.log(err));
  
  res.render('profielaanmaken', {cities})
  
});


app.post('/matches', async (req, res) => {


  let toevoegenProfiel = {
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
  res.status(404).send('Error 404 file not found')
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

