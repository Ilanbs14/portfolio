const image = document.getElementById('imageProtegee');

// Empêche le clic droit
image.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Empêche le drag & drop
image.addEventListener('dragstart', function(e) {
    e.preventDefault();
});