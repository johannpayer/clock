"use strict";

Date.prototype.stdTimezoneOffset = function () {
    var january = new Date(this.getFullYear(), 0, 1);
    var july = new Date(this.getFullYear(), 6, 1);
    return Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

var clockElement;
var add = 0;
var time = new Date();
if (time.isDstObserved())
    add = 3600000;
var day = Math.floor((time - new Date(0, 0) + add) / 86400000);
window.onload = function () {
    clockElement = document.getElementById("clock");
    updateBackground();
    updateClock(true);
    setInterval(function () {
        updateClock(false);
    }, 1000);
};

var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateClock(force) {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    if (seconds === 0 || force) {
        if (hours === 0 && minutes === 0) {
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
}

function updateBackground() {
    var dayURL = day % 132 + 1;
    document.body.style.backgroundImage = "url('bg/img (" + dayURL + ").jpg')";
    if ([9, 11, 30, 35, 41, 48, 67, 72, 91, 98, 121, 128].includes(dayURL))
        clockElement.style.color = "black";
    else
        clockElement.style.color = "white";
}