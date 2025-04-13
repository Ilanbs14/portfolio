document.querySelectorAll('.texteAdapte').forEach(el => {
let fontSize = parseInt(window.getComputedStyle(el).fontSize);
const parentWidth = el.offsetWidth;

while (el.scrollWidth > parentWidth && fontSize > 8) {
  fontSize--;
  el.style.fontSize = fontSize + 'px';
}
});