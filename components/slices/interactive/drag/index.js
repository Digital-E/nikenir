import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useAnimationControls, useDragControls } from "framer-motion"

import Card from './card'

const Container = styled.div`
    width: fit-content;

    &.clicked .text-two {
        opacity: 1 !important;
        transition: opacity var(--transition-in) 0s;
    }

    .text-one > span:nth-child(2) {
        opacity: 0;
        // transition: opacity var(--transition-in);
    }

    .text-one > span:nth-child(1) {
        // transition: opacity var(--transition-in) 0.3s;
    }

    &.clicked .text-one > span:nth-child(1) {
        opacity: 0;
        // transition: opacity var(--transition-in);
    }

    &.clicked .text-one > span:nth-child(2) {
        opacity: 1;
        cursor: pointer;
        // transition: opacity var(--transition-in) 0.3s;
    }
`

const Text = styled.div`
    position: relative;
    text-align: center;
    margin: 30px auto;
    height: 20px;

    > span {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        width: 100%;
    }

    > span:not(:last-child) {
        position: absolute;
    }

    > span:last-child {
        opacity: 0;
    }
`

const InnerContainer = styled.div`
    display: flex;
`

const TextTwo = styled.div`
    text-align: center;
    margin: 30px 0;
    opacity: 0;
    transition: opacity var(--transition-in);
`

const DragElement = styled(motion.div)`
    position: relative;
    width: 130px;
    margin: 0 auto;
    cursor: pointer;
    touch-action: none;
    z-index: 2;

    img {
      width: 100%;
    }

    &.dragging {
      pointer-events: none;
    }
`


let data = [
    {
        title: 'Reduce your footprint',
        img: 'images/cross-cards/shoebox 1.png',
        clicked: false
    },
    {
        title: 'Buy it for life',
        img: 'images/cross-cards/pngegg 1.png',
        clicked: false
    },
]

export default function Component() {
    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(data)
    let [dragActive, setDragActive] = useState(true)
    let [isDragging, setIsDragging] = useState(false)
    let mouseOverIndex = useRef(null);

    const controls = useAnimationControls();
    const dragControls = useDragControls();

    let dragElementRef = useRef();

    let triggerConfetti = (e) => {
      
    }

    let hasClicked = (e, index) => {
        let items = JSON.parse(JSON.stringify(allItems))
        items[index].clicked = true
        setAllItems(items)

        setHasInteracted(true)

        // triggerConfetti(e);
        setDragActive(false)
    }

    let undo = () => {
        let items = JSON.parse(JSON.stringify(allItems))
        items.forEach(item => item.clicked = false)
        setAllItems(items)

        setHasInteracted(false)

        setDragActive(true)
        controls.start({ x: 0, y: 0})
    }

    let clicked = (e) => {
      if(!dragActive.current) return

      controls.start({ scale: 2 })
      setTimeout(() => {
          controls.start({ scale: 1.1 })
      }, 50)
  }
    
  let onDragStart = () => {
    dragElementRef.current.classList.add("dragging")
    setIsDragging(true)
  }

  let onDragEnd = () => {
    dragElementRef.current.classList.remove("dragging")
    setIsDragging(false)

    if(mouseOverIndex.current === 0) {
      hasClicked(null, 0)
      controls.start({ x: -100, y: 150})
    } else if (mouseOverIndex.current === 1) {
      hasClicked(null, 1)
      controls.start({ x: 100, y: 150})
    }
  }

  let toggleMouseOver = (index) => {
    mouseOverIndex.current = index;
  }

    return (
        <Container className={hasInteracted ? 'clicked' : ''}>
            <Text className='text-one palatino'>
                <span>Drag the shoe into the answer box</span>
                <span onClick={() => undo()}>Undo</span>
            </Text>
            <DragElement
              ref={dragElementRef}
              onClick={(e) => {clicked(e)}}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileHover={{scale: 1.1 }}
              whileTap={{ scale: 2 }}
              animate={controls}
              onDragStart={() => onDragStart()}
              onDragEnd={() => onDragEnd()}
              // dragControls={dragControls}
              drag={dragActive}
              dragConstraints={{
                top: -50,
                left: -150,
                right: 150,
                bottom: 210,
              }}
              dragSnapToOrigin={true}
              dragMomentum={false}
              // className={!dragActive && 'lock'}
            >
              <img src='/images/drag/air-jordan-1-low-se-older-shoes-f9r9bX 1.png' />
            </DragElement>
            <InnerContainer className='inner-container'>
                {
                    data.map((item, index) => 
                    <Card 
                      data={item} 
                      index={index} 
                      allItems={allItems} 
                      hasClicked={(e, index) => hasClicked(e, index)} 
                      hasInteracted={hasInteracted} 
                      isDragging={isDragging}
                      mouseOver={(index) => toggleMouseOver(index)}
                      />)
                }
            </InnerContainer>
            <TextTwo className='text-two palatino'>You picked</TextTwo>
        </Container>
    )
}