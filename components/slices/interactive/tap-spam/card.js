import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useAnimationControls } from "framer-motion"
import styled from 'styled-components'

const Container = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
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
`

const Title = styled.h3`
    text-transform: uppercase;
    text-align: center;
    padding: 30px;
`

const Image = styled.div`
    width: 40%;

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
    background: white;
    transition: 0.2s;
    z-index: -1;

    &.lock {
        height: 0;
    }
`

let gaugeTimeout = null;

export default function Component({ data, index, allItems, hasClicked, hasInteracted }) {
    let lock = useRef(false);
    let [gauge, setGauge] = useState(0);

    const controls = useAnimationControls();

    let gaugeIncrement = (e) => {
        clearTimeout(gaugeTimeout)
        setGauge(gauge + 10)

        if(gauge === 100) {
            hasClicked(e, index); 
        }

        gaugeTimeout = setTimeout(() => {
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
        gaugeIncrement(e)
        controls.start({ scale: 2 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
        }, 50)
    }


    return (
        <Container 
            onClick={(e) => {clicked(e)}} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{scale: 1.02}}
            animate={controls}
            >
            <Title>{data.title}</Title>
            {/* <Image>
                <img src={data.img} />
            </Image> */}
            <Background gauge={gauge} className={!allItems[index].clicked &&  hasInteracted ? `lock` : ``}/>
        </Container>
    )
}