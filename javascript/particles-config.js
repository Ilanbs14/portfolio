const customDirectionPlugin = {
    id: "custom-direction",
    async init(container) {
        container.particles.addUpdater("custom-direction", {
            init(particle) {
                // Choisit une direction aléatoire à l'initialisation de chaque particule
                particle.moveDirection = Math.random() < 0.5 ? "right" : "bottom-right";
            },
            isEnabled() {
                return true;
            },
            update() {}
        });
    }
};

tsParticles.addPlugin(customDirectionPlugin);


tsParticles.load("particles-js", {
        fullScreen: {
            enable: false
        },
        particles: {
            number: {
                value: 400,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#171515", "#cef1ff", "#1d2c32"]
            },
            shape: {
                type: "circle",
                stroke: {
                    width : 1,
                    color : "#FFFFFF"
                }
            },
            opacity: {
                value: 0.5
            },
            size: {
                value: { min: 2, max: 8 }, // tailles variées
                random: {
                    enable: true
                }
            },
            move: {
                enable: true,
                speed: { min : 0.5, max : 2},
                direction: "none",
                out_mode: "out"
            }
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                grab: {
                    distance: 60
                },
                push: {
                    quantity: 5
                }
            }
        },
        detectRetina: true
    });