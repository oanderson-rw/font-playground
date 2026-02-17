import fontsData from './assets/fonts/fonts.js';
import textOptions from './text-options.js';
const layouts = new Map([
    ["paragraph", "fontShowingParagraph"],
    ["cards", "fontShowingCards"]
]);

let hasPickedFont = false;

/**
 * @param {string} sizeNew - Which size to change to. Refer to fontSizes map for valid values
 * @return {void}
 */
function changeFontSize(sizeNew) {
    document.getElementById('font-showing')
        .style.setProperty('--font-size', `${sizeNew}`);
    document.querySelector('[data-font-size]').innerText = sizeNew;
}

/**
 * @param {string} fontIdNew - Which size to change to. Refer to fontSizes map for valid values
 * @return {void}
 */
function changeFont(fontIdNew) {
    /** @type FontData */
    const fontData = fontsData.values().find(({id}) => id === fontIdNew);
    if (!fontData) {
        console.error("Couldn\'t update page for font", fontNew);
        return;
    }

    const fontShowingEl = document.getElementById('font-showing');

    const familyEl = fontShowingEl.querySelector('[data-family]');
    familyEl.innerText = fontData.family;

    fontShowingEl.querySelectorAll('[data-font-showing]').values().forEach(el => el.style.setProperty('--font-family', fontData.family));

    const sourceEl = fontShowingEl.querySelector('[data-source]');
    sourceEl.href = fontData.sourceUrl;
    sourceEl.innerText = "(font source)";

    if (!hasPickedFont) {
        document.querySelectorAll('[data-hide-on-start]').values().forEach((el) => el.removeAttribute('hidden'));
        document.querySelectorAll('[data-hide-after-start]').values().forEach((el) => {
            el.setAttribute('hidden', '');
        });
        document.querySelector('[data-font-not-yet-picked]').removeAttribute('data-font-not-yet-picked');

        hasPickedFont = true;
    }
}

/**
 * @param {string} option - Ready-made text option selected by the user
 */
function updateShownTextByOption(option) {
    const textNew = textOptions.get(option);
    if (textNew) {
        document.getElementById('input-text-to-show').value = textNew;
        updateShownText(textNew);
    }
}

/**
 * @param {string} textNew - The text to show for the font-showing text
 */
function updateShownText(textNew) {
    document.querySelectorAll('[data-font-showing]').values().forEach(el => el.innerText = textNew ? textNew : `(enter some text to show)`);
}

/**
 * @param {string} layoutNew
 */
function updateLayout(layoutNew) {
    const layoutToShowDatasetName = layouts.get(layoutNew);
    if (!layoutToShowDatasetName) {
        return;
    }

    document.querySelectorAll('[data-font-showing-container]').values().forEach((el) => {
        el.classList.toggle('hide', !(layoutToShowDatasetName in el.dataset));
    });
}

/**
 * @param {boolean} useTabularNumbers
 */
function updateFontForTabularNumbers(useTabularNumbers) {
    document.querySelectorAll('[data-font-showing]').values().forEach(el => el.classList.toggle('font--tabular-numbers', useTabularNumbers));
}

document.addEventListener('click', ({target}) => {
    if (!target) {
        return;
    }

    if ('eventChangeFont' in target.dataset) {
        changeFont(target.value);
    } else if ('eventTextShowOption' in target.dataset) {
        updateShownTextByOption(target.value);
    } else if ('eventChangeLayout' in target.dataset) {
        updateLayout(target.value);
    } else if (target.id === 'input-tabular-numbers') {
        updateFontForTabularNumbers(target.checked);
    }
});

document.addEventListener('input', ({ target }) => {
   if (!target) {
       return;
   }

   if (target.id === 'input-text-to-show') {
       updateShownText(target.value);
   } else if (target.id === 'input-font-size') {
       changeFontSize(target.value);
   }
});

//// Init stuff
updateShownTextByOption('pangram');
updateLayout('paragraph');
changeFontSize('1rem');