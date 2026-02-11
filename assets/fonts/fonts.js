/**
 * @typedef FontData
 * @property {string} filename
 * @property {string} id
 * @property {string} family
 * @property {string} sourceUrl
 * @property {boolean} isVariable
 */

/** @type FontData[]
 * Fonts to display on the playground must be added here.
 */
const fonts = [
    {
        filename: 'Inter-VariableFont_opsz,wght.ttf',
        id: 'inter',
        family: 'Inter',
        sourceUrl: 'https://fonts.google.com/specimen/Inter',
        isVariable: true
    },
    {
        filename: 'Roboto-VariableFont_wdth,wght.ttf',
        id: 'roboto',
        family: 'Roboto',
        sourceUrl: 'https://fonts.google.com/specimen/Roboto',
        isVariable: true
    },
    {
        filename: 'WorkSans-VariableFont_wght.ttf',
        id: 'worksans',
        family: 'Work Sans',
        sourceUrl: 'https://fonts.google.com/specimen/Work+Sans',
        isVariable: true
    },
    {
        filename: 'Figtree-VariableFont_wght.ttf',
        id: 'figtree',
        family: 'Figtree',
        sourceUrl: 'https://fonts.google.com/specimen/Figtree',
        isVariable: true
    },
];

const fontsSorted = fonts.sort(({id: idA}, {id: idB}) => idA.localeCompare(idB));
export default fontsSorted;