import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useAnimationControls } from "framer-motion"

import Card from './card'

import InformationCard from '../../information-card'

const Container = styled.div`

    &.clicked .text-two {
        opacity: 1 !important;
        transition: opacity var(--transition-in) 0s;
    }

`

const InnerContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Text = styled.div`
    position: relative;
    text-align: center;
`

const TextTwo = styled.div`
    text-align: center;
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


export default function Component({ item, data }) {
    let [hasInteracted, setHasInteracted] = useState(false)
    let [allItems, setAllItems] = useState(item.squares)
    let [dragActive, setDragActive] = useState(true)
    let [isDragging, setIsDragging] = useState(false)
    let mouseOverIndex = useRef(null);

    const controls = useAnimationControls();

    let dragElementRef = useRef();

    useEffect(() => {
        let hasInteractedCount = 0

        allItems.forEach(item => {
            if(item.clicked === true) {
                hasInteractedCount += 1;
            }
        })

        if(hasInteractedCount === 0) {
            setHasInteracted(false)
        } else {
            setHasInteracted(true)
        }
    }, [allItems])

    let hasClicked = (e, index) => {
        let items = JSON.parse(JSON.stringify(allItems))

        items[index].clicked = true
        setAllItems(items)
    }

    let clicked = (e) => {

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
    } else if(mouseOverIndex.current === null) {
        setHasInteracted(false)
    }
  }

  let toggleMouseOver = (index) => {
    mouseOverIndex.current = index;
  }

    return (
        <Container className={hasInteracted ? 'clicked mtb-2 max-width' : 'mtb-2 max-width'}>
            <Text className='text-one mtb-2 palatino-x-small'>
                <span>{item.title}</span>
            </Text>
            <DragElement
              ref={dragElementRef}
              onClick={(e) => {clicked(e)}}
              onPointerDown={(e) => e.target.releasePointerCapture(e.pointerId)}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileHover={{scale: 1.1 }}
              whileTap={{ scale: 2 }}
              animate={controls}
              onDragStart={() => onDragStart()}
              onDragEnd={() => onDragEnd()}
              drag={dragActive}
              dragConstraints={{
                top: -50,
                left: -150,
                right: 150,
                bottom: 210,
              }}
              dragSnapToOrigin={true}
              dragMomentum={false}
            >
              <img src='/images/drag/air-jordan-1-low-se-older-shoes-f9r9bX 1.png' />
            </DragElement>
            <InnerContainer className='inner-container'>
                {
                    item.squares.map((item, index) => 
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
            <TextTwo className='text-two mtb-2 palatino-x-small'>You picked</TextTwo>
            <InformationCard item={item} data={data} selectedIndex={mouseOverIndex.current !== null ? mouseOverIndex.current : 0} />
        </Container>
    )
}