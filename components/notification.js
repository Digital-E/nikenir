import { useEffect, useState, useContext } from 'react'
import styled from "styled-components"

import { store } from "../store";

const Container = styled.div`
    > div {
        margin-bottom: 0px;
    }

    &&.lift-notification > div {
        margin-bottom: 30px;
    }
`;

const Popup = styled.div`
    position: fixed;    
    width: ${props => props.position === 'left' ? '190px' : '100%'};
    top: ${props => props.position === 'left' ? 'auto' : '95px'};
    left: ${props => props.position === 'left' ? '70px' : '50%'};
    bottom: ${props => props.position === 'left' ? '20px' : 'auto'};
    padding: 15px;
    z-index: 997;
    box-sizing: border-box;
    opacity: 0;

    &&.show-notification {
        opacity: 1;
        transform: ${props => props.position === 'left' ? 'translate(0, 0)' : 'translate(-50%, 0)'};
        transition: transform ease-in-out 0s 0s, opacity 0.5s 0.2s, margin-bottom 0.1s;
    }

    &&.hide-notification {
        transform: ${props => props.position === 'left' ? 'translate(0, 0)' : 'translate(-50%, -200px)'};
        transition: transform ease-in-out 0s 0.3s, opacity 0.3s, margin-bottom 0.1s;
    }
      

    @media(max-width: 989px) {
        width: 100%;
        top: 95px;
        left: 50%;
        bottom: auto;

        &&.show-notification {
            opacity: 1;
            transform: translate(-50%, 0);
            transition: transform ease-in-out 0s 0s, opacity 0.5s 0.2s, margin-bottom 0.1s;
        }

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

    .palatino-x-small {
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

let timeout = null

const Component = () => {
    let [displayNotification, setDisplayNotification] = useState(false)
    let [notificationMessage, setNotificationMessage] = useState('')
    let [notificationPosiition, setNotificationPosition] = useState('left')

    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    useEffect(() => {
        clearTimeout(timeout)

        if(state.notificationMessage === '') {
            setDisplayNotification(false)
        } else {
            if(state.notificationMessage === 'Share the awareness!<br />We all have the power to make positive changes for the world we share.') {
                setNotificationPosition('left')
            } else {
                setNotificationPosition('top')
            }

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
        <Container className='notification'>
            {/* <Overlay onClick={() => setDisplayNotification(false)} className={displayNotification ? 'show-overlay' : 'hide-overlay'}/> */}
            <Popup position={notificationPosiition} className={displayNotification ? 'show-notification container-background max-width-header' : 'hide-notification container-background max-width-header'}>
                {/* <Close onClick={() => setDisplayNotification(false)} className='p'>Close</Close> */}
                <Text>
                    <p className='medium-text' 
                        dangerouslySetInnerHTML={{__html: notificationMessage}}
                    />
                    <p className='palatino-x-small'>Link copied to your clipboard</p>
                </Text>
            </Popup>
        </Container>
    )
}

export default Component

