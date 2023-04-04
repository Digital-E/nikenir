import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

const Container = styled(motion.button)`
    position: relative;
    height: 100%;
    width: calc(50% - calc(var(--margin) * 2 - 8px));
    padding-bottom: calc(50% - calc(var(--margin) * 2 - 8px));
    margin: 0 calc(var(--margin) / 2);
    z-index: 0;
    cursor: pointer;
    border-radius: 27px;

    * {
        cursor: pointer; 
    }
`


const InnerContainer = styled(motion.div)`
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px dashed #1A1A1A;
    border-radius: 27px;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;

    * {
        cursor: pointer;
    }
`

const Title = styled.h3`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    margin: 0;
    padding: var(--padding);
    text-transform: uppercase;
    text-align: center;
`

const Image = styled.div`
    position: absolute;
    bottom: -90px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;

    img {
        width: 100%;
    }
`

const Background = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${props => props.gauge}%;
    width: 100%;
    background: ${props => props.colour};
    transition: 0.2s;
    z-index: -1;
    border-radius: 0 0 27px 27px;

    &.lock {
        height: 0;
    }
`

let hasTriggered = false

export default function Component({ data, index, allItems, hasClicked, dataAll }) {
    let [gauge, setGauge] = useState(0);
    let gaugeRef = useRef(0);
    let gaugeTimeout = useRef(null);

    const controls = useAnimationControls();


    useEffect(() => {
        if(window.tsParticles === undefined) return
        if(hasTriggered) return
        hasTriggered = true

        tsParticles.load({
            fpsLimit: 60,
            interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "emitter"
                  }
                },
                modes: {
                  emitters: {
                    name: "confetti",
                    direction: "none",
                    life: {
                      count: 1,
                      duration: 0.1,
                      delay: 0.6
                    },
                    rate: {
                      delay: 0.1,
                      quantity: 1
                    },
                    size: {
                      width: 0,
                      height: 0
                    },
                    // Large Spread Zone
                    // size: {
                    //   width: 50,
                    //   height: 50
                    // }
                  }
                }
              },
                // emitters: {
                //     name: "confetti",
                //     direction: "none",
                //     // position: { x: e.clientX / window.innerWidth * 100, y: e.clientY / window.innerHeight * 100 },
                //     // spawnColor: {
                //     //   value: "#ff0000",
                //     //   animation: {
                //     //     h: {
                //     //       enable: true,
                //     //       offset: {
                //     //         min: -1.4,
                //     //         max: 1.4
                //     //       },
                //     //       speed: 0.1,
                //     //       sync: false
                //     //     },
                //     //     l: {
                //     //       enable: true,
                //     //       offset: {
                //     //         min: 20,
                //     //         max: 80
                //     //       },
                //     //       speed: 0,
                //     //       sync: false
                //     //     }
                //     //   }
                //     // },
                //     life: {
                //     count: 1,
                //     duration: 0.1,
                //     delay: 0.6
                //     },
                //     rate: {
                //     delay: 0.1,
                //     quantity: 1
                //     },
                //     size: {
                //     width: 0,
                //     height: 0
                //     },
                // },
            particles: {
                number: {
                value: 0
                },
                color: {
                value: "#f00"
                },
                // shape: {
                //   type: ["circle", "square", "polygon"],
                //   options: {
                //     polygon: {
                //       sides: 6
                //     }
                //   }
                // },
                shape: {
                    type: ["image"],
                    options: {
                        image: [
                            {
                                src: data.img,
                                width: 32,
                                height: 32,
                            }
                        ]
                    }
                },    
                opacity: {
                value: { min: 1, max: 1 },
                animation: {
                    enable: false,
                    speed: 1,
                    startValue: "max",
                    destroy: "min"
                }
                },
                size: {
                //   value: { min: 15, max: 32 }
                value: { min: 100, max: 100 }
                },
                life: {
                duration: {
                    sync: true,
                    value: 3
                },
                count: 1
                },
                move: {
                enable: true,
                gravity: {
                    enable: false
                },
                drift: {
                    min: -2,
                    max: 2
                },
                speed: { min: 10, max: 30 },
                decay: 0.03,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                    default: "destroy",
                    top: "none"
                }
                },
                rotate: {
                value: {
                    min: 0,
                    max: 360
                },
                direction: "random",
                move: true,
                animation: {
                    enable: false,
                    speed: 60
                }
                },
                tilt: {
                direction: "random",
                enable: false,
                move: true,
                value: {
                    min: 0,
                    max: 360
                },
                animation: {
                    enable: true,
                    speed: 60
                }
                },
                roll: {
                darken: {
                    enable: true,
                    value: 25
                },
                enable: false,
                speed: {
                    min: 15,
                    max: 25
                }
                },
                wobble: {
                distance: 30,
                enable: false,
                move: true,
                speed: {
                    min: -15,
                    max: 15
                }
                }
            },
            detectRetina: true
            });

            setTimeout(() => {
                tsParticles.domItem(0).options.interactivity.events.onClick.enable = false
                tsParticles.domItem(0).updateActualOptions()
            }, 100)

    }, [])

    let gaugeIncrement = (e) => {
        let selectedIndex = null;

        allItems.forEach((item, index) => {
            if(item.clicked === true) {
                selectedIndex = index
            }
        })

        if(selectedIndex !== index && selectedIndex !== null) {
            setGauge(0)
            gaugeRef.current = 0
            hasClicked(e, null)
        }


        clearTimeout(gaugeTimeout.current)
        setGauge(gaugeRef.current + 10)
        gaugeRef.current = gaugeRef.current + 10

        if(gaugeRef.current === 100) {
            hasClicked(e, index); 
        }

        gaugeTimeout.current = setTimeout(() => {
            if(gaugeRef.current < 100) {
                setGauge(0)
                gaugeRef.current = 0
            }
        }, 500)
    }

    useEffect(() => {
        let selectedIndex = null;

        allItems.forEach((item, index) => {
            if(item.clicked === true) {
                selectedIndex = index
            }
        })
        
        if(selectedIndex !== index) {
            setGauge(0)
            gaugeRef.current = 0
        }
    }, [allItems])

    let clicked = (e) => {

        gaugeIncrement(e)

        controls.start({ scale: 1.3 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
        }, 50)
    }

    let toggleParticles = (state) => {

        if(state) {
            tsParticles.domItem(0).options.interactivity.events.onClick.enable = true
            tsParticles.domItem(0).options.particles.shape.options.image[0].src = data.img
            tsParticles.domItem(0).updateActualOptions()
        } else {
            tsParticles.domItem(0).options.interactivity.events.onClick.enable = false
            tsParticles.domItem(0).updateActualOptions()
        }
    }

    return (
        <Container 
            aria-label='select a box'
            className='max-width'
            onClick={(e) => {clicked(e)}} 
            onPointerDown={(e) => e.target.releasePointerCapture(e.pointerId)}
            onPointerEnter={() => { toggleParticles(true) }}
            onPointerLeave={() => { toggleParticles(false) }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{scale: 1.02}}
            animate={controls}
            >
            <InnerContainer>
                <Title>{data.title}</Title>
                <Background gauge={gauge} colour={dataAll.colourOne} />
            </InnerContainer>
            <Image>
                <img src={data.img} />
            </Image>
        </Container>
    )
}