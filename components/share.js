import { useEffect, useState, useContext } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import styled from 'styled-components'


const Container = styled(motion.div)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    width: 40px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    background: var(--background);
    backdrop-filter: var(--backdrop-filter-blur);
    border-radius: 12px;
    cursor: pointer;
    user-select: none;

    img {
        cursor: pointer;
    }
`;



const Component = ({ children }) => {
    const controls = useAnimationControls();

    let click = (e) => {
        controls.start({ scale: 1.1 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
        }, 50)
    }

    return (
        <Container 
            className='helvetica'
            onClick={(e) => {click(e)}} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{scale: 1.02}}
            animate={controls}
        >
            <img src='/images/icons/share.svg' />
        </Container>
    )
}

export default Component

