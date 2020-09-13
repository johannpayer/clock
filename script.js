let backgroundSeed = null;

function getStringHashCode(str) {
  /* eslint-disable no-bitwise */
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }

  return hash;
}

function pseudorandom(seed) {
  /* eslint-disable no-bitwise */
  /* eslint-disable no-mixed-operators */
  let num = seed + 0x6D2B79F5;
  num = Math.imul(num ^ num >>> 15, num | 1);
  num ^= num + Math.imul(num ^ num >>> 7, num | 61);
  return ((num ^ num >>> 14) >>> 0) / 4294967296;
}

function updateBackground() {
  const hashCode = getStringHashCode(backgroundSeed === null ? new Date().toLocaleDateString('en-us', {
    year : 'numeric',
    month : 'numeric',
    day : 'numeric',
  }) : backgroundSeed);
  const background = backgrounds[Math.floor(pseudorandom(hashCode) * backgrounds.length)];
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

$(() => {
  const args = window.location.href.split('?seed=');
  if (args.length === 2) {
    // eslint-disable-next-line prefer-destructuring
    backgroundSeed = args[1];
  }

  updateBackground();
  updateClock(true);
  setInterval(() => updateClock(false), 1000);
});
