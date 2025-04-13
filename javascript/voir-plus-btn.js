document.addEventListener("DOMContentLoaded", () => {
  const descriptions = document.querySelectorAll(".texteComplet");
  const limiteCaracteres = 250;

  descriptions.forEach(texte => {
    const contenuComplet = texte.innerHTML.trim(); // Utilisation de innerHTML pour garder les balises HTML

    if (contenuComplet.length > limiteCaracteres) {
      const contenuCourt = contenuComplet.slice(0, limiteCaracteres) + "...";

      texte.setAttribute("data-complet", contenuComplet);
      texte.setAttribute("data-court", contenuCourt);
      texte.setAttribute("data-affiche", "non");

      texte.innerHTML = contenuCourt; // Utilisation de innerHTML pour afficher un extrait
    }
  });

  const boutons = document.querySelectorAll(".voir-plus-btn");

  boutons.forEach(btn => {
    btn.addEventListener("click", () => {
      const projet = btn.closest(".projet-detail");
      const texte = projet.querySelector(".texteComplet");

      const affiche = texte.getAttribute("data-affiche") === "oui";

      if (!affiche) {
        texte.innerHTML = texte.getAttribute("data-complet"); // Restaure le contenu complet avec HTML
        texte.classList.add("affiche");
        texte.setAttribute("data-affiche", "oui");
        btn.innerHTML = 'Afficher moins <span class="fleche">▲</span>';
      } else {
        texte.innerHTML = texte.getAttribute("data-court"); // Restaure l'extrait avec HTML
        texte.classList.remove("affiche");
        texte.setAttribute("data-affiche", "non");
        btn.innerHTML = 'Afficher plus <span class="fleche">▼</span>';
      }
    });
  });
});
