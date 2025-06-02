let formSubmitted = false; // État pour savoir si le formulaire a été envoyé

document.getElementById("toggleCitationForm").addEventListener("click", function() {
    if (formSubmitted) {
        // Si le formulaire a été soumis, on affiche une notification
        alert("Une citation a déjà été envoyée.");
        return; // On ne fait rien d'autre
    }

    const formContainer = document.getElementById("citationFormContainer");
    const couleurQuestion = document.getElementById("toggleCitationForm");

    // Toggle pour afficher/masquer le formulaire
    formContainer.style.display = (formContainer.style.display === 'none' || formContainer.style.display === '') ? 'block' : 'none';

    const currentColor = window.getComputedStyle(couleurQuestion).color;
    couleurQuestion.style.color = (currentColor === 'rgb(85, 85, 85)') ? 'black' : '#555'; // rgb(85, 85, 85) correspond à #555
});

// Fonction pour afficher la citation du jour
function afficherCitationDuJour() {
    const aujourdhui = new Date();
    const jourDuMois = aujourdhui.getDate(); // Récupère le jour du mois
    const citationDuJour = citations[jourDuMois - 1]; // On choisit la citation en fonction du jour (1-31)
    document.getElementById('citationdujour').textContent = citationDuJour; // Affiche la citation
}

// Afficher la notification après la soumission du formulaire
function afficherNotification() {
    const notification = document.getElementById('notification');
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

    fetch("https://formsubmit.co/luisilonald14@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Si l'envoi est réussi, afficher la notification de succès
            afficherNotification();
            event.target.reset();
            document.getElementById("citationFormContainer").style.display = "none";
            const couleurQuestion = document.getElementById("toggleCitationForm");
            couleurQuestion.style.color = 'green';

            // Marquer que le formulaire a été soumis
            formSubmitted = true;

        } else {
            alert("Erreur lors de l'envoi de la citation. Veuillez réessayer.");
        }
    })
    .catch(error => {
        console.error("Erreur:", error);
        alert("Une erreur est survenue.");
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