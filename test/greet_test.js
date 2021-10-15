let assert = require("assert");
let Greetings1 = require("../greet");
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/mygreet';

const pool = new Pool({
    connectionString
});

// const greeted = Greetings1(pool)

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
    after(function () {
        pool.end();
    });
})


