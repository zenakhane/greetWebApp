let assert = require("assert");
let Greetings1 = require("../greet");



describe('Greet', function () {
    it('Should show name greeted in IsiXhosa', function () {
        var message = Greetings1()
        message.setNames('Zena')
        assert.equal(message.greetMessage("Zena", "IsiXhosa"), 'Molo, Zena',);
    });

    it('Should show name greeted in English', function () {
        var message = Greetings1()
        message.setNames('Asive')
        assert.equal(message.greetMessage("Asive", "English"), 'Hello, Asive');


    });

    it('Should show name greeted in IsiZulu', function () {
        var message = Greetings1()
        message.setNames('Lakhe')
        assert.equal(message.greetMessage("Lakhe", "IsiZulu"), 'Sawubona, Lakhe');

    });
});
describe('Set names', function () {
    it('Greet a name that has not been greeted', function () {
        var message = Greetings1()
        message.setNames('Bob')
        assert.equal(message.greetMessage("Bob", "IsiXhosa"), 'Molo, Bob',);
    });
    it('Greet a name that has not been greeted', function () {
        var message = Greetings1()
        message.setNames('Naomi')
        assert.equal(message.greetMessage("Naomi", "English"), 'Hello, Naomi',);

    });

});
describe('Counter', function () {
    it('Should count how many names have been greeted', function () {
        var message = Greetings1()
        message.setNames('Zena')
        assert.equal(1, message.setNameCount())
    })
    it('Should count how many names have been greeted', function () {
        var message = Greetings1()
        message.setNames('Zena')
        message.setNames('Lakhe')
        message.setNames('Naomi')
        assert.equal(3, message.setNameCount())
    })
    it('Should count how many names have been greeted', function () {
        var message = Greetings1()
        message.setNames('Bob')
        message.setNames('Zena')
        message.setNames('Lakhe')
        message.setNames('Naomi')
        assert.equal(4, message.setNameCount())
    })
    it('Should not count a name twice', function(){
        var message = Greetings1()
        message.setNames('Zena')
        message.setNames('Zena')
        message.setNames('Lakhe')
        message.setNames('Naomi')
        assert.equal(3, message.setNameCount())

    } )

})