let assert = require("assert");
let Greetings1 = require("../greet");

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/mygreet';

describe('Greet', function () {
    it('Should show name greeted in IsiXhosa', function () {
        var message = Greetings1()
        message.insertToTable('Zena')
        assert.equal(message.greetMessage("Zena", "IsiXhosa"), 'Molo, Zena',);
    });

    it('Should show name greeted in English', function () {
        var message = Greetings1()
        message.insertToTable('Asive')
        assert.equal(message.greetMessage("Asive", "English"), 'Hello, Asive');


    });

    it('Should show name greeted in IsiZulu', function () {
        var message = Greetings1()
        message.insertToTable('Lakhe')
        assert.equal(message.greetMessage("Lakhe", "IsiZulu"), 'Sawubona, Lakhe');

    });
});
describe('Set names', function () {
    it('Greet a name that has not been greeted', function () {
        var message = Greetings1()
        message.insertToTable('Bob')
        assert.equal(message.greetMessage("Bob", "IsiXhosa"), 'Molo, Bob',);
    });
    it('Greet a name that has not been greeted', function () {
        var message = Greetings1()
        message.insertToTable('Naomi')
        assert.equal(message.greetMessage("Naomi", "English"), 'Hello, Naomi',);

    });

});
describe('Counter', function () {
    it('Should count how many names have been greeted', function () {
        var message = Greetings1()
        message.insertToTable('Zena')
        assert.equal(1, message.countNames())
    })
    it('Should count how many names have been greeted', function () {
        var message = Greetings1()
        message.insertToTable('Zena')
        message.insertToTable('Lakhe')
        message.insertToTable('Naomi')
        assert.equal(3, message.countNames())
        
    })
    it('Should count how many names have been greeted', function () {
        var message = Greetings1()
        message.insertToTable('Bob')
        message.insertToTable('Zena')
        message.insertToTable('Lakhe')
        message.insertToTable('Naomi')
        assert.equal(4, message.countNames())
    })
    it('Should not count a name twice', function(){
        var message = Greetings1()
        message.insertToTable('Zena')
        message.insertToTable('Zena')
        message.insertToTable('Lakhe')
        message.insertToTable('Naomi')
        assert.equal(3, message.countNames())

    } )

})