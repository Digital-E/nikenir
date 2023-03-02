import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { gsap }  from  "gsap"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styled from 'styled-components'

import Button from '../button'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Container = styled.div`
    height: 200vh;
`;

const Slide = styled.div`
    position: relative;
    height: 100vh;
`;

const Logo = styled.div`
    width: fit-content;
    margin: 0 auto;
    padding: 40px 0;

    @media(max-width: 989px) {
        padding: 30px 0;
    }
`

const Center = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 720px;
`

const Title = styled.h1`
    text-align: center;
`

const Arrow = styled.div`
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%, -50%);
    max-width: 720px;
    text-align: center;
    cursor: pointer;
`

const Text = styled.p`
    text-align: center;
    font-size: 32px;
    margin-bottom: 30px;

    @media(max-width: 989px) {
        font-size: 25px;
    }
`

const ButtonWrapper = styled.div`
    max-width: 420px;
    margin: 0 auto;
`

let isSliding = false;

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const Component = () => {

    let containerRef = useRef();
    let slideOneRef = useRef();
    let arrowRef = useRef();
    let slideIndex = useRef(0);

    let triggerSlide = (direction) => {
        if(isSliding) return;

        if(direction === 'down') {
            slideIndex.current = 1
        } else {
            slideIndex.current = 0
        }

        gsap.to(containerRef.current, {duration: 2, ease: "power2.inOut", y: direction === 'down' ? '-100vh' : '0', onComplete: () => {isSliding = false}})

        isSliding = true;
    }

    useEffect(() => {
        gsap.fromTo(arrowRef.current,{y: 0}, { y: -5 , duration: 1, yoyo: true, ease: "power1.inOut", repeat: -1});

        slideOneRef.current.addEventListener("click", () => {
            triggerSlide("down");
        })

        containerRef.current.addEventListener("mousewheel", (e) => {
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
        <Container ref={containerRef} className='margin'> 
            <Slide ref={slideOneRef}>
                <Logo>
                    <img src='/images/logos/with purpose logo.svg' />
                </Logo>
                <Center>
                    <Title className='large-headline'>
                        WHAT KIND OF CHANGEMAKER ARE YOU?
                    </Title>
                </Center>
                <Arrow ref={arrowRef}>
                    <img src='/images/icons/ui-arrow-20.svg' />
                </Arrow> 
            </Slide>

            <Slide>
                <Center>
                    <Text className='palatino'>
                        A champion of your community?<br/>
                        A guardian of our planet?<br/>
                        A mentor to the many?<br/><br/>
                        The world is your answer!<br/><br/>
                        Your Move is a game that lets you plot a path to a fairer, greener and healthier future.
                    </Text>
                    <ButtonWrapper>
                        <Button>Let's Play!</Button>
                    </ButtonWrapper>
                </Center>
            </Slide> 

        </Container>
    )
}

export default Component

