function showToast(message = "Copié !") {
    const toast = document.getElementById('copy-toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}

document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
        const text = el.textContent.trim();

        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        showToast(); // Affiche le toast
    });
});