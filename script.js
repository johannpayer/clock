"use strict";

var backgrounds;
$.getJSON("https://raw.githubusercontent.com/flamesdev/clock/master/data.json", function (json) {
	backgrounds = json.Backgrounds;
});

var clockElement;
var day = Math.ceil((new Date() - new Date(0, 0)) / 8.64e7);
window.onload = function () {
	clockElement = document.getElementById("clock");
	updateBackground();
	updateClock(true);
	setInterval(function () {
		updateClock(false);
	}, 1000);
};

function updateClock(force) {
	var date = new Date();
	var hours = date.getHours(),
		minutes = date.getMinutes();
	if (date.getSeconds() === 0 || force) {
		if (hours === 0 && minutes === 0) {
			day++;
			updateBackground();
		}

		clockElement.innerHTML = (hours === 0 ? 12 : hours % 12) + ":" + (minutes.toString().length === 1 ? "0" : "") +
			minutes + " " + (hours <= 12 ? "A" : "P") + "M<br>" +
            date.toLocaleDateString('en-us', { month: 'long', day: 'numeric', weekday: 'long' });
	}
}

function updateBackground() {
	var dayURL = Math.floor(pseudorandom(day) * backgrounds.length + 1);
    var background = backgrounds[dayURL];
	document.body.style.backgroundImage = "url(https://source.unsplash.com/" + background.PhotoID + ")";
	clockElement.style.color = background.BlackText ? "black" : "white";
}

function pseudorandom(seed) {
	seed += 0x6D2B79F5;
	seed = Math.imul(seed ^ seed >>> 15, seed | 1);
	seed ^= seed + Math.imul(seed ^ seed >>> 7, seed | 61);
	return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
}