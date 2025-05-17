document.addEventListener("DOMContentLoaded", () => {
  const descriptions = document.querySelectorAll(".texteComplet:not(.objectif)");

  descriptions.forEach(texte => {
    const contenuComplet = texte.innerHTML.trim();

    texte.setAttribute("data-complet", contenuComplet);
    texte.setAttribute("data-affiche", "non");

    texte.innerHTML = ""; // Masquer tout au début
  });

  const boutons = document.querySelectorAll(".voir-plus-btn");

  boutons.forEach(btn => {
    btn.addEventListener("click", () => {
      const projet = btn.closest(".projet-detail");
      const texte = projet.querySelector(".texteComplet");

      const estAffiche = texte.getAttribute("data-affiche") === "oui";

      if (!estAffiche) {
        texte.innerHTML = texte.getAttribute("data-complet");
        texte.classList.add("affiche");
        texte.setAttribute("data-affiche", "oui");
        btn.innerHTML = '<span class="fleche">▲</span> Cacher la description <span class="fleche">▲</span>';
      } else {
        texte.innerHTML = "";
        texte.classList.remove("affiche");
        texte.setAttribute("data-affiche", "non");
        btn.innerHTML = '<span class="fleche">▼</span>Afficher la description <span class="fleche">▼</span>';
      }
    });
  });
});
