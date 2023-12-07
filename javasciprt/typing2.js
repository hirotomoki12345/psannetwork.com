function select() {
  // 対象の要素を取得
  const lockElements = document.querySelectorAll('.edicon-lock.lessonblock-lock');

  // ランダムなインデックスを生成
  const randomIndex = Math.floor(Math.random() * lockElements.length);

  // ランダムに選択した要素をクリック
  const randomElement = lockElements[randomIndex];
  if (randomElement) {
    randomElement.click();
  }
}

// 上記の関数を実行
select();



function level1() {
  const keyElement = document.querySelector('.keybtn2');

  if (keyElement) {
    const zKey = keyElement.textContent.trim();
    window.core.record_keydown_time(zKey);
  }

  const boxedChars = document.querySelectorAll('.boxed-char');
  if (boxedChars) {
    async function typeElement(element) {
      const char = element.textContent.trim();
      window.core.record_keydown_time(char);
      await sleep((maxTypingDelay - minTypingDelay) * Math.random() + minTypingDelay);
    }

    async function typeAllElements() {
      for (const element of boxedChars) {
        await typeElement(element);
      }
    }

    typeAllElements();
  }
}

function skip() {
  const continueButton = document.querySelector('.next_btn');
  if (continueButton) {
    continueButton.click();
  } else {
    const continueButton1 = document.querySelector('.btn.navbar-continue.primary.hoverable-button');
    if (continueButton1) {
      continueButton1.click();
    } else {
      const continueButton2 = document.querySelector('.nav-icon');
      const hdrltCompact = document.querySelector('.hdrlt.compact');

      if (continueButton2 && !hdrltCompact) {
        continueButton2.click();
      } 
      }
    }
  }

function skipcontinue() {
  const continueButton3 = document.querySelector('.btn.btn-lg.pull-right.btn-primary');
  if (continueButton3) {
    continueButton3.click();
  }
}


setInterval(skip, 2000);
setInterval(level1, 2000);
setInterval(select, 2000);
setInterval(skipcontinue, 1000);

let minTypingDelay = 60;
let maxTypingDelay = 60;

const speedSlider = document.createElement("input");
speedSlider.type = "range";
speedSlider.id = "speedSlider";
speedSlider.min = 30;
speedSlider.max = 200;
speedSlider.value = (minTypingDelay + maxTypingDelay) / 2;

speedSlider.addEventListener("input", () => {
  const currentValue = parseInt(speedSlider.value);
  minTypingDelay = currentValue / 2;
  maxTypingDelay = currentValue;
});

speedSlider.style.position = "fixed";
speedSlider.style.top = "30px";
speedSlider.style.right = "30px";
speedSlider.style.zIndex = "9999";

document.body.appendChild(speedSlider);

const keyOverrides = {
  [String.fromCharCode(160)]: ' '
};

function getTargetCharacters() {
  const els = Array.from(document.querySelectorAll('.token span.token_unit'));
  const chrs = els.map(el => {
    if (el.firstChild?.classList?.contains('_enter')) {
      return '\n';
    }
    let text = el.textContent[0];
    return text;
  }).map(c => keyOverrides.hasOwnProperty(c) ? keyOverrides[c] : c);
  return chrs;
}

function recordKey(chr) {
  window.core.record_keydown_time(chr);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

let autoPlayRunning = false;

async function autoPlay(finish) {
  autoPlayRunning = true;
  const chrs = getTargetCharacters();
  for (let i = 0; i < chrs.length - (!finish); ++i) {
    if (!autoPlayRunning) break; // Check if another instance of autoPlay is running
    const c = chrs[i];
    recordKey(c);
    await sleep(Math.random() * (maxTypingDelay - minTypingDelay) + minTypingDelay);
  }
  autoPlayRunning = false;
}

function main() {
  // Check if autoPlay is not already running
  if (!autoPlayRunning) {
    setTimeout(() => {
      const playModeElement = document.querySelector('.typable.mono_standard.play_mode.linified');
      if (playModeElement) {
        autoPlay(true);
      }
    }, 3000);
  }
}

setInterval(main, 5000);

