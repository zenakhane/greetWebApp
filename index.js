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
const { request } = require('express');
const routes = require('./routes');
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
let routesG = routes(greets)

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

app.get('/', async function (req, res) {
  req.flash('info');
  res.render('index', {
    title: 'Home',
    count: await greets.countNames()
  })
});

app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

// route for greeting and counter
app.post('/', routesG.displayName);

// route for the names greeted list
app.get('/names', routesG.showList);

// route for each name greeted
app.get('/counter/:nameVal', routesG.eachName)

app.get('/reset', routesG.resetAll)

const PORT = process.env.PORT || 2087;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});



