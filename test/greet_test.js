let assert = require("assert");
let Greetings1 = require("../greet");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123localhost:5432/mygreet';

const pool = new Pool({
    connectionString
});

 const greeted = Greetings1(pool)

// describe('Greet', function () {
//     it('Should show name greeted in IsiXhosa', function () {
//         var message = Greetings1()
//         message.insertToTable('Zena')
//         assert.equal(message.greetMessage("Zena", "IsiXhosa"), 'Molo, Zena',);
//     });

//     it('Should show name greeted in English', function () {
//         var message = Greetings1()
//         message.insertToTable('Asive')
//         assert.equal(message.greetMessage("Asive", "English"), 'Hello, Asive');


//     });

//     it('Should show name greeted in IsiZulu', function () {
//         var message = Greetings1()
//         message.insertToTable('Lakhe')
//         assert.equal(message.greetMessage("Lakhe", "IsiZulu"), 'Sawubona, Lakhe');

//     });
// });
// describe('Set names', function () {
//     it('Greet a name that has not been greeted', function () {
//         var message = Greetings1()
//         message.insertToTable('Bob')
//         assert.equal(message.greetMessage("Bob", "IsiXhosa"), 'Molo, Bob',);
//     });
//     it('Greet a name that has not been greeted', function () {
//         var message = Greetings1()
//         message.insertToTable('Naomi')
//         assert.equal(message.greetMessage("Naomi", "English"), 'Hello, Naomi',);

//     });

// });
describe('Counter', function (){

    beforeEach(async function(){
        console.log("*****");
        await pool.query("delete from mygreet;"); 
    });

    it('Should count how many names have been greeted', async function () {
        var message = Greetings1(pool)
       await message.insertToTable({
               name: 'Zena'
           });
           let mygreet = await message.countNames()
        assert.equal(1, mygreet.length);
    })

    it('Should count how many names have been greeted',async function () {
        var message = Greetings1(pool);
       await message.insertToTable({
               name: 'Zena',
               name : 'Lakhe',
               name : 'Nosisi'
           });
           let mygreet = await message.countNames();
        assert.equal(3, mygreet.length)
    })

   
    it('Should not count a name twice',async function(){
        var message = Greetings1(pool);
        await message.insertToTable({
                name: 'Zena',
                name : 'Lakhe',
                name : 'Nosisi',
                name : 'Nosisi'
            })
            let mygreet = await message.countNames();
         assert.equal(3, mygreet.length);
    } );
    after(function(){
        pool.end();
    });
})
   

