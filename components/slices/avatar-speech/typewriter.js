import { useState, useEffect, useRef } from "react";
import styled from "styled-components"

const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    z-index: 999;
    overflow: hidden;

    font-family: Helvetica;
    font-size: 20px;

`

const TextWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`

const Text = styled.div`
    position: relative;
    width: 100%;
    user-select: none;

    .letter {
        opacity: 0;
    }

    .reveal-letter {
        opacity: 1 !important;
        transition: opacity 0.1s;
    }

    &.hide {
        opacity: 0;
        // transform: scale(1.1);
        transition: opacity 0s, transform 0s;
    }

    @media(max-width: 576px) {
        width: 90%;
    }
`


const Cursor = styled.div`
    position: absolute;
    display: inline-block;
    height: 1.2em;
    width: 2px;
    margin-top: 0em;
    margin-left: 0.1em;
    background: var(--color);
    animation: none;
    opacity: 1;
    transition: opacity 1s;
    animation: blink 0.5s infinite;

    &.hide {
        opacity: 0;
        transition: opacity 0s;
    }

    &.typing {
        animation: none;
    }

    @keyframes blink {
        0%  { background-color: var(--color); }
        49% { background-color: var(--color); }
        50% { background-color: transparent; }
        99% { background-color: transparent; }
        100%  { background-color: var(--color); }
    }

    @media(max-width: 989px) {
        height: 0.9em;
        margin-top: 0.2em;
    }
`

const Replay = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -30px;
    right: 0;
    z-index: 999;
    font-family: helvetica;
    color: white;
    font-size: 12px;
    // padding: 5px 10px;
    height: 23px;
    width: 23px;
    border-radius: 999px;
    background: var(--background);
    backdrop-filter: blur(10px);
    user-select: none;

    * {
        cursor: pointer;
    }

    transition: color 0.3s, background 0.3s, transform 0.1s;

    &.bump {
        transform: scale(1.03);
    }

    @media(min-width: 990px) {
        // :hover {
        //     cursor: pointer;
        //     background: var(--color);
        //     color: black;
        //     transition: color 0.3s, background 0.3s, transform 0.1s;
        // }
    
        // :hover path {
        //     fill: black;
        //     transition: fill 0.3s;
        // }
    }

    svg {
        height: 12px;
        // margin-left: 5px;
    }

    path {
        fill: black;
        transition: fill 0.3s;
    }
`



export default function Component({ data, start }) {

    let [triggerInit, setTriggerInit] = useState(false);
    let containerRef = useRef();
    let typeWriterRef = useRef();
    let replayButtonRef = useRef();
    let cursorRef = useRef();

    let interval = null;
    let newSentenceTimeout = null;
    let replayTimeout = null;

    let displayText = '';
    let sentenceIndex = 0;
    let letterIndex = 0;

    let cursorActive = false;

    let hasTriggeredAutoReset = false;

    let initSentence = () => {

        if(letterIndex === 0) {
            let splitText = data[sentenceIndex].split('')

            let splitTextWithSpan = splitText.map(item => `<span class='letter'>${item}</span>`)

            displayText = splitTextWithSpan.join('')

            typeWriterRef.current.innerHTML = displayText
        }
    }

    let typeText = () => {

        let sentence = data[sentenceIndex]
        let sentenceLength = sentence.length

        if(sentenceIndex === data.length - 1 && letterIndex > sentenceLength && hasTriggeredAutoReset === false) {
            // setTimeout(() => {
            //     replay(true);
            //     hasTriggeredAutoReset = false;
            // }, 1500)

            // hasTriggeredAutoReset = true;
        }

        initSentence();


        if(letterIndex <= sentenceLength) {

            if(typeWriterRef.current?.children[letterIndex] !== undefined) {
                
                if(cursorActive) {
                    cursorRef.current.style.left = `${typeWriterRef.current.children[letterIndex].getBoundingClientRect().x + typeWriterRef.current.children[letterIndex].getBoundingClientRect().width - typeWriterRef.current.children[0].getBoundingClientRect().x}px`
                    cursorRef.current.style.top = `${typeWriterRef.current.children[letterIndex].getBoundingClientRect().y - typeWriterRef.current.children[0].getBoundingClientRect().y}px`
                }

                typeWriterRef.current.children[letterIndex].classList.add("reveal-letter")

                cursorRef.current?.classList.add("typing")

            }
            
            letterIndex +=1;
        } else {
            cursorRef.current?.classList.remove("typing")

            if(sentenceIndex === data.length - 1 ) return


            newSentenceTimeout = setTimeout(() => {
                cursorRef.current.classList.add('hide');

                typeWriterRef.current.classList.add('hide');

                typeWriterRef.current.innerHTML = ''
                displayText = ''
                letterIndex = 0;
                sentenceIndex += 1;
                
                typeWriterRef.current.classList.remove('hide');
                cursorRef.current.classList.remove('hide');

                newSentenceTimeout = null;

            }, 2300)
        }
    }

    let bump = () => {
        replayButtonRef.current.classList.add("bump")

        setTimeout(() => {
            replayButtonRef.current.classList.remove("bump")
        }, 100)
    }

    let replay = (auto) => {

        if(!auto) bump();

        cursorRef.current.classList.add('hide');

        if(replayTimeout !== null) return;

        typeWriterRef.current.classList.add('hide');

        clearInterval(interval);

        interval = null;

        clearTimeout(newSentenceTimeout);
        
        newSentenceTimeout = null;

        displayText = '';
        typeWriterRef.current.innerHTML = '';
        sentenceIndex = 0;
        letterIndex = 0;
        
        replayTimeout = setTimeout(() => {

            typeWriterRef.current.classList.remove('hide');

            cursorRef.current.classList.remove('hide');

            init();

            replayTimeout = null;
        }, 500);
    }

    let init = () => {
        initSentence();

        interval = setInterval(() => {
            if(newSentenceTimeout !== null) return
            typeText();
        }, 30);
    }

    useEffect(() => {
        if(triggerInit) {
            init();
        }
    }, [triggerInit]) 

    useEffect(() => {
        if(start) {
            setTriggerInit(true)
            cursorRef.current.classList.remove('hide')
        }
    }, [start])

    useEffect(() => {

        // setTimeout(() => {
        //     setTriggerInit(true)
        //     cursorRef.current.classList.remove('hide');
        // }, 1500)

        window.addEventListener('resize', () => {
            if(typeWriterRef.current.children[letterIndex - 2] === undefined) return;

            cursorRef.current.style.left = `${typeWriterRef.current.children[letterIndex - 2].getBoundingClientRect().x + typeWriterRef.current.children[letterIndex - 2].getBoundingClientRect().width}px`
            cursorRef.current.style.top = `${typeWriterRef.current.children[letterIndex - 2].getBoundingClientRect().y - typeWriterRef.current.children[letterIndex - 2].getBoundingClientRect().height / 2}px`
        })

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
      <>
      <Container>
        <TextWrapper ref={containerRef}>
            <Text ref={typeWriterRef} />
        </TextWrapper>
        <Cursor ref={cursorRef} className="hide" />
      </Container>
      <Replay onClick={() => replay()} ref={replayButtonRef}>
        {/* <span>Replay</span> */}
        <svg x="0px" y="0px"
            viewBox="0 0 561.1 561.1" xmlSpace="preserve">
        <g>
            <path d="M280.6,0c76.2,0,145,30.2,195.4,79.5l48.7-30.8l5,161.8l-142.2-76.2l48.7-30.8c-41.4-36.4-95.8-58.8-155.7-58.8
                c-65,0-123.8,26.3-166.9,68.9c-42.6,43.1-68.9,101.9-68.9,166.9c0,65,26.3,123.8,68.9,166.9c43.1,42.6,101.9,68.9,166.9,68.9
                c65,0,123.8-26.3,166.9-68.9c42-42.6,68.3-100.2,68.9-164.6l44.8-2.2c0,77.3-31.4,147.8-82.3,198.2c-50.4,51-121,82.3-198.2,82.3
                c-77.3,0-147.8-31.4-198.2-82.3C31.4,428.4,0,357.8,0,280.6c0-77.3,31.4-147.8,82.3-198.2C132.7,31.4,203.3,0,280.6,0L280.6,0z"/>
        </g>
        </svg>        
        </Replay>
      </>
    )
  }