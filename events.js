import fontsData from './assets/fonts/fonts.js';
import textOptions from './text-options.js';

const fontSizes = new Map([
    ['title', '--font-size--lg'],
    ['subtitle', '--font-size--md'],
    ['body', '--font-size--sm'],
    ['small', '--font-size--xs'],
]);

let hasPickedFont = false;

/**
 * @param {string} sizeNew - Which size to change to. Refer to fontSizes map for valid values
 * @return {void}
 */
function changeFontSize(sizeNew) {
    document.getElementById('font-showing')
        .style.setProperty('--font-size', `var(${fontSizes.get(sizeNew)}`);
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

    fontShowingEl.querySelector('p').style.setProperty('--font-family', fontData.family);

    const sourceEl = fontShowingEl.querySelector('[data-source]');
    sourceEl.href = fontData.sourceUrl;
    sourceEl.innerText = "(font source)";

    if (!hasPickedFont) {
        document.querySelectorAll('[data-hide-on-start]').values().forEach((el) => el.removeAttribute('hidden'));
        document.querySelectorAll('[data-hide-after-start]').values().forEach((el) => {
            el.setAttribute('hidden', '');
        });
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
    document.querySelector('[data-font-showing]').innerText = textNew ? textNew : `(enter some text to show)`;
}

document.addEventListener('click', ({target}) => {
    if (!target) {
        return;
    }

    if ('eventChangeSize' in target.dataset) {
        changeFontSize(target.value);
    } else if ('eventChangeFont' in target.dataset) {
        changeFont(target.value);
    } else if ('eventTextShowOption' in target.dataset) {
        updateShownTextByOption(target.value);
    }
});

document.addEventListener('input', ({ target }) => {
   if (!target) {
       return;
   }

   if (target.id === 'input-text-to-show') {
       updateShownText(target.value);
   }
});

//// Init stuff
document.getElementById('input-text-to-show').value = "The five boxing wizards jump quickly.";