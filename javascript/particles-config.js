tsParticles.load("particles-js", {
        fullScreen: {
            enable: false
        },
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5
            },
            size: {
                value: 2
            },
            move: {
                enable: true,
                speed: 0.6,
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
                    distance: 80
                },
                push: {
                    quantity: 4
                }
            }
        },
        detectRetina: true
    });