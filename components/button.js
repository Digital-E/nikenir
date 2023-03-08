import { useEffect, useState, useContext } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import styled from 'styled-components'


const Container = styled(motion.button)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 30px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    background: ${props => props.colour ? props.colour : 'var(--background)'};
    backdrop-filter: var(--backdrop-filter-blur);
    border-radius: 30px;
    cursor: pointer;
    user-select: none;

    @media(max-width: 989px) {
        padding: 10px 30px;
        max-width: none;
    }
`;



const Component = ({ colour, children }) => {
    const controls = useAnimationControls();

    let click = (e) => {
        controls.start({ scale: 1.1 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
        }, 50)
    }

    return (
        <Container 
            className='helvetica max-width'
            colour={colour}
            onClick={(e) => {click(e)}} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{scale: 1.02}}
            animate={controls}
        >
            {children}
        </Container>
    )
}

export default Component

