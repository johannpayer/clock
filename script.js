let backgroundSeed = null;
$(function () {
  let args = window.location.href.split("?seed=");
  if (args.length === 2) {
    backgroundSeed = args[1];
  }

  updateBackground();
  updateClock(true);
  setInterval(() => updateClock(false), 1000);
});

function updateClock(force) {
  let date = new Date();
  if (date.getSeconds() === 0 || force) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours === 0 && minutes === 0 && backgroundSeed === null) {
      updateBackground();
    }

    let displayHours = hours % 12;
    clock.innerHTML = (displayHours === 0 ? 12 : displayHours) + ":" + (minutes.toString().length === 1 ? "0" : "") + minutes + " " + (hours < 12 ? "A" : "P") + "M<br>" +
      date.toLocaleDateString('en-us', {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
  }
}

function updateBackground() {
  let background = backgrounds[Math.floor(pseudorandom((backgroundSeed === null ? new Date().toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }) : backgroundSeed).hashCode()) * backgrounds.length)];
  document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-" + background.PhotoId + ")";
  clock.style.color = background.BlackText ? "black" : "white";
}

function pseudorandom(seed) {
  seed += 0x6D2B79F5;
  seed = Math.imul(seed ^ seed >>> 15, seed | 1);
  seed ^= seed + Math.imul(seed ^ seed >>> 7, seed | 61);
  return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
}

String.prototype.hashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    hash = ((hash << 5) - hash) + this.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
