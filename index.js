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


app.get('/', function (req, res) {
    res.render("index", {
       lang:  greetings.greetMessage(),
       name:  greetings.getnameGreetNow(),
       
    })
});

app.get('/counter', function (req, res) {

    greetings.setNameCount({

        
    })
    res.render('/greet')
});

app.post('/counter', function (req, res) {
    res.redirect('/')
});

const PORT = process.env.PORT || 2089
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});