let assert = require("assert");
let Greetings1 = require("../greet");
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greet_test';

const pool = new Pool({
    connectionString
});

describe('Counter', function () {

    beforeEach(async function () {
        console.log("*****");
        await pool.query("delete from greet;");
    });

    it('Should count how many names have been greeted', async function () {
        let message = Greetings1(pool)
        await message.insertToTable({
            name: 'Zena'
        });
        let mygreet = await message.countNames();
        assert.equal(1, mygreet);
    })

    it('Should count how many names have been greeted', async function () {
        let message = Greetings1(pool);
        await message.insertToTable({
            name: 'Zena',
        });
        await message.insertToTable({
            name: 'Lakhe',
        });
        await message.insertToTable({
            name: 'Bob',
        });
        let mygreet = await message.countNames();
        assert.equal(3, mygreet);
    })


    it('Should not count a name twice', async function () {
        let message = Greetings1(pool);
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'thato',
           
        });


        let mygreet = await message.countNames();
        assert.equal(2, mygreet);
    });

    it('Should not count a name twice', async function () {
        let message = Greetings1(pool);
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'thato',
           
        });


        let mygreet = await message.countNames();
        assert.equal(2, mygreet);
    });
    it('Should not count a name twice', async function () {
        let message = Greetings1(pool);
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'thato',
           
        });


        let mygreet = await message.countNames();
        assert.equal(2, mygreet);
    });
    it('Should greet a name ', async function () {
        let message = Greetings1(pool);
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'Lilly',
           
        });
        await message.insertToTable({
            name: 'thato',
           
        });

        let mygreet = await message.countNames();
        assert.equal(3, mygreet);
    });
    it('Should clear all names in database', async function () {
        let message = Greetings1(pool);
        await message.insertToTable({
            name: 'Zena',
           
        });
        await message.insertToTable({
            name: 'Lakhe',
           
        });
        await message.insertToTable({
            name: 'thato',
           
        });
        await message.removeName()
       let mygreet = await message.displayAll();
        assert.deepEqual([],mygreet);
    });
    it('Should display all countered names', async function () {
        let message = Greetings1(pool);
        await message.countNames({
            name: 'Zena'  
        })
       let mygreet = await message.namesAndCounter();
        assert.equal('Zena',mygreet);
    });
it('display a message if language has been selected', function(){
    let message = Greetings1(pool);
    message.insertToTable({
        name: ' '
    })
  let mygreet  =  message.greetErrors()
  assert.equal('Please select a language',mygreet)
})
it('Should show name greeted in IsiXhosa', function(){
    let message = Greetings1(pool);
    message.insertToTable('Zena')
    assert.equal(message.greetMessage("Zena", "IsiXhosa"), 'Molo, Zena',);

})
it('Should show name greeted in english', function () {
    let message = Greetings1(pool)
    message.insertToTable('Zena')
    assert.equal(message.greetMessage("Zena", "English"), 'Hello, Zena',);
});
    after(function () {
        pool.end();
    });
})


