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

//// Linear execution starts here

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
    })
    .catch((err) => {
        console.error('Error loading fonts:', err);
    });
