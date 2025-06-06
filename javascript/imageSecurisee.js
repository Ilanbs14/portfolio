document.querySelectorAll('.imageProtegee').forEach(function(img) {
img.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Bloque clic droit
});
img.addEventListener('dragstart', function(e) {
    e.preventDefault(); // Bloque le drag
});
});