const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const pg = require('pg')
const Greetings = require("./greet")
const app = express()


// const greetings = Greetings()

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/mygreet';
const { Pool } = require('pg');
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

let greets = Greetings(pool)

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.get('/', function (req, res) {
  req.flash('info', 'Welcome');
  res.render('index', {
    title: 'Home',
    count: greets.getGreetedNamesList()

  })
});
app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

// route for greeting and counter
app.post('/',async function (req, res) {
  let theName = req.body.nameVal;
  let lang = req.body.language;
  await greets.insertToTable(theName)
  res.render('index', {
    greet: greets.greetMessage(theName, lang),
    count:  await greets.countNames(),
    errors: greets.greetErrors(theName, lang)
  })
});

// route for the names greeted list
app.get('/names', async function (req, res) {
  var greetedList = await greets.displayAll()
  var list = greets.getGreetedNamesList()
  res.render('names', {
    names: greetedList,
    count: list[greetedList]
  })
})
// route for each name greeted
app.get('/counter/:nameVal', async function(req,res){
  var name = req.params.nameVal
  console.log(name)
  // console.log( await greets.namesAndCounter(name) + "erfghjerty")
  var namesList = await greets.namesAndCounter(name)
  // console.log(namesList + 'sexrdctfvgybhjn')
res.render('counter',{
  name : name,
counterPerPerson : namesList.counter
})
})
app.get('/reset', async function(req,res){
await greets.removeName()
  res.redirect('/')
})

const PORT = process.env.PORT || 2087
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});

