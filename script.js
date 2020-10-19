let backgroundSeed = null;

// adapted from "bryc" https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(string) {
  const hashes = [ 3735928559, 1103547991 ];
  [ ...string ].map((x) => x.charCodeAt(0)).forEach((charCode) => {
    [ 2654435761, 1597334677 ].map((x, i) => { hashes[i] = Math.imul(hashes[i] ^ charCode, x); });
  });
  hashes.forEach((x, i, a) => {
    const other = a[Math.abs(i - 1)];
    a[i] = Math.imul(x ^ (x >>> 16), 2246822507) ^ Math.imul(other ^ (other >>> 13), 3266489909);
  });
  return 4294967296 * (2097151 & hashes[1]) + (hashes[0] >>> 0);
}

function updateBackground() {
  const background = backgrounds[hash(backgroundSeed || new Date().setHours(0, 0, 0, 0).toString()) % backgrounds.length];
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
    clock.innerHTML = `${displayHours || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours < 12 ? 'A' : 'P'}M<br>${
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
