import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { gsap }  from  "gsap"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styled from 'styled-components'

import Footer from '../footer'

import ButtonLink from '../button-link'

import Character from './character'

import characterOne from '../../public/images/avatars/landing/ivy.png'
import characterTwo from '../../public/images/avatars/landing/theo.png'
import characterThree from '../../public/images/avatars/landing/ines.png'

const anime = require('animejs').default

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
    width: 50px;
    transform: translateX(-50%);
    padding: 40px 0;

    img {
        width: 100%;
    }

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
    max-width: 820px;

    @media(max-width: 989px) {
        &.intro-center-one {
            max-width: 360px;
        }
    }
`

const Title = styled.h1`
    position: relative;
    text-align: center;
    opacity: 0;
      
    // &.ml15 .word {
    //     position: relative;
    //     display: inline-block;
    //     margin: 0 30px 0 0;
    //     opacity: 0;
    // }

    // @media(max-width: 989px) {
    //     &.ml15 .word {
    //         margin: 0 15px 0 0;
    //     }
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

const Arrow = styled.button`
    text-align: center;
    cursor: pointer;

    > img {
        cursor: pointer; 
    }
`

const TextWrapper = styled(motion.div)`
    text-align: center;
    max-width: 370px;
    margin: 0 auto;

    @media(max-width: 989px) {
        max-width: 275px;
    }
`

const TitleTwo = styled(motion.h2)`
    font-size: 50px;
    margin-bottom: 30px;
`

const Text = styled(motion.div)`
    text-align: center;
    font-size: 32px;

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
        width: fit-content;

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
            x: -25,
            y: -25,
            width: 400,
        },
        mobile: {
            x: -20,
            y: -20,
            width: 190,
        },
        src: characterOne
    },
    {
        desktop: {
            x: 43,
            y: -99,
            width: 380,
        },
        mobile: {
            x: 33,
            y: 75,
            width: 175,
        },
        src: characterTwo
    },
    {
        desktop: {
            x: 71.5,
            y: 9,
            width: 400,
        },
        mobile: {
            x: 60,
            y: -41,
            width: 175
        },
        src: characterThree
    }
]

let basePath = process.env.basePath

let bubbles = [
    `${basePath}/images/people-promoter/objects/People_Q1_02.png`,
    `${basePath}/images/people-promoter/objects/People_Q1.png`,
    `${basePath}/images/people-promoter/objects/People_Q2.png`,
    `${basePath}/images/people-promoter/objects/People_Q3_Object_01.png`,
    `${basePath}/images/people-promoter/objects/People_Q3_Object_02.png`,
    `${basePath}/images/people-promoter/objects/People_Q4.png`,
    `${basePath}/images/active-activist/objects/Play_Q1.png`,
    `${basePath}/images/active-activist/objects/Play_Q2_02.png`,
    `${basePath}/images/active-activist/objects/Play_Q2.png`,
    `${basePath}/images/active-activist/objects/Play_Q3.png`,
    `${basePath}/images/active-activist/objects/Play_Q3_01.png`,
    `${basePath}/images/active-activist/objects/Play_Q4.png`,
    `${basePath}/images/climate-champion/objects/Planet_Q1.png`,
    `${basePath}/images/climate-champion/objects/Planet_Q2_Object_01_02.png`,
    `${basePath}/images/climate-champion/objects/Planet_Q2_02.png`,
    `${basePath}/images/climate-champion/objects/Planet_Q3_Object_01.png`,
    `${basePath}/images/climate-champion/objects/Planet_Q3_Object_02.png`,
    `${basePath}/images/climate-champion/objects/Planet_Q4_02.png`,
    `${basePath}/images/climate-champion/objects/Planet_Q4.png`,
]

let bubblesDisplayArrayInit =  [
    {
        show: false,
        src: bubbles[0],
        index: 0,
        desktop: {
            x: 66,
            y: 0,
            flip: false
        },
        mobile: {
            x: 73,
            y: -10,
            flip: false
        },
    },
    {
        show: false,
        src: bubbles[1],
        index: 1,
        desktop: {
            x: 87,
            y: 10,
            flip: false
        },
        mobile: {
            x: 92,
            y: -5,
            flip: false
        }
    },
    {
        show: false,
        src: bubbles[2],
        index: 2,
        desktop: {
            x: 13,
            y: -5,
            flip: true
        },
        mobile: {
            x: -12,
            y: -23,
            flip: true
        }
    }
]


const Component = () => {

    let containerRef = useRef();
    let slideOneRef = useRef();
    let arrowRef = useRef();
    let slideIndex = useRef(0);
    let [slideIndexState, setSlideIndexState] = useState(0);

    let [screenHeight, setScreenHeight] = useState(0);

    let [bubblesDisplayArray, setBubblesDisplayArray] = useState(bubblesDisplayArrayInit)

    let bubblesDisplayArrayRef = useRef(bubblesDisplayArrayInit)

    let bubbleSwitchIndex = useRef(0);
    let objectIndex = useRef(-1);
    let timeoutOne = useRef(null);
    let timeoutTwo = useRef(null);
    let timeoutThree = useRef(null);

    let resize = () => {
        setScreenHeight(window.innerHeight)
    }

    let characterRevealTimeline = () => {
        anime.timeline()
        .add({
            targets: '.index-character',
            translateZ: 0,
            opacity: [0,1],
            easing: "easeInOutSine",
            duration: 800,
            delay: (el, i) => 200 * i,
            complete: function() {
                setTimeout(() => {
                    initTimeout();
                }, 1000)
            }
        }) 
    }

    useEffect(() => {
        document.querySelector('body').classList.add('lock-scroll')
        setScreenHeight(window.innerHeight)

        window.addEventListener('resize', resize)

        // Bubbles Animation

        timeoutOne.current = setTimeout(() => {
                anime.timeline()
                .add({
                    targets: '.large-headline',
                    opacity: [0,1],
                    easing: "easeInOutSine",
                    duration: 800,
                    complete: function() {
                        characterRevealTimeline();
                    }
                })
        }, 1000)
     

        // setTimeout(() => {
        //     anime.timeline({loop: false})
        //     .add({
        //         targets: '.ml15 .word',
        //         // scale: [14,1],
        //         // translateY: [2, 0],
        //         translateZ: 0,
        //         opacity: [0,1],
        //         easing: "easeInOutQuart",
        //         duration: 700,
        //         delay: (el, i) => 10 * i,
        //         complete: function(anim) {
        //             characterRevealTimeline()
        //         }
        //     }) 
        // }, 1000) 
        

        return () => {
            document.querySelector('body').classList.remove('lock-scroll')
            window.removeEventListener('resize', resize)

            // Reinit Bubbles

            bubbleSwitchIndex.current = 0;
            objectIndex.current = -1;

            setBubblesDisplayArray(JSON.parse(JSON.stringify(bubblesDisplayArrayInit)))
            bubblesDisplayArrayRef.current = JSON.parse(JSON.stringify(bubblesDisplayArrayInit))
            clearTimeout(timeoutOne.current)
            clearTimeout(timeoutTwo.current)
            clearTimeout(timeoutThree.current)
        }
    }, [])

    let initTimeout = () => {

            let bubblesDisplayArrayCopy = JSON.parse(JSON.stringify(bubblesDisplayArrayRef.current))

            if(objectIndex.current === bubbles.length - 1) {
                objectIndex.current = -1
            }

            objectIndex.current += 1

            if(objectIndex.current < bubbles.length - 1) {
                bubblesDisplayArrayCopy[bubbleSwitchIndex.current].src = bubbles[objectIndex.current]
            } 
            else {
                bubblesDisplayArrayCopy[bubbleSwitchIndex.current].src = bubbles[objectIndex.current]
            }
            

            bubblesDisplayArrayCopy[bubbleSwitchIndex.current].show = true

            setBubblesDisplayArray(bubblesDisplayArrayCopy)
            bubblesDisplayArrayRef.current = bubblesDisplayArrayCopy


            timeoutTwo.current = setTimeout(() => {
                let bubblesDisplayArrayCopyTwo = JSON.parse(JSON.stringify(bubblesDisplayArrayRef.current))

                bubblesDisplayArrayCopyTwo[bubbleSwitchIndex.current].show = false

                setBubblesDisplayArray(bubblesDisplayArrayCopyTwo)
                bubblesDisplayArrayRef.current = bubblesDisplayArrayCopyTwo

                if(bubbleSwitchIndex.current < bubblesDisplayArrayInit.length - 1) {
                    bubbleSwitchIndex.current += 1
                } else {
                    bubbleSwitchIndex.current = 0
                }

                timeoutThree.current = setTimeout(() => {
                    initTimeout();
                }, 3000)
    
            }, 5000)
   
    }


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
        gsap.fromTo(arrowRef.current,{x: '-50%', y: 0}, {x: '-50%', y: -5 , duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});

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
            <img src={`${process.env.basePath}/images/logos/nike logo.svg`} />
        </Logo>            
        <Container ref={containerRef} className='margin'>         
            <Slide ref={slideOneRef} initial='show' animate={slideIndexState === 0 ? 'show' : 'hide'} height={screenHeight}>
                <Center 
                variants={slideOneAnimation} 
                className='intro-center-one'>
                    <Title className='large-headline ml15'>
                        ARE YOU GAME FOR CHANGE?
                    </Title>
                    {
                        characters.map((item, index) => <Character data={item} index={index} bubbles={bubbles} bubblesDisplayArray={bubblesDisplayArray} />)
                    }
                </Center>
                <ArrowContainer variants={slideOneAnimation}>
                    <Arrow onClick={() => triggerSlide("down")} ref={arrowRef} aria-label='press the arrow button to move forward'>
                        <img src={`${process.env.basePath}/images/icons/ui-arrow-20.svg`} />
                    </Arrow>
                </ArrowContainer> 
            </Slide>
            <Slide initial='hide' variants={slideTwoAnimationParent} animate={slideIndexState === 1 ? 'show' : 'hide'} height={screenHeight}>
                <Center>
                    <TextWrapper>
                        <TitleTwo>YOUR MOVE</TitleTwo>
                        <Text className='palatino-medium'>
                            Plot a path to a fairer, greener, and healthier future.
                        </Text>
                    </TextWrapper>
                    <ButtonWrapper>
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

