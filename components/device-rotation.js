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
    // background: black;
    z-index: 999;

    &.show {
        display: flex;
    }

    &.hide {
        display: none;
    }

    p {
        color: black;
    }
`;


const Component = () => {
    let [displayNotification, setDisplayNotification] = useState(false)

    useEffect(() => {

        if(window.orientation === 90 || window.orientation === -90) {
            setDisplayNotification(true)
        }

        window.addEventListener('orientationchange', function() {
            if(window.orientation === 90 || window.orientation === -90) {
                setDisplayNotification(true)
                document.querySelectorAll('.hide-on-rotate').forEach(item => item.style.opacity = 0)
            } else {
                setDisplayNotification(false)
                document.querySelectorAll('.hide-on-rotate').forEach(item => item.style.opacity = 1)
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

