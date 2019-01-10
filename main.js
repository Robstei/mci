function Person(firstName, lastName, age, city, profilePicture, 
    minSize, maxCost,
    interests, smoking, animals, profileURL) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.city = city;
    this.profilePicture = profilePicture;
    this.minSize = minSize;
    this.maxCost = maxCost;
    this.interests = interests;
    this.smoking = smoking;
    this.animals = animals;
    this.profileURL= profileURL;
};

let arrayPersons = [
    new Person("Robin", "Steil", 25, "Essen", "images/profile_robin.jpg", 10, 350,
    "images/interests_robin.png", true, "keine", "profil_robin.html"),
    new Person("Hannah", "Nachname", 23, "Duisburg", "images/profile_hannah.jpg", 15, 400,
    "images/interests_hannah.png", false, "keine", "profil_hannah.html")
];

function filterFunction(person){
    let city = $("input[name=filter-city]").val();
    let size = $("input[name=filter-size]").val();
    let cost = $("input[name=filter-cost]").val();
   
    if(city != "") {
        if (city != person.city) {
            return false;
        }
    }
    if(size != "") {
        if (size < person.minSize) {
            return false;
        }
    }
    if(cost != "") {
        if (cost > person.maxCost) {
            return false;
        }
    }
    return true;
}

function createProfileList(arrayPersons) {

    $("#container-wg-profiles").empty();

    $.each(arrayPersons, function(index, value) {
    
    $("#container-wg-profiles").append(`<div class="my-5 container-profile" style="display:inline-block; position:relative; width:400px; height:400px;" id="container-profile-${index}"></div>`);

    $(`#container-profile-${index}`).append(`<a style="position:absolute; height:400px; width:400px; display:block;" href="${value.profileURL}"><img id="profilePicture-${index}" src="${value.profilePicture}" style="position:absolute; height:400px; width:400px" alt="Profilbild"></img></a>`);

    if(value.smoking) {
        $(`#container-profile-${index}`).append(`<img style="position:absolute; bottom:5px; left:20px;" src="images/smoking.jpg" height="30px" width="30px" alt="Raucher"></img>`);
    }
    
    $(`#container-profile-${index}`).append(`<img style="position:absolute;" class="interests-picture" id="InterestsPicture-${index}" src="${value.interests}" height="400px" width="400px" alt="Interessen" ></img>`);
    });
};

$(document).ready(function() {
   
    $("body").on("click",".interests-picture", function() {
        $(event.target).hide();
    });

    $("#filter-button").on("click", function(){
        createProfileList(
            arrayPersons.filter(filterFunction))});

    createProfileList(arrayPersons);
});

