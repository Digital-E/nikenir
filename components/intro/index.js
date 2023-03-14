import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { gsap }  from  "gsap"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styled from 'styled-components'

import Footer from '../footer'

import ButtonLink from '../button-link'

import Character from './character'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Container = styled.div`
    @media(min-width: 990px) {
        margin: 0;
    }
`;

const Slide = styled(motion.div)`
    position: relative;
    height: ${props => props.height}px;
`;

const Logo = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 40px 0;

    @media(max-width: 989px) {
        padding: 30px 0;
    }
`

const Center = styled(motion.div)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 720px;

    @media(max-width: 989px) {
        &.intro-center-one {
            max-width: 360px;
        }
    }
`

const Title = styled.h1`
    text-align: center;

    // @media(min-width: 990px) {
    //     font-size: 8.328vw;
    // }
`

const ArrowContainer = styled(motion.div)`
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%, -50%);

    @media(max-width: 989px) {
        bottom: 0;
    }
`

const Arrow = styled.div`
    text-align: center;
    cursor: pointer;
`

const Text = styled(motion.div)`
    text-align: center;
    font-size: 32px;
    margin-bottom: 30px;

    @media(max-width: 989px) {
        font-size: 25px;
    }
`

const ButtonWrapper = styled(motion.div)`
    width: 100%;
    max-width: 420px;
    margin: 30px auto;

    button {
        box-shadow: none;
    }
`

const FooterWrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;

    > footer {
        padding: 20px 40px;
    }

    @media(max-width: 989px) {
        > footer {
            padding: 20px 0;
        } 
    }
`


let isSliding = false;

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;


let slideOneAnimation = {
    'show': {
        opacity: 1,
        x: '-50%',
        y: '-50%',
    },
    'hide': {
        opacity: 0,
        x: '-50%',
        y: '-200%',
        transition: {
            opacity: {
                duration: 0.5
            },
            y: {
                duration: 0.5 
            }
        }
    }
}

let slideOneAnimationBis = {
    'show': {
        opacity: 1,
        x: '-50%',
        y: '0%',
    },
    'hide': {
        opacity: 0,
        x: '-50%',
        y: '-200%',
        transition: {
            opacity: {
                duration: 1
            },
            y: {
                duration: 1.3
            }
        }
    }
}

let slideTwoAnimationParent = {
    'show': {
        transition: {
            delayChildren: 0,
            staggerChildren: 0.5
        }
    },
    'hide': {
    }
}

let slideTwoAnimation = {
    'show': {
        opacity: 1,
        // x: '-50%',
        // y: '-50%',
        transition: {
            duration: 1,
        }
    },
    'hide': {
        opacity: 0,
        // x: '-50%',
        // y: '-50%',
        transition: {
            opacity: {
                duration: 1
            },
            y: {
                duration: 1
            }
        }
    }
}

let characters = [
    {
        desktop: {
            x: -8,
            y: 20,
            width: 100,
        },
        mobile: {
            x: -5,
            y: 50,
            width: 100,
        },
        src: '/images/intro-characters/1.png'
    },
    {
        desktop: {
            x: 90,
            y: -10,
            width: 200,
        },
        mobile: {
            x: 60,
            y: -70,
            width: 150,
        },
        src: '/images/intro-characters/2.png'
    },
    {
        desktop: {
            x: 50,
            y: 80,
            width: 300,
        },
        mobile: {
            x: 30,
            y: 80,
            width: 250
        },
        src: '/images/intro-characters/3.png'
    }
]

let bubbles = [
    '/images/bubbles/1.png',
    '/images/bubbles/2.png',
    '/images/bubbles/3.png'
]

let bubblesDisplayArrayInit =  [
    {
        show: false,
        src: bubbles[0],
        index: 0,
        desktop: {
            x: 100,
            y: -20,
            flip: false
        },
        mobile: {
            x: 90,
            y: 0,
            flip: false
        },
    },
    {
        show: false,
        src: bubbles[1],
        index: 1,
        desktop: {
            x: -10,
            y: -30,
            flip: true
        },
        mobile: {
            x: -15,
            y: -20,
            flip: true
        }
    },
    {
        show: false,
        src: bubbles[2],
        index: 2,
        desktop: {
            x: 30,
            y: -20,
            flip: true
        },
        mobile: {
            x: 35,
            y: -5,
            flip: true
        }
    }
]

let bubbleSwitchIndex = 0;


const Component = () => {

    let containerRef = useRef();
    let slideOneRef = useRef();
    let arrowRef = useRef();
    let slideIndex = useRef(0);
    let [slideIndexState, setSlideIndexState] = useState(0);

    let [screenHeight, setScreenHeight] = useState(0);

    let [bubblesDisplayArray, setBubblesDisplayArray] = useState(bubblesDisplayArrayInit)

    let bubblesDisplayArrayRef = useRef(bubblesDisplayArrayInit)

    useEffect(() => {
        document.querySelector('body').classList.add('lock-scroll')
        setScreenHeight(window.innerHeight)

        return () => {
            document.querySelector('body').classList.remove('lock-scroll')
        }
    }, [])

    let initInterval = () => {

        setInterval(() => {
            let bubblesDisplayArrayCopy = bubblesDisplayArrayRef.current

            bubblesDisplayArrayCopy[bubbleSwitchIndex].show = false

            setBubblesDisplayArray(JSON.parse(JSON.stringify(bubblesDisplayArrayCopy)))


            setTimeout(() => {
                let bubblesDisplayArrayCopyTwo = bubblesDisplayArrayRef.current

                if(bubblesDisplayArrayCopyTwo[bubbleSwitchIndex].index < bubbles.length - 1) {
                    bubblesDisplayArrayCopyTwo[bubbleSwitchIndex].index += 1;
                    bubblesDisplayArrayCopyTwo[bubbleSwitchIndex].src = bubbles[bubblesDisplayArrayCopyTwo[bubbleSwitchIndex].index]
                } 
                else {
                    bubblesDisplayArrayCopyTwo[bubbleSwitchIndex].index = 0;
                    bubblesDisplayArrayCopyTwo[bubbleSwitchIndex].src = bubbles[0]
                }

    
                bubblesDisplayArrayCopyTwo[bubbleSwitchIndex].show = true
    
                setBubblesDisplayArray(JSON.parse(JSON.stringify(bubblesDisplayArrayCopyTwo)))

                if(bubbleSwitchIndex < bubblesDisplayArrayInit.length - 1) {
                    bubbleSwitchIndex += 1
                } else {
                    bubbleSwitchIndex = 0
                }
    
            }, 300)


        }, 3000)    
            
    }

    let initBubble = (index) => {
        let bubblesDisplayArrayCopy = bubblesDisplayArrayRef.current

        bubblesDisplayArrayCopy[index].show = true

        setBubblesDisplayArray(JSON.parse(JSON.stringify(bubblesDisplayArrayCopy)))
    }

    useEffect(() => {
        // Bubbles Animation
        let intervalIncrement = 0;


        let init = setInterval(() => {
            initBubble(intervalIncrement);
            intervalIncrement += 1;

            if(intervalIncrement > 2) {
                clearInterval(init)
                initInterval();
            }
        }, 1000)

    }, [])


    let triggerSlide = (direction) => {
        if(isSliding) return;

        if(direction === 'down') {
            slideIndex.current = 1
            setSlideIndexState(1)
        } else {
            slideIndex.current = 0
            setSlideIndexState(0)
        }

        gsap.to(containerRef.current, {duration: 1, ease: "power2.inOut", y: direction === 'down' ? -window.innerHeight : '0', onComplete: () => {isSliding = false}})

        isSliding = true;
    }

    useEffect(() => {
        gsap.fromTo(arrowRef.current,{y: 0}, { y: -5 , duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});

        slideOneRef.current.addEventListener("click", () => {
            triggerSlide("down");
        })

        containerRef.current.addEventListener("wheel", (e) => {
            if(e.deltaY > 0 && slideIndex.current !== 1) {
                triggerSlide('down');
            } else if (e.deltaY < 0 && slideIndex.current !== 0) {
                triggerSlide('up');
            }
        })

        containerRef.current.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        containerRef.current.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture();
        }, false); 

        function handleGesture() {
            // if (touchendX < touchstartX) {
            //     console.log('Swiped left');
            // }
            
            // if (touchendX > touchstartX) {
            //     console.log('Swiped right');
            // }
            
            if (touchendY < touchstartY && slideIndex.current !== 1) {
                // console.log('Swiped up');
                triggerSlide('down');
            }
            
            if (touchendY > touchstartY && slideIndex.current !== 0) {
            //    console.log('Swiped down');
                triggerSlide('up');
            }
            
            // if (touchendY === touchstartY) {
            //    console.log('Tap');
            // }
        }

        // let tl = gsap.timeline({
        //     // yes, we can add it to an entire timeline!
        //     scrollTrigger: {
        //         // trigger: ".carousel-container",
        //         scroller: gallery.current,
        //         // pin: true,   // pin the trigger element while active
        //         // start: "top top", // when the top of the trigger hits the top of the viewport
        //         // end: "+=500", // end after scrolling 500px beyond the start
        //         start: 0,
        //         end: window.innerHeight / 2,
        //         scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        //     }
        // });

        // tl.fromTo(".hero-scroll-button-wrapper", { y:0 }, { y:100 })

    },[]);

    return (
        <>    
        <Logo 
        // variants={slideOneAnimationBis}
        >
            <img src='/images/logos/with purpose logo.svg' />
        </Logo>            
        <Container ref={containerRef} className='margin'>         
            <Slide ref={slideOneRef} initial='show' animate={slideIndexState === 0 ? 'show' : 'hide'} height={screenHeight}>
                <Center 
                variants={slideOneAnimation} 
                className='intro-center-one'>
                    <Title className='large-headline'>
                        WHAT KIND OF CHANGEMAKER ARE YOU?
                    </Title>
                    {
                        characters.map((item, index) => <Character data={item} index={index} bubbles={bubbles} bubblesDisplayArray={bubblesDisplayArray} />)
                    }
                </Center>
                <ArrowContainer variants={slideOneAnimation}>
                    <Arrow ref={arrowRef}>
                        <img src='/images/icons/ui-arrow-20.svg' />
                    </Arrow>
                </ArrowContainer> 
            </Slide>
            <Slide initial='hide' variants={slideTwoAnimationParent} animate={slideIndexState === 1 ? 'show' : 'hide'} height={screenHeight}>
                <Center>
                    <Text className='palatino-medium' variants={slideTwoAnimation}>
                        A champion of your community?<br/>
                        A guardian of our planet?<br/>
                        A mentor to the many?<br/><br/>
                        The world is your answer!<br/><br/>
                        Your Move is a game that lets you plot a path to a fairer, greener and healthier future.
                    </Text>
                    <ButtonWrapper variants={slideTwoAnimation}>
                        <ButtonLink href='/pick-your-player'>Let's Play!</ButtonLink>
                    </ButtonWrapper>
                </Center>
                <FooterWrapper>
                    <Footer />
                </FooterWrapper>
            </Slide> 
        </Container>
        </>
    )
}

export default Component

