function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}



// SCRIPT FOR SWIPE.HTML PAGE
$(document).ready(function () {
    //sidebar animations
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});



let generatedDates = JSON.parse(sessionStorage.getItem('dates'));
generatedDates = shuffle(generatedDates)
console.log("dates: ", generatedDates);

// Mock generatedDates[] array 
// let generatedDates = [
//     {
//         "id": 0,
//         "name": "Picnic in the Arb",
//         "about": "This is a fun date idea! You should definitely go here.",
//         "indoor": true,
//         "address": "530 S 4th Ave",
//         "season": "spring, summer",
//         "price": 0,
//         "images": [
//             "demoimg.jpg",
//             "demoimg2.jpg",
//             "demoimg3.jpg"
//         ]
//     },
//     {
//         "id": 1,
//         "name": "Watch a Movie",
//         "about": "This is also a fun date! You should go here instead.",
//         "indoor": true,
//         "address": "338 E Jefferson St",
//         "season": "any",
//         "price": 1,
//         "images": [
//             "demoimg.jpg",
//             "demoimg2.jpg",
//             "demoimg3.jpg"
//         ]
//     }
// ];

// What the actual data in date_ideas.js looks like
// {
//     "Name": "Walk in the Arb",
//     "About": "As for more relaxed things to do in Ann Arbor for couples, nothing can beat Nichols Arboretum. These grounds are very secluded and quiet – just the thing for couples that want to enjoy each other and not the crowds of strangers. The scenery changes all the time: new plans, new flowers and trees. You will love this setting and maybe it will become your usual place.",
//     "PictureLinks": "https://upload.wikimedia.org/wikipedia/commons/e/e3/NicholsArb.JPG",
//     "Address": "899 Nichols Dr, Ann Arbor, MI 48109",
//     "Price": 0,
//     "Season": "Summer, Spring, Fall",
//     "Inside": false
// }

// More Info popup
let modal = document.getElementById("myModal");
let btn = document.getElementById("info");
let span = document.getElementsByClassName("close")[0];

// Open and close popup
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Dates data
let likedDates = [];
let index = 0; // maybe save this in session data?
let slideIndex = 0;

// HTML elements
let img = document.getElementById("image");
let dateName = document.getElementById("name");
let price = document.getElementById("price");
let loc = document.getElementById("location");

// HTML popup elements
let modalName = document.getElementById("modalName");
let about = document.getElementById("about");
let season = document.getElementById("season");
let modalLoc = document.getElementById("modalLoc");
let modalPrice = document.getElementById("modalPrice");

// First card (on page load)
// img.src = generatedDates[0]["images"][0]; // there is only 1 image
img.src = generatedDates[0]["PictureLinks"];
dateName.innerHTML = generatedDates[0]["Name"];
price.innerHTML = "price: " + translatePrice(generatedDates[0]["Price"]);
loc.innerHTML = "location: " + generatedDates[0]["Address"];

// First popup 
modalName.innerHTML = generatedDates[0]["Name"];
about.innerHTML = generatedDates[0]["About"];
season.innerHTML = "<b>season: </b>" + generatedDates[0]["Season"];
modalLoc.innerHTML = "<b>location: </b>" + translateLoc(generatedDates[0]["Inside"]);
modalPrice.innerHTML = "<b>price: </b>" + translatePrice(generatedDates[0]["Price"]);

function validData() {
  let oldLikedDates = JSON.parse(sessionStorage.getItem('likedDates'));
  let addDateName = generatedDates[index]["Name"]
  for (var key in oldLikedDates){
    if (oldLikedDates[key]["Name"] === addDateName) {
      return false;
    }
  }
  return true;
}
// Choose reject or heart a date
function swipeDate(heart){
    if (generatedDates.length === 0){
      console.log(generatedDates.length, generatedDates.length === 0)
      return;
    }

    if (heart && validData()) {
        console.log("im adding stuff")
        // Add date to likedDates[]
        // full list
        // trying to add
        let oldLikedDates = []
        if (sessionStorage.getItem('likedDates') !== null) {
            oldLikedDates = JSON.parse(sessionStorage.getItem('likedDates'));
        }
        if (!(generatedDates[index] in oldLikedDates)) {
            oldLikedDates.push(generatedDates[index]);
            sessionStorage.setItem('likedDates', JSON.stringify(oldLikedDates));
        }
    } 

    // Remove from generatedDates[] so it doesn't display again
    generatedDates.splice(index, 1);

    // Check if there are any more dates
    if (generatedDates.length === 0){
        // if not, display "no more dates"
        img.src = "datesite_icon_nobkgrd.png"
        dateName.innerHTML = "No more dates :(";
        price.innerHTML = "";
        loc.innerHTML = "";    
        return;
    } 
    
    // Update index (circle through)
    if (index < generatedDates.length-1){
        index += 1;
    } else {
        index = 0;
    }

    // Update date card
    // img.src = generatedDates[index]["images"][0]; // there is only 1 image
    img.src = generatedDates[index]["PictureLinks"];
    dateName.innerHTML = generatedDates[index]["Name"];
    price.innerHTML = "price: " + translatePrice(generatedDates[index]["Price"]);
    loc.innerHTML = "location: " + generatedDates[index]["Address"];

    // Update popup
    modalName.innerHTML = generatedDates[index]["Name"];
    about.innerHTML = generatedDates[index]["About"];
    season.innerHTML = "<b>season: </b>" + generatedDates[index]["Season"];
    modalLoc.innerHTML = "<b>location: </b>" + translateLoc(generatedDates[index]["Inside"]);
    modalPrice.innerHTML = "<b>price: </b>" + translatePrice(generatedDates[index]["Price"]);
}

// Slideshow through images
// Currently, date_ideas.js only has one picture for each date, so there's no need to slideshow
function scrollImages(direction){
    // Get array of images
    let dateImgs = generatedDates[index]["images"];

    // Scroll right
    if (direction){
        if (slideIndex === dateImgs.length-1){
            slideIndex = 0;
        } else {
            slideIndex += 1;
        }    
    }
    // Scroll left
    else if (!direction){
        if (slideIndex === 0){
            slideIndex = dateImgs.length-1;
        } else {
            slideIndex -= 1;
        }    
    }

    // Set the new img
    img.src = dateImgs[slideIndex];
}

// Translate price to words
function translatePrice(rawPrice){
    if (rawPrice === 0){
        return "free!";
    } else if (rawPrice === 1){
        return "$";
    } else if (rawPrice === 2){
        return "$$$";
    }
}

// Translate indoors to words
function translateLoc(indoors){
    if (indoors){
        return "indoors";
    } else {
        return "outdoors";
    }
}