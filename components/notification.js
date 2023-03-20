import { useEffect, useState, useContext } from 'react'
import styled from "styled-components"

import { store } from "../store";

const Container = styled.div``;

const Popup = styled.div`
    position: fixed;    
    width: 100%;
    top: 95px;
    left: 50%;
    padding: 15px;
    z-index: 997;
    box-sizing: border-box;
    opacity: 0;

    &&.show-notification {
        opacity: 1;
        transform: translate(-50%, 0);
        transition: transform ease-in-out 0.3s 0s, opacity 0.5s 0.2s;
    }

    &&.hide-notification {
        transform: translate(-50%, -200px);
        transition: transform ease-in-out 0.3s 0s, opacity 0.2s;
    }
      

    @media(max-width: 989px) {
        &&.hide-notification {
            transform: translate(-50%, -200px);
        }

        width: calc(100% - 30px);
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
    h2 {
        font-size: 40px;
        color: black;
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

let timeout = null

const Component = () => {
    let [displayNotification, setDisplayNotification] = useState(false)
    let [notificationMessage, setNotificationMessage] = useState('')

    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    useEffect(() => {
        clearTimeout(timeout)

        if(state.notificationMessage === '') {
            setDisplayNotification(false)
        } else {
            setNotificationMessage(state.notificationMessage)
            setDisplayNotification(true)

            timeout = setTimeout(() => {
                dispatch({type: 'update notification message', value: ''})
            }, 5000)
        }

    }, [state.notificationMessage])

    useEffect(() => {
        setDisplayNotification(false)
    }, [])
    

    return (
        <Container>
            {/* <Overlay onClick={() => setDisplayNotification(false)} className={displayNotification ? 'show-overlay' : 'hide-overlay'}/> */}
            <Popup className={displayNotification ? 'show-notification container-background max-width-header' : 'hide-notification container-background max-width-header'}>
                {/* <Close onClick={() => setDisplayNotification(false)} className='p'>Close</Close> */}
                <Text>
                    <h2>Let's share!</h2>
                    <p className='medium-text' 
                        dangerouslySetInnerHTML={{__html: notificationMessage}}
                    />
                </Text>
            </Popup>
        </Container>
    )
}

export default Component

