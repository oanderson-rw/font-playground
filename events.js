import fontsData from './assets/fonts/fonts.js';

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
}

/**
 * @param {string} fontIdNew - Which size to change to. Refer to fontSizes map for valid values
 * @return {void}
 */
function changeFont(fontIdNew) {
    /** @type FontData */
    const fontData = fontsData.values().find(({ id }) => id === fontIdNew);
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
    sourceEl.innerText = "(source)";

    if (!hasPickedFont) {
        document.querySelector('[data-hide-on-start]').removeAttribute('data-hide-on-start');
        hasPickedFont = true;
    }
}

document.addEventListener('click', ({target}) => {
    if (!target) {
        return;
    }

    if ('eventChangeSize' in target.dataset) {
        changeFontSize(target.value);
    } else if ('eventChangeFont' in target.dataset) {
        changeFont(target.value);
    }
});