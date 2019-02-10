var clockElement;
window.onload = function () {
    document.body.style.backgroundImage = "url(bg/" +
        Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24) % 102) + ".jpg)";
    clockElement = document.getElementById("clock");
	updateClock();
	setInterval(function () {
		updateClock();
	}, 1000);
}

var daysOfTheWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
function updateClock() {
	var time = new Date();
	var hours = time.getHours().toString();
	var minutes = time.getMinutes().toString();
	if (hours >= 12)
        hours -= 12;
	if (minutes.length == 1)
		minutes = "0" + minutes;
	
	clockElement.innerHTML = hours + ":" + minutes + "<br>"
        + daysOfTheWeek[time.getDay()] + ", " + months[time.getMonth()] + " " + time.getDate(); 
}