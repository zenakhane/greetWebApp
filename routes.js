module.exports = function greetRoutes(greets) {


    async function displayName(req, res) {
        try {
            let theName = req.body.nameVal;
            let lang = req.body.language;
            await greets.insertToTable(theName)
            res.render('index', {
                greet: greets.greetMessage(theName, lang),
                count: await greets.countNames(),
                errors: greets.greetErrors(theName, lang)
            })
        } catch (error) {
           
        }
    }


async function showList(req, res) {
    try {
        var greetedList = await greets.displayAll()
        res.render('names', {
            names: greetedList,
           
        })
    } catch (error) {

    }
};

async function eachName(req, res) {
    try {
        var name = req.params.nameVal
        var namesList = await greets.namesAndCounter(name)
        res.render('counter', {
            name: name,
            counterPerPerson: namesList.counter
        })
    } catch (error) {

    }

}

async function resetAll(req, res) {
    try {
      await greets.removeName()
      req.flash('error', 'Reseting everything on database')
      res.redirect('/')
    } catch (error) {
      
    }
}

return{
    displayName,
    showList,
    eachName,
    resetAll
}
}