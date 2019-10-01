"use strict";

var backgrounds;
var clockElement;
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
	if (date.getSeconds() === 0 || force) {
		var hours = date.getHours(),
			minutes = date.getMinutes();
		if (hours === 0 && minutes === 0)
			updateBackground();

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
	var background = backgrounds[Math.floor(pseudorandom(new Date().toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	}).hashCode()) * backgrounds.length)];
	document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-" + background.PhotoID + ")";
	clockElement.style.color = background.BlackText ? "black" : "white";
}

function pseudorandom(seed) {
	seed += 0x6D2B79F5;
	seed = Math.imul(seed ^ seed >>> 15, seed | 1);
	seed ^= seed + Math.imul(seed ^ seed >>> 7, seed | 61);
	return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
}

String.prototype.hashCode = function () {
	var hash = 0,
		i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
}