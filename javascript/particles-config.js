// particles-config.js
tsParticles.load("particles-js", {
  particles: {
    number: {
      value: 100,  // Nombre de particules
      density: {
        enable: true,
        value_area: 800  // Zone d'affichage des particules
      }
    },
    shape: {
      type: "circle",  // Forme des particules
    },
    opacity: {
      value: 0.5,  // Opacité des particules
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1
      }
    },
    size: {
      value: 3,  // Taille des particules
      random: true,
      animation: {
        enable: true,
        speed: 4,
        minimumValue: 0.1
      }
    },
    links: {
      enable: true,
      distance: 150,
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out"
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"  // Effet de répulsion des particules au survol
      },
      onclick: {
        enable: true,
        mode: "push"  // Effet de "push" au clic
      }
    }
  }
});
