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
`


let hasTriggered = false
let tsParticlesInstance = null

export default function Component({ data, index, allItems, hasClicked, hasInteracted, dataAll }) {
    let scratchContainerRef = useRef();

    const controls = useAnimationControls();


    // let gaugeIncrement = (e) => {
    //     let selectedIndex = null;

    //     allItems.forEach((item, index) => {
    //         if(item.clicked === true) {
    //             selectedIndex = index
    //         }
    //     })

    //     if(selectedIndex !== index && selectedIndex !== null) {
    //         setGauge(0)
    //         gaugeRef.current = 0
    //         hasClicked(e, null)
    //     }


    //     clearTimeout(gaugeTimeout.current)
    //     setGauge(gaugeRef.current + 10)
    //     gaugeRef.current = gaugeRef.current + 10

    //     if(gaugeRef.current === 100) {
    //         hasClicked(e, index); 
    //     }

    //     gaugeTimeout.current = setTimeout(() => {
    //         if(gaugeRef.current < 100) {
    //             setGauge(0)
    //             gaugeRef.current = 0
    //         }
    //     }, 500)
    // }

    // useEffect(() => {
    //     let selectedIndex = null;

    //     allItems.forEach((item, index) => {
    //         if(item.clicked === true) {
    //             selectedIndex = index
    //         }
    //     })

    // }, [allItems])

    // let clicked = (e) => {
    //     controls.start({ scale: 1.3 })
    //     setTimeout(() => {
    //         controls.start({ scale: 1.02 })
    //     }, 50)
    // }

    useEffect(() => {
        const scContainer = document.getElementById(`scratch-container-${index}`)

        const sc = new ScratchCardVar(`#scratch-container-${index}`, {
            scratchType: SCRATCH_TYPE_VAR.LINE,
            containerWidth: scContainer.offsetWidth,
            containerHeight: scContainer.offsetHeight,
            imageForwardSrc: '/images/drag/air-jordan-1-low-se-older-shoes-f9r9bX 1.png',
            // imageForwardSrc: 'https://masth0.github.io/ScratchCard/images/result.png',
            imageBackgroundSrc: '',
            // htmlBackground: '<p class="test"><strong>Hello i am HTML content !</strong></p>',
            clearZoneRadius: 20,
            percentToFinish: 100,
            // nPoints: 30,
            // pointSize: 4,
            callback: function () {
                // alert('Now the window will reload !')
                // window.location.reload()
             }
        })

        // Init
        sc.init().then(() => {
        sc.canvas.addEventListener('scratch.move', () => {
            let percent = sc.getPercent().toFixed(2)
            console.log(percent)
            if(percent > 95) {
                hasClicked(index); 
            }
        })
        }).catch((error) => {
        // image not loaded
        // alert(error.message);
        }); 
             
    }, [])


    return (
        <Container 
            className='max-width'
            // onClick={(e) => {clicked(e)}} 
            // onPointerDown={(e) => e.target.releasePointerCapture(e.pointerId)}
            // onPointerEnter={() => { toggleParticles(true) }}
            // onPointerLeave={() => { toggleParticles(false) }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            // whileHover={{scale: 1.02}}
            // animate={controls}
            >
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