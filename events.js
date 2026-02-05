const fontSizes = new Map([
    ['title', '--font-size--lg'],
    ['subtitle', '--font-size--md'],
    ['body', '--font-size--sm'],
    ['small', '--font-size--xs'],
]);

function changeFontSize(sizeNew) {
    document.getElementById('font-boxes')
        .style.setProperty('--font-size', `var(${fontSizes.get(sizeNew)}`);
}

document.addEventListener('click', ({target}) => {
    if (!target) {
        return;
    }

    if ('eventChangeSize' in target.dataset) {
        changeFontSize(target.value);
    }
});