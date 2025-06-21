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
                speed: { min : 0.5, max : 1.5},
                direction: ["right", "bottom-right"],
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
        background: {
            color: "#1a4498"
        },
        detectRetina: true
    });