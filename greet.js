const { request } = require("express");

module.exports = function Greetings(pool) {
	var namesGreetedList = []
	var nameGreetNow = 0	

	function greetMessage(theName, lang) {
		var theName = theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();
		
		if (lang === "English") {
			return "Hello, " + theName;
		} else if (lang === "IsiXhosa") {
			return "Molo, " + theName;
		} else if (lang === "IsiZulu") {
			return "Sawubona, " + theName;
		}
	}
	function getGreetedNamesList() {
		return namesGreetedList
	}

	function getnameGreetedNow() {
		return nameGreetNow
	}
	function setNameCount(){
		return namesGreetedList.length;
	}
	
	function greetErrors(theName, lang) {
       
		if (theName == '' && lang == undefined) {
			return 'Please enter a name and select a language'
		} else if (lang == undefined) {
			return 'Please select a language'
		}
	}

	async function insertToTable(name) {
		// var name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		try {
			var nameAdd = await pool.query('select name from greet where name = $1', [name])
			if (nameAdd.rows == 0) {
				await pool.query('insert into greet (name,counter) values ($1,$2)', [name, 1])
			} else{
              await pool.query('update greet set counter = counter +1 where name = $1', [name])
            }

		} catch (error) {
			console.log(error)

		}
	}
	async function countNames() {

		try {
			var countAdd = await pool.query('select * from greet')
			return countAdd.rowCount
		} catch (error) {
			console.log(error)

		}
	}

	async function displayAll() {
		try {
			var selectAll = await pool.query('select * from greet')
			return selectAll.rows
		} catch (error) {
			console.log(error)

		}
	}

  async function namesAndCounter(name){
	  console.log(name)
      try { var displayName = await pool.query('select * from greet where name =$1', [name])
          return displayName.rows[0]
      } catch (error) {
          console.log(error)
          
      }
  }

  async function removeName(){
await pool.query('delete from greet')
  }

	return {
		greetMessage,
		getnameGreetedNow,
		getGreetedNamesList,
		setNameCount,
		greetErrors,
		insertToTable,
		countNames,
		displayAll,
        namesAndCounter,
        removeName
	}
}