import { useEffect, useState, useContext } from 'react'
import styled from "styled-components"


const Container = styled.div`
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: black;
    z-index: 999;

    &.show {
        display: flex;
    }

    &.hide {
        display: none;
    }

    p {
        color: white;
    }
`;


const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;

    &&.show-overlay {
        opacity: 1;
        transition: opacity ease-in-out 0.3s 0s, transform linear 0s 0s;  
        transform: translateX(0);
    }

    &&.hide-overlay {
        opacity: 0;
        transition: opacity ease-in-out 0.3s, transform linear 0s 0.3s;
        transform: translateX(-100%);
    }
`



const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 20px;
    color: black;
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
`

const Text = styled.div`

    .palatino-small {
        margin-top: 15px;
    }

    p {
        color: black;
    }

    @media(max-width: 989px) {
        p {
            margin-bottom: 0;
        }
    }
`

const Component = () => {
    let [displayNotification, setDisplayNotification] = useState(false)

    useEffect(() => {

        if(window.orientation === 90 || window.orientation === -90) {
            setDisplayNotification(true)
        }

        window.addEventListener('orientationchange', function() {
            if(window.orientation === 90 || window.orientation === -90) {
                setDisplayNotification(true)
            } else {
                setDisplayNotification(false)
            }
        }, false)
    }, [])
    

    return (
        <Container className={displayNotification ? 'show' : 'hide'}>
            <p className='palatino-medium'>Please rotate device</p>
            {/* <Overlay onClick={() => setDisplayNotification(false)} className={displayNotification ? 'show-overlay' : 'hide-overlay'}/> */}
        </Container>
    )
}

export default Component

