tsParticles.load("particles-js", {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#26ecd1"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5
            },
            size: {
                value: 3
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                out_mode: "out"
            }
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                repulse: {
                    distance: 100
                },
                push: {
                    quantity: 4
                }
            }
        },
        background: {
            color: {
                value: "#1a4498" // couleur de fond du canvas si tu veux le contrôler
            }
        },
        fullScreen: {
            enable: false // important pour garder dans le div #particles-js
        }
    });