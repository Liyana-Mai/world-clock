setInterval(function() {

// Doha
let dohaElement = document.querySelector("#doha"); 
let dohaDateElement = dohaElement.querySelector(".date");
let dohaTimeElement = dohaElement.querySelector(".time");
let dohaTime = moment().tz("Asia/Qatar");

dohaDateElement.innerHTML = dohaTime.format("D MMMM YYYY");
dohaTimeElement.innerHTML = `${dohaTime.format("H:mm:ss")} <small>${dohaTime.format("A")}</small>`;
}, 1000);


setInterval(function() {
// New York
let newyorkElement = document.querySelector("#new-york"); 
let newyorkDateElement = newyorkElement.querySelector(".date");
let newyorkTimeElement = newyorkElement.querySelector(".time");
let newyorkTime = moment().tz("America/New_York"); // Corrected time zone

newyorkDateElement.innerHTML = newyorkTime.format("D MMMM YYYY");
newyorkTimeElement.innerHTML = `${newyorkTime.format("H:mm:ss")} <small>${newyorkTime.format("A")}</small>`;
}, 1000);