var clockElement;
var day = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
window.onload = function () {
    updateBackground();
    clockElement = document.getElementById("clock");
    updateClock();
    setInterval(function () {
        updateClock();
    }, 1000);
}

var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var lastHour;
function updateClock() {
    var time = new Date();
    var hours = time.getHours().toString();
    var minutes = time.getMinutes().toString();
    
    if (lastHour != null && hours == 0 && lastHour == 23) {
        day++;
        updateBackground();
    }
    
    if (hours >= 12)
        hours -= 12;
    if (minutes.length == 1)
        minutes = "0" + minutes;
    var displayHours;
    if (hours == 0)
        displayHours = 12;
    else
        displayHours = hours;
    
    var text = displayHours + ":" + minutes + " ";
    if (hours <= 12)
        text += "A";
    else
        text += "P";
    text += "M<br>" +
        daysOfTheWeek[time.getDay()] + ", " + months[time.getMonth()] + " " + time.getDate()
    
    clockElement.innerHTML = text;
    lastHour = hours;
}

function updateBackground() {
    document.body.style.backgroundImage = "url(bg/" + day % 102 + ".jpg)";
}