let triCroissant = true;

function filtrerProjets() {
	const type = document.getElementById('filtre-type').value;
	const categorie = document.getElementById('filtre-categorie').value;
	const langage = document.getElementById('filtre-langage').value;

	const projets = document.querySelectorAll('.projet-detail');
	let nbVisibles = 0;

	projets.forEach(projet => {
		const projetType = projet.dataset.type;
		const projetCategorie = projet.dataset.categorie;
		const projetLangages = projet.dataset.langages.split(',');

		const correspondType = !type || projetType === type;
		const correspondCategorie = !categorie || projetCategorie === categorie;
		const correspondLangage = !langage || projetLangages.includes(langage);

		if (correspondType && correspondCategorie && correspondLangage) {
			projet.style.display = 'block';
			nbVisibles++;
		} else {
			projet.style.display = 'none';
		}
	});

	// Affiche le message si aucun projet n'est visible
	const message = document.getElementById('message-vide');
	message.style.display = nbVisibles === 0 ? 'block' : 'none';
}

function trierParDate() {
	const boutonTri = document.getElementById('bouton-tri');
	const container = document.getElementById('liste-projets');

	// Ne trier que les projets visibles
	const projets = Array.from(container.querySelectorAll('.projet-detail'))
		.filter(projet => projet.style.display !== 'none');

	projets.sort((a, b) => {
		const dateA = parseDate(a.dataset.date);
		const dateB = parseDate(b.dataset.date);
		return triCroissant ? dateA - dateB : dateB - dateA;
	});

	// Réinjection dans l'ordre trié
	projets.forEach(projet => container.appendChild(projet));

	triCroissant = !triCroissant;
	boutonTri.textContent = triCroissant ? "Trier par date croissante ↑" : "Trier par date décroissante ↓" ;
}

function parseDate(dateStr) {
	// Format attendu : MM/YYYY
	const [mois, annee] = dateStr.split('/').map(Number);
	return new Date(annee, mois - 1); // Date JS : mois commence à 0
}