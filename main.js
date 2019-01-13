function Person(firstName, lastName, age, city, profilePicture, 
    minSize, maxCost,
    arrayInterests, smoking, animals, profileURL) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.city = city;
    this.profilePicture = profilePicture;
    this.minSize = minSize;
    this.maxCost = maxCost;
    this.arrayInterests = arrayInterests;
    this.smoking = smoking;
    this.animals = animals;
    this.profileURL= profileURL;
};

let arrayPersons = [
    new Person("Robin", "Steil", 25, "Essen", "images/profile_robin.jpg", 10, 350,
    ["images/interests/burger.jpg", "images/interests/musik.jpg", "images/interests/tennis.jpg", "images/interests/got.jpg"], true, false, "profil_robin.html"),
    new Person("Hannah", "Nachname", 23, "Duisburg", "images/profile_hannah.jpg", 15, 400,
    ["images/interests/eis.jpg", "images/interests/shopping.jpg", "images/interests/surfen.jpg", "images/interests/champagne.jpg"], false, true, "profil_hannah.html"),
    new Person("Emilie", "Nachname", 19, "Duisburg", "images/profile_emilie.jpg", 12, 320,
    ["images/interests/hantel.jpg", "images/interests/fussball.jpg", "images/interests/kamera.jpg", "images/interests/backpack.jpg"], false, false, "#"),
    new Person("Hannah", "Nachname", 23, "Duisburg", "images/profile_karl.jpg", 15, 400,
    ["images/interests/fahrrad.jpg", "images/interests/roller.jpg", "images/interests/waffel.jpg", "images/interests/klavier.jpg"], false, true, "#")
];

function filterFunction(person){
    let city = $("input[name=filter-city]").val();
    let size = $("input[name=filter-size]").val();
    let cost = $("input[name=filter-cost]").val();
    let notsmoking = $("input[name=filter-smoking]").prop('checked');
    let noanimals = $("input[name=filter-animal]").prop('checked');
   
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

    if(notsmoking) {
        if (person.smoking) {
            return false;
        }
    }

    if(noanimals) {
        if (person.animals) {
            return false;
        }
    }
    return true;
}

function createProfileList(arrayPersons) {

    $("#container-wg-profiles").empty();

    $.each(arrayPersons, function(index, value) {
    
    $("#container-wg-profiles").append(`<div class="my-5 container-profile" style="display:inline-block; position:relative; width:400px; height:400px;" id="container-profile-${index}"></div>`);

    $(`#container-profile-${index}`).append(`<a style="position:absolute; height:400px; width:400px; display:block;" href="${value.profileURL}">
    <img id="profilePicture-${index}" src="${value.profilePicture}" style="position:absolute; height:400px; width:400px" alt="Profilbild"></img></a>`);

    if(value.smoking) {
        $(`#container-profile-${index}`).append(`<img style="position:absolute; bottom:5px; left:20px;" src="images/icons/cigarette.png" height="30px" width="30px" alt="Raucher"></img>`);
    } else {
        $(`#container-profile-${index}`).append(`<img style="position:absolute; bottom:5px; left:20px;" src="images/icons/cigarette_not.png" height="30px" width="30px" alt="Raucher"></img>`);
    }

    if(value.animals) {
        $(`#container-profile-${index}`).append(`<img style="position:absolute; bottom:5px; left:60px;" src="images/icons/tier.png" height="30px" width="30px" alt="Raucher"></img>`);
    } else {
        $(`#container-profile-${index}`).append(`<img style="position:absolute; bottom:5px; left:60px;" src="images/icons/tier_not.png" height="30px" width="30px" alt="Raucher"></img>`);

    }
    
    $(`#container-profile-${index}`).append(
       `<img style="position:absolute; top:0px; left:0px" class="interests-picture" src="${value.arrayInterests[0]}" height="200px" width="200px" alt="Interessen" ></img>`,
        `<img style="position:absolute; top:0px; left:200px" class="interests-picture" src="${value.arrayInterests[1]}" height="200px" width="200px" alt="Interessen" ></img>`,
       `<img style="position:absolute; top:200px; left:0px" class="interests-picture" src="${value.arrayInterests[2]}" height="200px" width="200px" alt="Interessen" ></img>`,
       `<img style="position:absolute; top:200px; left:200px" class="interests-picture" src="${value.arrayInterests[3]}" height="200px" width="200px" alt="Interessen" ></img>`);
    });
};

$(document).ready(function() {
   
    $("body").on("click",".interests-picture", function() {
        $(event.target).fadeOut("slow");
    });
    
    $("body").on("mouseenter",".interests-picture", function() {
        document.body.style.cursor="pointer";
       // $(event.target).css({zIndex: 10});
        //$("#dark-background").fadeTo(100,0.5);
    });

    $("body").on("mouseleave",".interests-picture", function() {
        document.body.style.cursor="default";
        //$(event.target).css({zIndex: 0});
        //$("#dark-background").hide();
    });

    $("#filter-button").on("click", function(){
        createProfileList(
            arrayPersons.filter(filterFunction))});

    createProfileList(arrayPersons);
});

