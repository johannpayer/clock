let backgroundSeed = null;

// adapted from "bryc" https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function cyrb53(str, seed = 0) {
  let h1 = 3735928559 ^ seed;
  let h2 = 1103547991 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function updateBackground() {
  const background = backgrounds[cyrb53(backgroundSeed || new Date().setHours(0, 0, 0, 0).toString()) % backgrounds.length];
  document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-${background.photoId})`;
  clock.style.color = background.showBlackText ? 'black' : 'white';
}

function updateClock(force) {
  const date = new Date();
  if (date.getSeconds() === 0 || force) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours === 0 && minutes === 0 && backgroundSeed === null) {
      updateBackground();
    }

    const displayHours = hours % 12;
    clock.innerHTML = `${displayHours === 0 ? 12 : displayHours}:${minutes.toString().length === 1 ? '0' : ''}${minutes} ${hours < 12 ? 'A' : 'P'}M<br>${
      date.toLocaleDateString('en-us', {
        month : 'long',
        day : 'numeric',
        weekday : 'long',
      })}`;
  }
}

window.addEventListener('load', () => {
  const args = window.location.href.split('?seed=');
  if (args.length === 2) {
    // eslint-disable-next-line prefer-destructuring
    backgroundSeed = args[1];
  }

  updateBackground();
  updateClock(true);
  setInterval(() => updateClock(false), 1000);
});
