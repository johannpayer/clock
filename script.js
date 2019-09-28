"use strict";

var backgrounds;
var clockElement;
var day = Math.ceil((new Date() - new Date(0, 0)) / 8.64e7);
$.getJSON("https://raw.githubusercontent.com/flamesdev/clock/master/data.json", function (json) {
	backgrounds = json.Backgrounds;

	clockElement = document.getElementById("clock");
	updateBackground();
	updateClock(true);
	setInterval(function () {
		updateClock(false);
	}, 1000);
});

function updateClock(force) {
	var date = new Date();
	var hours = date.getHours(),
		minutes = date.getMinutes();
	if (date.getSeconds() === 0 || force) {
		if (hours === 0 && minutes === 0) {
			day++;
			updateBackground();
		}

        var displayHours = hours % 12;
		clockElement.innerHTML = (displayHours === 0 ? 12 : displayHours) + ":" + (minutes.toString().length === 1 ? "0" : "") +
			minutes + " " + (hours < 12 ? "A" : "P") + "M<br>" +
			date.toLocaleDateString('en-us', {
				month: 'long',
				day: 'numeric',
				weekday: 'long'
			});
	}
}

function updateBackground() {
	var dayURL = Math.floor(pseudorandom(day) * backgrounds.length);
	var background = backgrounds[dayURL];
	document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-" + background.PhotoID + ")";
	clockElement.style.color = background.BlackText ? "black" : "white";
}

function pseudorandom(seed) {
	seed += 0x6D2B79F5;
	seed = Math.imul(seed ^ seed >>> 15, seed | 1);
	seed ^= seed + Math.imul(seed ^ seed >>> 7, seed | 61);
	return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
}