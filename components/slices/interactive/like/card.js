import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

const Image = styled.div`
    position: absolute;
    left: 15px;
    bottom: 15px;
    width: 30px;
    height: 30px;

    img {
        position: absolute;
        width: 100%;
    }

    img:nth-child(2) {
        opacity: 0;
        transform: scale(0);
        transition: transform 0.5s, opacity 0.3s;
    }
`

const Container = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 170px;
    margin: 0 15px;
    border: 1px dashed #1A1A1A;
    border-radius: 27px;
    cursor: pointer;
    overflow: hidden;

    * {
        cursor: pointer;
    }

    &.liked ${Image} {
        img:nth-child(2) {
            opacity: 1;
            transform: scale(1.5);
        }
    }
`

const Title = styled.h3`
    text-transform: uppercase;
    text-align: center;
    padding: 30px;
`



const Background = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${props => props.gauge}%;
    width: 100%;
    background: white;
    transition: 0.2s;
    z-index: -1;

    &.lock {
        height: 0;
    }
`

export default function Component({ data, index, allItems, hasClicked, hasInteracted }) {
    let lock = useRef(false);
    let [gauge, setGauge] = useState(0);
    let gaugeTimeout = useRef(null);

    const controls = useAnimationControls();

    let gaugeIncrement = (e) => {
        clearTimeout(gaugeTimeout.current)
        setGauge(gauge + 10)

        if(gauge === 100) {
            hasClicked(e, index); 
        }

        gaugeTimeout.current = setTimeout(() => {
            if(gauge < 100) {
                setGauge(0)
            }
        }, 500)
    }

    useEffect(() => {
        if(!hasInteracted) {
            setGauge(0)
            lock.current = false
        } else {
            lock.current = true
        }
    }, [hasInteracted])

    let clicked = (e) => {
        if(lock.current) return
        // gaugeIncrement(e)
        controls.start({ scale: 2 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
            hasClicked(e, index);
        }, 50)
    }


    return (
        <Container 
            onClick={(e) => {clicked(e)}} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{scale: 1.02}}
            animate={controls}
            className={allItems[index].clicked &&  hasInteracted ? `liked` : ``}
            >
            <Title>{data.title}</Title>
            <Image>
                <img src='/images/like/heart.svg' />
                <img src='/images/like/heart.png' />
            </Image>
            <Background gauge={gauge} className={!allItems[index].clicked &&  hasInteracted ? `lock` : ``}/>
        </Container>
    )
}