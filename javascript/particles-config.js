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
                value: ["#26ecd1", "#ff6b6b", "#feca57"]
            },
            shape: {
                type: "circle"
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
                speed: 0.7,
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
                    distance: 30
                },
                push: {
                    quantity: 4
                }
            }
        },
        background: {
            color: "#1a4498"
        },
        detectRetina: true
    });