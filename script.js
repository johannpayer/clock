/* global backgrounds document clock window */
let backgroundSeed;
let lastUpdateDay;

function hash(string) {
  const hashes = [ 3735928559, 1103547991 ];
  [ ...string ].forEach((char) => {
    // eslint-disable-next-line no-bitwise
    [ 2654435761, 1597334677 ].forEach((x, i) => { hashes[i] = Math.imul(hashes[i] ^ char.charCodeAt(0), x); });
  });

  hashes.forEach((x, i, a) => {
    const other = a[Math.abs(i - 1)];
    // eslint-disable-next-line no-bitwise
    a[i] = Math.imul(x ^ (x >>> 16), 2246822507) ^ Math.imul(other ^ (other >>> 13), 3266489909);
  });

  // eslint-disable-next-line no-bitwise
  return 4294967296 * (2097151 & hashes[1]) + (hashes[0] >>> 0);
}

function updateBackground() {
  const background = backgrounds[hash(backgroundSeed || new Date().setHours(0, 0, 0, 0).toString()) % backgrounds.length];
  document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-${background.photoId})`;
  clock.style.color = background.showBlackText ? 'black' : 'white';
}

let lastMinute;
function updateClock(doForce) {
  const date = new Date();
  const day = date.getDay();
  if (day !== lastUpdateDay && !backgroundSeed) {
    updateBackground();
    lastUpdateDay = day;
  }

  const minuteTime = (new Date()).setSeconds(0, 0);
  if (lastMinute !== minuteTime || doForce) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    clock.innerHTML = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours < 12 ? 'A' : 'P'}M<br>${
      date.toLocaleDateString('en-us', {
        month : 'long',
        day : 'numeric',
        weekday : 'long',
      })}`;

    lastMinute = minuteTime;
  }
}

window.addEventListener('load', () => {
  const seperator = '?seed=';
  const param = decodeURI(window.location.href).split('&').find((x) => x.includes(seperator));
  if (param) {
    // eslint-disable-next-line prefer-destructuring
    backgroundSeed = param.split(seperator)[1];
  }

  updateBackground();
  updateClock(true);
  setInterval(() => updateClock(false), 1000);
});
