/**
 * @typedef FontBox
 * @property {FontData} data
 * @property {FontFace} fontFace
 */

import fontsData from './assets/fonts/fonts.js';

/**
 * @param {FontData} fontData
 * @return {void}
 */
function updatePageForFontOptions(fontData) {
    const fontOptionsListEl = document.querySelector('[data-font-options]');
    const fontOptionTemplate = document.getElementById('font-list-option');

    for (const { id, family } of fontData) {
        const fontOptionEl = document.importNode(fontOptionTemplate.content, true);
        const buttonEl = fontOptionEl.querySelector('button');
        buttonEl.value = id;
        buttonEl.innerText = family;

        fontOptionsListEl.appendChild(fontOptionEl);
    }
}

/**
 * @param {boolean} fontsReady
 */
function toggleElementsOnFontsState(fontsReady) {
    const fontsReadyEls = document.querySelectorAll('[data-show-when-fonts-ready]').values();
    const fontsLoadingEls = document.querySelectorAll('[data-show-when-fonts-loading]').values();

    if (fontsReady) {
        fontsLoadingEls.forEach((el) => el.classList.add('hide'));
        fontsReadyEls.forEach((el) => el.classList.remove('hide'));
    } else {
        fontsLoadingEls.forEach((el) => el.classList.remove('hide'));
        fontsReadyEls.forEach((el) => el.classList.add('hide'));
    }
}

//// Linear execution starts here

toggleElementsOnFontsState(false);

/** @type FontFace[] */
const fontFaces = [];
fontsData.forEach((fontData) => {
    const fontFace = new FontFace(
        fontData.family,
        `url("assets/fonts/${fontData.filename}")`,
        {
            style: "normal",
            weight: "normal"
        }
    );

    fontFaces.push(fontFace);
});

Promise.all(fontFaces.values().map((face) => {
    document.fonts.add(face);
    return face.load();
}))
    .then(() => {
        console.log('Loaded all fonts!');
        updatePageForFontOptions(fontsData);
        toggleElementsOnFontsState(true);
    })
    .catch((err) => {
        console.error('Error loading fonts:', err);
    });
