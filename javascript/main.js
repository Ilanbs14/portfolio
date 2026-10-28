// ===== Menu mobile =====
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

function setMenu(open) {
	header.classList.toggle('menu-open', open);
	menuToggle.setAttribute('aria-expanded', open);
	menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}

menuToggle.addEventListener('click', () => {
	setMenu(!header.classList.contains('menu-open'));
});

// Ferme le menu après un clic sur un lien, sur Échap ou en cliquant ailleurs
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
	if (e.key === 'Escape') setMenu(false);
});
document.addEventListener('click', e => {
	if (!header.contains(e.target)) setMenu(false);
});

// Bordure de l'en-tête au défilement
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


// ===== Thème clair / sombre =====
const root = document.documentElement;

document.getElementById('theme-toggle').addEventListener('click', () => {
	const current = root.dataset.theme
		|| (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	const next = current === 'dark' ? 'light' : 'dark';
	root.dataset.theme = next;
	try { localStorage.setItem('theme', next); } catch (e) {}
});


// ===== Lien actif dans la navigation =====
const navLinks = [...nav.querySelectorAll('ul a')];
const sections = navLinks
	.map(link => document.querySelector(link.getAttribute('href')))
	.filter(Boolean);

const spy = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) return;
		navLinks.forEach(link => {
			link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
		});
	});
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => spy.observe(section));


// ===== Apparition au défilement =====
// Les enfants d'un groupe .stagger apparaissent les uns après les autres
document.querySelectorAll('.stagger').forEach(group => {
	[...group.children].forEach((child, i) => {
		child.classList.add('reveal');
		if (group.dataset.reveal && !child.dataset.reveal) child.dataset.reveal = group.dataset.reveal;
		child.style.setProperty('--delay', `${Math.min(i, 8) * 90}ms`);
	});
});

function reveal(el) {
	el.classList.add('visible');
	revealObserver.unobserve(el);
	// Retire le délai une fois apparu pour ne pas ralentir les effets de survol
	setTimeout(() => {
		el.style.removeProperty('--delay');
		el.classList.add('revealed');
	}, 1200);
}

const revealObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) reveal(entry.target);
	});
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Rattrape les éléments sautés lors d'un défilement rapide (ou d'un saut d'ancre)
let catchUpPending = false;
window.addEventListener('scroll', () => {
	if (catchUpPending) return;
	catchUpPending = true;
	requestAnimationFrame(() => {
		document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
			if (el.getBoundingClientRect().bottom < 0) reveal(el);
		});
		catchUpPending = false;
	});
}, { passive: true });


// ===== Barre de progression de lecture =====
const progress = document.getElementById('scroll-progress');

function updateProgress() {
	const max = document.documentElement.scrollHeight - window.innerHeight;
	progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();


// ===== Halo lumineux qui suit la souris sur les cartes =====
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
	document.querySelectorAll('.experience, .project, .skill-group, .interest, .timeline-item').forEach(card => {
		card.classList.add('spotlight');
		card.addEventListener('pointermove', e => {
			const rect = card.getBoundingClientRect();
			card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
			card.style.setProperty('--my', `${e.clientY - rect.top}px`);
		});
	});
}


// ===== Protection de la photo de profil =====
document.querySelectorAll('.protected').forEach(img => {
	img.addEventListener('contextmenu', e => e.preventDefault());
	img.addEventListener('dragstart', e => e.preventDefault());
});


// ===== Filtres des projets =====
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const filters = document.querySelectorAll('.filter');
const projets = document.querySelectorAll('.project');

filters.forEach(btn => {
	btn.addEventListener('click', () => {
		const filtre = btn.dataset.filter;

		filters.forEach(b => {
			b.classList.toggle('is-active', b === btn);
			b.setAttribute('aria-pressed', b === btn);
		});

		let i = 0;
		projets.forEach(projet => {
			projet.hidden = filtre !== 'tous' && projet.dataset.categorie !== filtre;
			projet.classList.add('visible');
			if (!projet.hidden && projet.animate && !reduceMotion) {
				projet.animate(
					[{ opacity: 0, transform: 'translateY(16px) scale(.98)' }, { opacity: 1, transform: 'none' }],
					{ duration: 450, delay: i++ * 70, easing: 'cubic-bezier(.2, .7, .2, 1)', fill: 'backwards' }
				);
			}
		});
	});
});


// ===== Détails du projet mis en avant (panneau pleine largeur) =====
document.querySelectorAll('.more-toggle').forEach(btn => {
	const panel = document.getElementById(btn.getAttribute('aria-controls'));
	btn.addEventListener('click', () => {
		const open = btn.getAttribute('aria-expanded') !== 'true';
		btn.setAttribute('aria-expanded', open);
		panel.hidden = !open;
		panel.classList.toggle('opening', open);
	});
});


// ===== Copie e-mail / téléphone =====
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
	toast.textContent = message;
	toast.classList.add('show');
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('[data-copy]').forEach(btn => {
	btn.addEventListener('click', async () => {
		try {
			await navigator.clipboard.writeText(btn.dataset.copy);
			showToast('Copié dans le presse-papiers !');
		} catch (e) {
			showToast(btn.dataset.copy);
		}
	});
});


// ===== Formulaire de contact (FormSubmit) =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function setStatus(message, type) {
	formStatus.textContent = message;
	formStatus.className = 'form-status' + (type ? ' ' + type : '');
}

contactForm.addEventListener('input', e => {
	e.target.closest('.field')?.classList.remove('invalid');
});

// Mise en forme de la saisie, comme pour l'ancien formulaire de citation
document.getElementById('nom').addEventListener('input', function () {
	this.value = this.value.toUpperCase();
});
document.getElementById('prenom').addEventListener('input', function () {
	this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
});

contactForm.addEventListener('submit', function (event) {
	event.preventDefault();

	// Validation : on signale chaque champ invalide
	const invalides = [...contactForm.querySelectorAll('[required]')].filter(champ => !champ.checkValidity());
	invalides.forEach(champ => champ.closest('.field').classList.add('invalid'));
	if (invalides.length) {
		setStatus('Merci de vérifier les champs en rouge.', 'error');
		invalides[0].focus();
		return;
	}

	const bouton = contactForm.querySelector('button[type="submit"]');
	bouton.disabled = true;
	setStatus('Envoi en cours…');

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
			event.target.reset();
			setStatus('Message envoyé, merci ! Je vous répondrai rapidement.', 'success');
			showToast('Message envoyé !');
		} else {
			setStatus("Erreur lors de l'envoi : " + data.message, 'error');
		}
	})
	.catch(error => {
		console.error("Erreur:", error);
		setStatus("Une erreur est survenue. Vous pouvez m'écrire directement par e-mail.", 'error');
	})
	.finally(() => {
		bouton.disabled = false;
	});
});


// ===== Citation du jour =====
const citations = [
	"Les meilleures idées naissent souvent dans le chaos. – Steve Jobs",
	"Un programmeur qui se contente de coder ne sera jamais un bon développeur. – Martin Fowler",
	"L’information n’a de valeur que lorsqu’elle est comprise. – Albert Einstein",
	"Le développement est un voyage, pas une destination.",
	"L’innovation est ce qui distingue un leader d’un suiveur. – Steve Jobs",
	"Le plus grand danger dans le développement logiciel, c’est de croire que tout est sous contrôle.",
	"Il n’y a pas de problème que la technologie ne puisse résoudre, mais parfois elle en crée de nouveaux.",
	"Le logiciel est un mélange de science et d’art.",
	"Celui qui n’essaie jamais ne fera jamais d’erreur. Mais celui qui n'essaie jamais ne réussira jamais non plus.",
	"Rien n'est aussi puissant qu'une idée dont le temps est venu. – Victor Hugo",
	"Les ordinateurs ne peuvent pas mentir. Mais les programmes peuvent, eux.",
	"Tout le monde est un génie. Mais si vous jugez un poisson sur sa capacité à grimper à un arbre, il passera sa vie à croire qu’il est stupide. – Albert Einstein",
	"Un bon développeur ne résout pas simplement des problèmes, il en crée.",
	"Le développement logiciel n’est pas une science, c’est une discipline.",
	"L’information est la nouvelle monnaie, et nous devons savoir l’utiliser correctement.",
	"Les erreurs sont les portes de la découverte. – James Joyce",
	"Le code est comme de l'humour. Quand il faut l'expliquer, c'est qu’il est mauvais. – Cory House",
	"L'informatique est trop importante pour la confier uniquement aux informaticiens.",
	"L’intelligence artificielle est l'ultime artifice, mais l'humain reste l'ultime créateur.",
	"Le code est poésie.",
	"Un problème bien posé est à moitié résolu. – Charles Kettering",
	"Le plus grand ennemi de l’innovation n’est pas la technologie, c’est la peur de l’échec.",
	"Programmer, c’est comme résoudre des puzzles. C’est une recherche incessante de solutions.",
	"Un programme bien écrit est un poème que seule une machine peut lire.",
	"Rien ne se perd, rien ne se crée, tout se transforme... même le code. – Antoine Lavoisier (adapté)",
	"Un bon code est comme un bon vin, il se bonifie avec le temps.",
	"Si vous ne pouvez pas l'expliquer simplement, vous ne le comprenez pas assez bien. – Albert Einstein",
	"La programmation n’est pas juste un métier, c’est un mode de pensée.",
	"L’erreur n’est pas de tomber, mais de rester à terre. – John Bunyan",
	"La technologie est un outil. Les idées qui l’accompagnent sont celles qui font la différence.",
	"En développement, chaque ligne de code est une conversation entre le développeur et la machine."
];

document.getElementById('citation-du-jour').textContent = citations[new Date().getDate() - 1];


// ===== Traînée de code derrière la souris (uniquement sur le fond, hors des éléments) =====
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
	const tokens = ['<div>', '</>', '<html>', '{ }', '=>', '</p>', 'const', '<a>', ';', '()', '<h1>', '[ ]', '&&', '</body>', '#', '<li>', '===', 'SELECT', '<css>', '//'];
	// Zones considérées comme « fond » : conteneurs de mise en page et espaces entre les cartes
	const fond = 'body, main, section, footer, .container, .hero-inner, .projects-grid, .skills-grid, .experiences, .about, .interests, .timeline, .stats, .footer-inner';
	let lastX = 0, lastY = 0, count = 0;

	document.addEventListener('pointermove', e => {
		if (!e.target.matches(fond)) return;
		if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 38) return;
		lastX = e.clientX;
		lastY = e.clientY;
		if (count > 24) return;

		const el = document.createElement('span');
		el.className = 'code-trail';
		el.textContent = tokens[Math.floor(Math.random() * tokens.length)];
		el.style.left = `${e.clientX}px`;
		el.style.top = `${e.clientY}px`;
		el.style.setProperty('--dx', `${(Math.random() - .5) * 60}px`);
		el.style.setProperty('--dy', `${-20 - Math.random() * 40}px`);
		el.style.setProperty('--rot', `${(Math.random() - .5) * 40}deg`);
		el.setAttribute('aria-hidden', 'true');
		document.body.appendChild(el);
		count++;
		el.addEventListener('animationend', () => { el.remove(); count--; });
	});
}
