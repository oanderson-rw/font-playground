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
        sourceUrl: '',
        isVariable: true
    },
    {
        filename: 'NotoSans-VariableFont_wdth,wght.ttf',
        id: 'notosans',
        family: 'Noto Sans',
        sourceUrl: '',
        isVariable: true
    },
    {
        filename: 'Roboto-VariableFont_wdth,wght.ttf',
        id: 'roboto',
        family: 'Roboto',
        sourceUrl: '',
        isVariable: true
    },
    {
        filename: 'WorkSans-VariableFont_wght.ttf',
        id: 'worksans',
        family: 'Work Sans',
        sourceUrl: '',
        isVariable: true
    }
];

export default fonts;