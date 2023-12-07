const normalMinDelay = 50;
const normalMaxDelay = 50;
const finalMinDelay = 200;
const finalMaxDelay = 150;
const maxCharsBeforeSpeedChange = 10;
const typoChance = 0.09;

const keyOverrides = {
  '\u00A0': ' ',
};

function getTargetCharacters() {
  const els = Array.from(document.querySelectorAll('.token span.token_unit'));
  const chrs = els.map(el => {
    if (el.firstChild?.classList?.contains('_enter')) {
      return '\n';
    } else if (el.firstChild?.classList?.contains('_tab')) {
      return '\t';
    }
    return el.textContent[0];
  }).map(c => keyOverrides[c] || c);
  return chrs;
}

function recordKey(chr) {
  if (chr === '\t') {
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
  } else {
    window.core.record_keydown_time(chr);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateDelay(numChars, currentIndex, minDelay, maxDelay, speedMultiplier = 1) {
  const remainingChars = numChars - currentIndex - 1;
  if (remainingChars <= maxCharsBeforeSpeedChange) {
    return Math.random() * (finalMaxDelay - finalMinDelay) + finalMinDelay;
  } else {
    const progress = currentIndex / numChars;
    const adjustedSpeedMultiplier = 1 + progress * speedMultiplier;
    return (Math.random() * (maxDelay - minDelay) + minDelay) * adjustedSpeedMultiplier;
  }
}

function clickButtonWhenVisible() {
  const button = document.querySelector('.btn.navbar-continue');
  if (button) {
    button.click();
    console.log('ボタンをクリックしました');
  } else {
    console.log('ボタンが見つかりません');
    setTimeout(clickButtonWhenVisible, 1000);
    console.clear();
  }
}

function checkAndClickCloseButton() {
  const closeButtons = document.querySelectorAll('.edmodal-x');
  if (closeButtons.length > 0) {
    for (const closeButton of closeButtons) {
      closeButton.click();
    }
  }
}

setInterval(checkAndClickCloseButton, 1000);

async function autoPlay(finish) {
  const chrs = getTargetCharacters();
  const numChars = chrs.length;
  let delay = normalMaxDelay;
  for (let i = 0; i < numChars - (!finish); ++i) {
    const c = chrs[i];
    recordKey(c);
    const remainingChars = numChars - i - 1;
    if (remainingChars < maxCharsBeforeSpeedChange) {
      delay = calculateDelay(numChars, i, finalMinDelay, finalMaxDelay, 3);
    } else {
      delay = calculateDelay(numChars, i, normalMinDelay, normalMaxDelay);
    }
    await sleep(delay);

    if (chrs[i + 1] && chrs[i + 1] !== ' ' && Math.random() < typoChance) {
      await handleTypo(i);
    }
  }

  setTimeout(() => {
    clickButtonWhenVisible();
    autoPlay(true);
  }, 5000);
}

async function handleTypo(currentIndex) {
  const chrs = getTargetCharacters();
  const nextChar = chrs[currentIndex + 1];
  if (nextChar && nextChar !== ' ') {
    await sleep(50);
    recordKey(getRandomTypoCharacter(nextChar));
  }
}

function getRandomTypoCharacter(char) {
  const possibleChars = 'abcdefghijklmnopqrstuvwxyz';
  const randomChar = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  return randomChar !== char ? randomChar : getRandomTypoCharacter(char);
}

clickButtonWhenVisible();
autoPlay(true);
console.log('新しいモードが実行されました');
