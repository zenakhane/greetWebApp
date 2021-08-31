const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const Greetings = require("./greet")
const moment = require("moment")
moment().format()
const app = express()

const  greetings = Greetings()




const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());

 app.get('/counter', function (req, res) {
    req.flash('info', 'Welcome');
    res.render('index', {
      title: 'Home'
    })
  });
  app.get('/addFlash', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
  });
// app.get('/counter', function (req, res) {
//     res.render('/greet')
// });

app.post('/counter', function (req, res) {
    let name = req.body.langs
    let lang = req.body.langs
    greetings.greetMessage(name, lang);
    greetings.getNamesList();
    // gre
    res.render('index', {greet: greetings.getNamesList()})
    // res.redirect('/')
});

const PORT = process.env.PORT || 2089
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});