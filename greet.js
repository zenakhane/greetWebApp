module.exports = function Greetings() {
    var namesGreetedList = []
    var nameGreetNow = 0

    function greetMessage(theName, lang) {
        theName = theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();
        setNames(theName)
        if (lang === "English") {
            return "Hello, " + theName;
        }
        else if (lang === "IsiXhosa") {
            return "Molo, " + theName;
        }
        else if (lang === "IsiZulu") {
            return "Sawubona, " + theName;
        }
    }


    function setNames(theName) {
        // theName = theName.charAt(0).toUpperCase() + theName.slice(1).toLowerCase();
        if (!namesGreetedList.includes(theName)) {
            nameGreetNow++
            namesGreetedList.push(theName)
        }

    }

    function setNameCount() {
        return namesGreetedList.length;
    }

    function setNamesGreetedList(theName) {
        namesGreetedList = theName
    }

    function getNamesList() {
        return namesGreetedList
    }

    function getnameGreetNow() {
        return nameGreetNow
    }

    
    function greetErrors(theName, lang) {
        if (theName == '' && lang == undefined) {
            return 'Welcome!!'
        }
        else if (theName == '') {
            return 'No name entered!!'
        } else if (lang == undefined) {
        return 'Please select a language'
    }
}
return {
    greetMessage,
    getnameGreetNow,
    getNamesList,
    setNames,
    setNameCount,
    setNamesGreetedList,
    greetErrors
}
}
