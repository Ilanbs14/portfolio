    tsParticles.load("particles-js", {
      fullScreen: { enable: false },
      detectRetina: true,
      particles: {
        number: {
          value: 400,
          density: { enable: true, value_area: 800 }
        },
        color: { value: ["#171515", "#cef1ff", "#1d2c32"] },
        shape: { type: "circle", stroke: { width: 1, color: "#FFFFFF" } },
        opacity: { value: 0.5 },
        size: {
          value: { min: 2, max: 8 },
          random: { enable: true }
        },
        move: {
          enable: true,
          speed: { min: 0.5, max: 2 },
          direction: "none",  // direction libre pour un vecteur manuel
          out_mode: "out"
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 60 },
          push: { quantity: 5 }
        }
      },
      // Voici le callback qui fixe la direction au moment de création
      i: {
        onParticleCreated: (particle) => {
          const angle = Math.random() < 0.5
            ? 0 // 0° = vers la droite
            : Math.PI / 4; // 45° = bas-droite

          const speed = particle.move.speed;
          particle.velocity.horizontal = Math.cos(angle) * speed;
          particle.velocity.vertical = Math.sin(angle) * speed;
        }
      }
    });