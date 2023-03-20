import { useEffect, useState, useContext } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import styled from 'styled-components'

import { useRouter } from 'next/router'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { store } from '../store'


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



const Component = ({ link, children, currentPageLink }) => {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [shareLink, setShareLink] = useState('')
    
    const controls = useAnimationControls();

    let click = (e) => {
        controls.start({ scale: 1.1 })
        setTimeout(() => {
            controls.start({ scale: 1.02 })
        }, 50)
    }

    let copied = () => {
        dispatch({type: "update notification message", value: 'Link copied to your clipboard.<br />Let’s spread the word and share with rest of the world.'})
    }

    useEffect(() => {
        if(currentPageLink) {
            // setShareLink(`${window.location.href}`)
            setShareLink(`${window.location.origin}${process.env.basePath}`)
        } else {
            setShareLink(`${window.location.origin}${link}`)
        }
    }, [])

    return (
        <CopyToClipboard text={shareLink} onCopy={() => copied()}>
            <Container 
                className='helvetica'
                onClick={(e) => {click(e)}} 
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                whileHover={{scale: 1.02}}
                animate={controls}
            >
                <img src={`${process.env.basePath}/images/icons/share.svg`} />
            </Container>
        </CopyToClipboard>
    )
}

export default Component

