"use strict";

Date.prototype.stdTimezoneOffset = function () {
	var january = new Date(this.getFullYear(), 0, 1),
		july = new Date(this.getFullYear(), 6, 1);
	return Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
};

Date.prototype.isDstObserved = function () {
	return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

var clockElement;
var time = new Date();
var day = Math.floor((time - new Date(0, 0) + (time.isDstObserved() ? 3600000 : 0)) / 86400000);
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
	var hours = time.getHours(),
		minutes = time.getMinutes();
	if (time.getSeconds() === 0 || force) {
		if (hours === 0 && minutes === 0) {
			day++;
			updateBackground();
		}

		clockElement.innerHTML = (hours === 0 ? 12 : hours % 12) + ":" + (minutes.toString().length === 1 ? "0" : "") +
			minutes + " " + (hours <= 12 ? "A" : "P") + "M<br>" + daysOfTheWeek[time.getDay()] + ", " +
			months[time.getMonth()] + " " + time.getDate();
	}
}

function updateBackground() {
	var dayURL = Math.floor(pseudorandom(day) * 132 + 1);
	document.body.style.backgroundImage = "url('bg/img (" + dayURL + ").jpg')";
	clockElement.style.color = [9, 11, 30, 35, 41, 48, 67, 72, 91, 98, 121, 128, 132].includes(dayURL) ? "black" : "white";
}

function pseudorandom(seed) {
	seed += 0x6D2B79F5;
	seed = Math.imul(seed ^ seed >>> 15, seed | 1);
	seed ^= seed + Math.imul(seed ^ seed >>> 7, seed | 61);
	return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
}