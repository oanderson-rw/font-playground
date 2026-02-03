/**
 * @typedef Font
 * @property {string} filename
 * @property {string} name
 * @property {string} sourceUrl
 * @property {boolean} isVariable
 */

/** @type Font[]
 * Fonts to display on the playground must be added here.
 */
const fonts = [
    {
        filename: 'Inter-VariableFont_opsz,wght.ttf',
        name: 'Inter',
        sourceUrl: '',
        isVariable: true
    },
    {
        filename: 'NotoSans-VariableFont_wdth,wght.ttf',
        name: 'Noto Sans',
        sourceUrl: '',
        isVariable: true
    },
    {
        filename: 'Roboto-VariableFont_wdth,wght.ttf',
        name: 'Roboto',
        sourceUrl: '',
        isVariable: true
    },
    {
        filename: 'WorkSans-VariableFont_wght.ttf',
        name: 'Work Sans',
        sourceUrl: '',
        isVariable: true
    }
];

export default fonts;