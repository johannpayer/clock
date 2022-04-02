let backgroundSeed;
let lastUpdateDay;

function getHash(string) {
  const hashes = [3735928559, 1103547991];
  [...string].forEach((char) =>
    [2654435761, 1597334677].forEach(
      (x, i) => (hashes[i] = Math.imul(hashes[i] ^ char.charCodeAt(0), x))
    )
  );

  hashes.forEach((x, i, a) => {
    const other = a[Math.abs(i - 1)];
    a[i] =
      Math.imul(x ^ (x >>> 16), 2246822507) ^
      Math.imul(other ^ (other >>> 13), 3266489909);
  });

  return 4294967296 * (2097151 & hashes[1]) + (hashes[0] >>> 0);
}

function updateBackground() {
  const hash = getHash(
    backgroundSeed ?? new Date().setHours(0, 0, 0, 0).toString()
  );

  const background = backgrounds[hash % backgrounds.length];

  const { width, height } = window.screen;
  document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-${background.photoId}?w=${width}&h=${height})`;

  clock.style.color = background.doShowBlackText ? 'black' : 'white';
}

let lastMinute;
function updateClock(doForce) {
  const date = new Date();
  const day = date.getDay();
  if (day !== lastUpdateDay && !backgroundSeed) {
    updateBackground();
    lastUpdateDay = day;
  }

  const minuteTime = new Date().setSeconds(0, 0);
  if (lastMinute !== minuteTime || doForce) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const displayHour = hours % 12 || 12;
    const displayMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
    const hourSuffix = `${hours < 12 ? 'A' : 'P'}M`;
    const displayDate = date.toLocaleDateString('en-us', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    clock.innerHTML = `${displayHour}:${displayMinutes} ${hourSuffix}<br>${displayDate}`;
    lastMinute = minuteTime;
  }
}

window.addEventListener('load', () => {
  const seperator = '?seed=';
  const param = decodeURI(window.location.href)
    .split('&')
    .find((x) => x.includes(seperator));

  if (param) {
    backgroundSeed = param.split(seperator)[1];
  }

  updateBackground();
  updateClock(true);
  setInterval(() => updateClock(false), 1000);
});
