var clockElement;
var day = Math.floor((new Date() - new Date(0, 0)) / 86400000);
window.onload = function () {
    "use strict";
    updateBackground();
    clockElement = document.getElementById("clock");
    updateClock();
    setInterval(function () {
        updateClock();
    }, 1000);
};

var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateClock() {
    "use strict";
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    if (hours === 0 && minutes === 0 && seconds === 0) {
        day++;
        updateBackground();
    }

    if (hours <= 12)
        var add = "A";
    else
        var add = "P";

    if (hours >= 12)
        hours -= 12;

    if (minutes.toString().length === 1)
        var displayMinutes = "0" + minutes;
    else
        var displayMinutes = minutes;

    if (hours === 0)
        var displayHours = 12;
    else
        var displayHours = hours;

    clockElement.innerHTML = displayHours + ":" + displayMinutes + " " + add + "M<br>" +
        daysOfTheWeek[time.getDay()] + ", " + months[time.getMonth()] + " " + time.getDate();
}

function updateBackground() {
    "use strict";
    document.body.style.backgroundImage = "url('bg/img (" + day % 118 + ").jpg')";
}