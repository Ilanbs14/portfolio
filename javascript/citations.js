let formulaireEnvoye = false;

document.getElementById("toggleCitationForm").addEventListener("click", function() {
		const formContainer = document.getElementById("citationFormContainer");
		const couleurQuestion = document.getElementById("toggleCitationForm");
		
        if (formulaireEnvoye) {
            afficherNotification();
        }
        else {
		    formContainer.style.display = (formContainer.style.display === 'none' || formContainer.style.display === '') ? 'block' : 'none';

            const currentColor = window.getComputedStyle(couleurQuestion).color; // Récupérer la couleur actuelle
            couleurQuestion.style.color = (currentColor === 'rgb(85, 85, 85)') ? 'black' : '#555'; // rgb(85, 85, 85) correspond à #555
        }
	});


    // Tableau des citations
    const citations = [
        "Les meilleures idées naissent souvent dans le chaos. – Steve Jobs",
        "Un programmeur qui se contente de coder ne sera jamais un bon développeur. – Martin Fowler",
        "L’information n’a de valeur que lorsqu’elle est comprise. – Albert Einstein",
        "Le développement est un voyage, pas une destination. – Unknown",
        "L’innovation est ce qui distingue un leader d’un suiveur. – Steve Jobs",
        "Le plus grand danger dans le développement logiciel, c’est de croire que tout est sous contrôle. – Unknown",
        "Il n’y a pas de problème que la technologie ne puisse résoudre, mais parfois elle en crée de nouveaux. – Unknown",
        "Le logiciel est un mélange de science et d’art. – Unknown",
        "Celui qui n’essaie jamais ne fera jamais d’erreur. Mais celui qui n'essaie jamais ne réussira jamais non plus. – Unknown",
        "Rien n'est aussi puissant qu'une idée dont le temps est venu. – Victor Hugo",
        "Les ordinateurs ne peuvent pas mentir. Mais les programmes peuvent, eux. – Unknown",
        "Tout le monde est un génie. Mais si vous jugez un poisson sur sa capacité à grimper à un arbre, il passera sa vie à croire qu’il est stupide. – Albert Einstein",
        "Un bon développeur ne résout pas simplement des problèmes, il en crée. – Unknown",
        "Le développement logiciel n’est pas une science, c’est une discipline. – Unknown",
        "L’information est la nouvelle monnaie, et nous devons savoir l’utiliser correctement. – Unknown",
        "Les erreurs sont les portes de la découverte. – James Joyce",
        "Le code est comme de l'humour. Quand il faut l'expliquer, c'est qu’il est mauvais. – Cory House",
        "L'informatique est trop importante pour la confier uniquement aux informaticiens. – Unknown",
        "L’intelligence artificielle est l'ultime artifice, mais l'humain reste l'ultime créateur. – Unknown",
        "Le code est poésie. – Unknown",
        "Un problème bien posé est à moitié résolu. – Charles Kettering",
        "Le plus grand ennemi de l’innovation n’est pas la technologie, c’est la peur de l’échec. – Unknown",
        "Programmer, c’est comme résoudre des puzzles. C’est une recherche incessante de solutions. – Unknown",
        "Un programme bien écrit est un poème que seule une machine peut lire. – Unknown",
        "Rien ne se perd, rien ne se crée, tout se transforme... même le code. – Antoine Lavoisier (adapté)",
        "Un bon code est comme un bon vin, il se bonifie avec le temps. – Unknown",
        "Si vous ne pouvez pas l'expliquer simplement, vous ne le comprenez pas assez bien. – Albert Einstein",
        "La programmation n’est pas juste un métier, c’est un mode de pensée. – Unknown",
        "L’erreur n’est pas de tomber, mais de rester à terre. – John Bunyan",
        "La technologie est un outil. Les idées qui l’accompagnent sont celles qui font la différence. – Unknown",
        "En développement, chaque ligne de code est une conversation entre le développeur et la machine. – Unknown"
    ];

    // Fonction pour afficher la citation du jour
    function afficherCitationDuJour() {
        const aujourdhui = new Date();
        const jourDuMois = aujourdhui.getDate(); // Récupère le jour du mois
        const citationDuJour = citations[jourDuMois - 1]; // On choisit la citation en fonction du jour (1-31)
        document.getElementById('citationdujour').textContent = citationDuJour; // Affiche la citation
    }
	
	// Afficher la notification après la soumission du formulaire
    function afficherNotification() {
        let notification;

        if (formulaireEnvoye) {
            notification = document.getElementById('notificationInterdit');
        }
        else {
            notification = document.getElementById('notificationAjout');
        }
        notification.style.display = 'block'; // Afficher la notification

        // Faire disparaître la notification après 5 secondes
        setTimeout(function() {
            notification.style.opacity = '0'; // Changer l'opacité pour un effet de disparition
        }, 5000); // Après 5 secondes

        // Cacher la notification après l'animation
        setTimeout(function() {
            notification.style.display = 'none'; // Cacher la notification complètement
            notification.style.opacity = '1'; // Réinitialiser l'opacité
        }, 6000); // Juste après l'animation
    }

    // Validation du formulaire avant soumission
    document.getElementById("citationForm").addEventListener("submit", function(event) {
        const nom = document.getElementById("nom").value;
        const citation = document.getElementById("citation").value;
        const regexNom = /^[A-Za-z]+$/;

        if (!regexNom.test(nom)) {
            alert("Le nom ne doit contenir que des lettres.");
            event.preventDefault();
            return;
        }

        if (citation.length < 8) {
            alert("La citation doit comporter au moins 8 caractères.");
            event.preventDefault();
            return;
        }
		
		event.preventDefault(); // Empêche la soumission par défaut

        // Récupérer les données du formulaire
        const formData = new FormData(event.target);

		fetch("https://formsubmit.co/ajax/luisilonald14@gmail.com", {
		    method: "POST",
		    body: formData,
		    headers: {
		        "Accept": "application/json"
		    }
		})
		.then(response => response.json())
		.then(data => {
		    console.log("Réponse FormSubmit:", data);
		    if (data.success === "true") {
		        afficherNotification();
		        event.target.reset();
		        document.getElementById("citationFormContainer").style.display = "none";
		        const couleurQuestion = document.getElementById("toggleCitationForm");
		        couleurQuestion.style.color = 'green';
		        formulaireEnvoye = true;
		    } else {
		        alert("Erreur lors de l'envoi : " + data.message);
		    }
		})
		.catch(error => {
		    console.error("Erreur:", error);
		    alert("Une erreur est survenue (fetch).");
		});
    });
	
	function mettreEnMajuscule(event) {
		// Convertir la saisie en majuscules
		this.value = this.value.toUpperCase();
	}
	
	function premiereLettreEnMajuscule(event) {
		let value = this.value;
		value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); 
		this.value = value;
	}
	
	function caracteresInterdits(event) {
		let value = this.value;
		
		const regex = /^[A-Za-z]+$/;

		// Si la saisie contient des caractères invalides, on les supprime
		if (!regex.test(this.value)) {
			event.preventDefault();
			this.value = this.value.replace(/[^A-Za-z]/g, ''); // Supprime les caractères non valides
		}
	}


	document.getElementById("prenom").addEventListener("input", premiereLettreEnMajuscule);
	document.getElementById("citation").addEventListener("input", premiereLettreEnMajuscule);
	
	document.getElementById("nom").addEventListener("input", mettreEnMajuscule);
	document.getElementById("auteur").addEventListener("input", mettreEnMajuscule);
	
	document.getElementById("prenom").addEventListener("input", caracteresInterdits);
	document.getElementById("nom").addEventListener("input", caracteresInterdits);
		

    // Appel de la fonction dès le chargement de la page
    window.onload = afficherCitationDuJour;


