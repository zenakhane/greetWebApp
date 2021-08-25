module.exports = describe('Greet', function () {
    it('Should show name greeted in venda', function () {
        var message = Greetings()
        message.setNames('Zena')
        assert.equal(message.greetMessage("Zena", "Venda"), 'Ndaa, Zena',);
    });

    it('Should show name greeted in Nama', function () {
        var message = Greetings()
        message.setNames('Zena')
        assert.equal(message.greetMessage("Asive", "Nama"), 'Halau, Asive');


    });

    it('Should show name greeted in Tsonga', function () {
        var message = Greetings()
        message.setNames('Lakhe')
        assert.equal(message.greetMessage("Lakhe", "Tsonga"), 'Ahee, Lakhe');

    });
});
describe('Set names', function () {
    it('Greet a name that has not been greeted', function () {
        var message = Greetings()
        message.setNames('Bob')
        assert.equal(message.greetMessage("Bob", "Venda"), 'Ndaa, Bob',);
    });
    it('Greet a name that has not been greeted', function () {
        var message = Greetings()
        message.setNames('Naomi')
        assert.equal(message.greetMessage("Naomi", "Tsonga"), 'Ahee, Naomi',);

    });

});
describe('Counter', function () {
    it('Should count how many names have been greeted', function () {
        var message = Greetings()
        message.setNames('Zena')
        assert.equal(1, message.setNameCount())
    })
    it('Should count how many names have been greeted', function () {
        var message = Greetings()
        message.setNames('Zena')
        message.setNames('Lakhe')
        message.setNames('Naomi')
        assert.equal(3, message.setNameCount())
    })
    it('Should count how many names have been greeted', function () {
        var message = Greetings()
        message.setNames('Bob')
        message.setNames('Zena')
        message.setNames('Lakhe')
        message.setNames('Naomi')
        assert.equal(4, message.setNameCount())
    })
    it('Should not count a name twice', function(){
        var message = Greetings()
        message.setNames('Zena')
        message.setNames('Zena')
        message.setNames('Lakhe')
        message.setNames('Naomi')
        assert.equal(3, message.setNameCount())

    } )

})