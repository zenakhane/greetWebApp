module.exports = function Greetings() {
    var namesGreetedList = []
    var nameGreetNow = 0



    function greetMessage(name, lang) {

        // name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        if (lang === "English") {
            return "Hello, " + name;

        }
        else if (lang === "IsiXhosa") {
            return "Molo, " + name;

        }
        else if (lang === "IsiZulu") {
            return "Sawubona, " + name;

        }
    }

    function setNames(name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (!namesGreetedList.includes(name)) {
            nameGreetNow++
            namesGreetedList.push(name)
            return true
        }

    }
    function setNameCount() {
        return namesGreetedList.length;
    }

    function setNamesGreetedList(name) {
        namesGreetedList = name
    }

    function getNamesList() {
        return namesGreetedList
    }

    function getnameGreetNow() {
        return nameGreetNow
    }

    return {
        greetMessage,
        getnameGreetNow,
        getNamesList,
        setNames,
        setNameCount,
        setNamesGreetedList
    }
}
