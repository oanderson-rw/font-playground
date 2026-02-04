/**
 * @typedef FontBox
 * @property {FontData} data
 * @property {HTMLElement} boxEl
 * @property {FontFace} fontFace
 */

import fontsData from './assets/fonts/fonts.js';

/**
 * @param {FontData} fontData
 * @return {HTMLElement}
 */
function createFontBoxElement(fontData) {
    const fontBoxTemplate = document.getElementById('font-box-template')
    const fontBoxEl = document.importNode(fontBoxTemplate.content, true);

    const articleEl = fontBoxEl.querySelector('article');
    articleEl.id = `fontbox-${fontData.id}`;

    articleEl.querySelector('h3 > [data-family]').innerText = fontData.family;
    articleEl.querySelector('h3 > [data-is-variable]').innerText = fontData.isVariable ? '(variable)' : '';
    articleEl.querySelector('p').style.setProperty('--font-family', fontData.family);
    articleEl.querySelector('a').href = fontData.sourceUrl;

    // TODO: Add more markup stuff to fontBoxEl?

    return fontBoxEl;
}

/** @type FontBox[] */
const fontBoxes = [];
fontsData.forEach((fontData) => {
    const fontFace = new FontFace(
        fontData.family,
        `url("/assets/fonts/${fontData.filename}")`,
        {
            style: "normal",
            weight: "normal"
        }
    );

    fontBoxes.push(
        /** @type FontBox */ {
            boxEl: createFontBoxElement(fontData),
            face: fontFace
        });
});

Promise.all(fontBoxes.values().map(({face}) => {
    document.fonts.add(face);
    return face.load();
}))
    .then(() => {
        console.log('Loaded all fonts!');
        const fontBoxesEl = document.getElementById('font-boxes');
        for (const {boxEl} of fontBoxes) {
            fontBoxesEl.appendChild(boxEl);
        }
    })
    .catch((err) => {
        console.error('Error loading fonts:', err);
    });