document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
        const text = el.textContent.trim();

        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Optionnel : feedback visuel
        console.log(`Copié : ${text}`);
    });
});