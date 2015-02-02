(function () {

//////////////////////////////////////////////////////////////
/////// IMPORTANT VARIABLES ///////
//////////////////////////////////////////////////////////////    

function elementSelector (name) {
    return document.querySelector(name)
}

var submitButton = elementSelector('.submit-button'),
    nameText = elementSelector('.name-text-input'),
    emailText = elementSelector('.email-text-input'),
    informationClass = document.getElementsByClassName('information'),
    informationClassLength = informationClass.length,
    addButton = document.getElementsByClassName('addItem')[0],
    chooser = document.querySelector('.chooser'),
    chosenAvatar = document.querySelector('.chosen-avatar'),
    ul = elementSelector('ul');
    fileMaker = document.querySelector('.file-maker'),
    people = [];

//////////////////////////////////////////////////////////////
/////// HIDE/SHOW ///////
//////////////////////////////////////////////////////////////

function informationDisplay (show) {
    for (var i = informationClassLength - 1; i >= 0; i--) {
        informationClass[i].style.visibility = show;
    };   
}   

function addDisplay (show) {
   addButton.style.visibility = show;   
} 

informationDisplay('hidden');
chooser.style.boxShadow = "0px 1px 1px transparent";

addButton.onclick = function() {
    addDisplay('hidden')
    informationDisplay('visible')
    chooser.style.background = "#EFEFEF";
    chooser.style.boxShadow = "0px 1px 1px #B3B3B3";
}

//////////////////////////////////////////////////////////////
/////// IMPORTANT FUNCTIONS TO CHANGING THE LIST ///////
//////////////////////////////////////////////////////////////

/////////////// PERSON IS  FOR WHEN I COME BACK TO THIS PROJECT ///////////////////////

function Person (name,email) {
    this.name = name
    this.email = email
}

function readURL(input) {
        var reader = new FileReader();

        reader.onload = function (event) {
            chosenAvatar.src = event.target.result;
        }

        reader.readAsDataURL(input.files[0]);
}

fileMaker.onchange = function () {
    document.querySelector('.svg-face').style.visibility = "hidden";
    document.querySelector('.chosen-avatar').style.opacity = "1";
    readURL(fileMaker)
}

var counter = 1;

function xButtonClicked () {
    var exits = ul.getElementsByTagName('li');
    for (var i = 0; i < exits.length; i += 1) {
        if (exits.className = i){
            var exit = exits[i];
            ul.remove(exit);
        }
    }
}

//////////////////////////////////////////////////////////////
/////// HOLDS ALL VALUES FOR CREATING A NEW LI ///////
//////////////////////////////////////////////////////////////

function createPerson () { 

    var newEmail = emailText.value;
    var newEmailValue = document.createTextNode(newEmail);
    var newEmailP =document.createElement('p');
    newEmailP.appendChild(newEmailValue);

    var newName = nameText.value;
    var newNameValue = document.createTextNode(newName);
    var newNameP = document.createElement('p');
    newNameP.appendChild(newNameValue);

    var newLi = document.createElement('li');
    var newDiv = document.createElement('div'); 

    /////////////// FOR THE CREATED IMAGES //////////////
    (function () {
        var newAvatar = document.createElement('IMG');
        var file = fileMaker.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            newAvatar.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            newAvatar.src = "";
        }

        var imgDiv = document.createElement('div');    
        var whiteOverlay;

        function overlay () {
            whiteOverlay = document.createElement('div');
            imgDiv.appendChild(whiteOverlay);
            whiteOverlay.id = 'tester';
        }
        overlay();
        
        imgDiv.appendChild(newAvatar);
        newLi.appendChild(imgDiv);
    })();

    newLi.appendChild(newDiv);
    newDiv.appendChild(newNameP);
    newDiv.appendChild(newEmailP);

    var xDiv = document.createElement('div');
    xDiv.innerHTML = "<input class='new-button' onclick=\"xButtonClicked()\" type=\"button\">X"; 
    newLi.appendChild(xDiv);

    ul.appendChild(newLi);

    /////////////// THE COUNTER IS FOR WHEN I COME BACK TO THIS PROJECT //////////////
    counter += 1;
    xDiv.className = counter;
    
    /////////////// CLEARS THE FORM //////////////
    nameText.value = '';
    emailText.value = '';
    chosenAvatar.src = '';
    chooser.style.background = "#E6E6E6";
    chooser.style.boxShadow = "0px 1px 1px transparent";

    /////////////// AGAIN, FOR WHEN I COME BACK TO THIS PROJECT //////////////
    function pushPeople () {
        var newPerson = new Person(newName,newEmail);
        people.push(newPerson);
        return people;
    }
    pushPeople();

}

submitButton.onclick = function (event) {
    event.preventDefault();
    addDisplay('visible');
    informationDisplay('hidden');
    createPerson();
}

})();



