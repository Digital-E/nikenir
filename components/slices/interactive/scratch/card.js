import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

let ScratchCardVar = null;

let SCRATCH_TYPE_VAR = null;

if(typeof window !== 'undefined') {
    let {ScratchCard , SCRATCH_TYPE} = require('scratchcard-js')
    ScratchCardVar = ScratchCard
    SCRATCH_TYPE_VAR = SCRATCH_TYPE
}
// import {ScratchCard, SCRATCH_TYPE} from 'scratchcard-js'

const Container = styled(motion.div)`
    position: relative;
    height: 100%;
    width: calc(50% - calc(var(--margin) * 2 - 8px));
    padding-bottom: calc(50% - calc(var(--margin) * 2 - 8px));
    margin: 0 calc(var(--margin) / 2);
    border-radius: 27px;
    overflow: hidden;

    canvas {
        position: absolute;
        width: 100% !important;
        height: 100% !important;
    }
`


const InnerContainer = styled(motion.div)`
    position: absolute;
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
    z-index: 2;
    pointer-events: none;


    * {
        cursor: pointer;
    }
`

const Title = styled.h3`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    margin: 0;
    // padding: var(--padding);
    padding: 20px;
    text-transform: uppercase;
    text-align: center;
`

const Image = styled.div`
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;

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

    &.lock {
        height: 0;
    }
`

const ScratchContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 27px;
    overflow: hidden;
`

const BackgroundImage = styled.div`
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;

    img {
        width: 100%;
    }
`



let hasTriggered = false
let tsParticlesInstance = null


export default function Component({ data, index, allItems, hasClicked, hasInteracted, dataAll, prevScratch, prevScratchToggle }) {
    let scratchContainerRef = useRef();

    let percentRef = useRef(0)

    let allItemsRef = useRef(allItems);

    let prevScratchRef = useRef(prevScratch);

    const controls = useAnimationControls();

    let confettiActive = useRef(false);

    let scContainer = null;
    let sc = null;


    // useEffect(() => {
    //     allItemsRef.current = allItems

    //     let selectedIndex = null;

    //     allItems.forEach((item, index) => {
    //         if(item.clicked === true) {
    //             selectedIndex = index
    //         }
    //     })
        
    //     if(selectedIndex !== index && selectedIndex !== null) {
    //         // document.querySelector(`#scratch-container-${index}`).innerHTML = ''
    //         // percentRef.current = 0
    //     }
    // }, [allItems])

    useEffect(() => {
        prevScratchRef.current = prevScratch

        if(prevScratchRef.current !== index && prevScratchRef.current !== null) {
            initSc();

            let parent = document.querySelector(`#scratch-container-${index}`)

            setTimeout(() => {
                parent.removeChild(parent.children[0])
            }, 10)

        }
    }, [prevScratch])

    let initSc = () => {

        scContainer = null;
        sc = null;

        scContainer = document.getElementById(`scratch-container-${index}`)

        sc = new ScratchCardVar(`#scratch-container-${index}`, {
            scratchType: SCRATCH_TYPE_VAR.LINE,
            containerWidth: scContainer.offsetWidth,
            containerHeight: scContainer.offsetHeight,
            imageForwardSrc: data.img,
            // imageForwardSrc: 'https://masth0.github.io/ScratchCard/images/result.png',
            imageBackgroundSrc: '',
            // htmlBackground: '<p class="test"><strong>Hello i am HTML content !</strong></p>',
            clearZoneRadius: 20,
            percentToFinish: 100,
            // nPoints: 30,
            // pointSize: 4,
            nPoints: 0,
            pointSize: 0,
            callback: function () {
                // alert('Now the window will reload !')
                // window.location.reload()
             }
        })

        // Init
        sc.init().then(() => {
        sc.canvas.addEventListener('scratch.move', () => {
            let selectedIndex = null;

            allItemsRef.current.forEach((item, index) => {
                if(item.clicked === true) {
                    selectedIndex = index
                }
            })

            let percent = sc.getPercent().toFixed(2)
            percentRef.current = percent

            prevScratchToggle(index)

            if(percent > 20) {
                hasClicked(index); 

                controls.start({ scale: 1.1 })
                setTimeout(() => {
                    controls.start({ scale: 1 })
                }, 50)
            } else {
                hasClicked(null);
            }
        })
        }).catch((error) => {
        // image not loaded
        // alert(error.message);
        }); 
    }


    useEffect(() => {
        initSc();
    }, [])

    let triggerConfetti = (e) => {
        if(!confettiActive.ref) return

        let origin = {
            x: 0,
            y: 0
        }

        if(window.innerWidth < 990) {
            origin.x = e.touches[0].clientX / window.innerWidth
            origin.y = e.touches[0].clientY / window.innerHeight
        } else {
            origin.x = e.clientX / window.innerWidth
            origin.y = e.clientY / window.innerHeight
        }

        confetti({
            spread: 70,
            ticks: 100,
            gravity: 1,
            decay: 1,
            startVelocity: 1,
            count: 1,
            scalar: 1,
            origin: origin,
            shapes: ["square"],
            colors: [`${dataAll.colourOne}`]
        });  
    }

    let enableConfetti = (action) => {
        if(action) {
            confettiActive.ref = true
        } else {
            confettiActive.ref = false
        }
    }


    return (
        <Container 
            className='max-width'
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            onMouseMove={(e) => triggerConfetti(e)}
            onMouseDown={() => enableConfetti(true)}
            onMouseUp={() => enableConfetti(false)}
            onMouseLeave={() => enableConfetti(false)}
            onTouchMove={(e) => triggerConfetti(e)}
            onTouchStart={() => enableConfetti(true)}
            onTouchEnd={() => enableConfetti(false)}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            animate={controls}
            >
            <BackgroundImage>
                <img src={data.imgBack} />
            </BackgroundImage>
            <InnerContainer>
                <Title>{data.title}</Title>
            </InnerContainer>
            <ScratchContainer id={`scratch-container-${index}`} />
            {/* <Image>
                <img src={data.img} />
            </Image> */}
        </Container>
    )
}