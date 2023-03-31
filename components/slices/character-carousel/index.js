import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'

import ButtonLink from '../../button-link'
import Link from '../../link'
import Image from '../../image'

import ImageSequence from './image-sequence'

// Images
import characterOne1 from '../../../public/images/avatars/carousel/ines/ines-0.png'
import characterOne2 from '../../../public/images/avatars/carousel/ines/ines-1.png'
import characterOne3 from '../../../public/images/avatars/carousel/ines/ines-2.png'
import characterOne4 from '../../../public/images/avatars/carousel/ines/ines-3.png'
import characterOne5 from '../../../public/images/avatars/carousel/ines/ines-4.png'
import characterOne6 from '../../../public/images/avatars/carousel/ines/ines-5.png'

import characterTwo1 from '../../../public/images/avatars/carousel/theo/theo-0.png'
import characterTwo2 from '../../../public/images/avatars/carousel/theo/theo-1.png'
import characterTwo3 from '../../../public/images/avatars/carousel/theo/theo-2.png'
import characterTwo4 from '../../../public/images/avatars/carousel/theo/theo-3.png'
import characterTwo5 from '../../../public/images/avatars/carousel/theo/theo-4.png'
import characterTwo6 from '../../../public/images/avatars/carousel/theo/theo-5.png'


import characterThree1 from '../../../public/images/avatars/carousel/ivy/ivy-0.png'
import characterThree2 from '../../../public/images/avatars/carousel/ivy/ivy-1.png'
import characterThree3 from '../../../public/images/avatars/carousel/ivy/ivy-2.png'
import characterThree4 from '../../../public/images/avatars/carousel/ivy/ivy-3.png'
import characterThree5 from '../../../public/images/avatars/carousel/ivy/ivy-4.png'
import characterThree6 from '../../../public/images/avatars/carousel/ivy/ivy-5.png'

import gradientOne from '../../../public/images/carousel-gradients/gradient1.png'
import gradientTwo from '../../../public/images/carousel-gradients/gradient3.png'
import gradientThree from '../../../public/images/carousel-gradients/gradient2.png'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    overflow: hidden;
    width: 100%;

    @media(max-width: 989px) {
        position: relative;
        top: auto;
        left: auto;
        transform: none;
        width: 100%;
    }
`

const Carousel = styled.div`
    display: flex;
    justify-content: center;

    outline: none !important;

    @media(max-width: 989px) {
        display: block;
    }
`

const Card = styled(motion.div)`
    position: relative;
    display: flex;
    flex-basis: 28%;
    height: calc(33.333vw * 1.15);
    width: 100%;
    margin: 40px 10px 40px 10px;
    padding: 0 0 30px 0;
    border-radius: 27px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    overflow: hidden;

    a {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: space-between;
        width: 100%;
    }

    transition: filter 0.7s;

    @media(min-width: 990px) {
        padding: 0 0 1.735vw 0;

        &.blur {
            filter: blur(10px);
            transition: filter 1s;
        }
    }

    * {
        cursor: pointer;
    }


    @media(max-width: 989px) {
        position: absolute;
        height: calc(50vw * 1.5);
        width: 50%;
        margin: 40px 10px 30px 10px;

        a {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    }

    @media(max-width: 768px) {
        width: 50vw;
        height: calc(50vw * 1.6);
    }

    @media(max-width: 539px) {
        position: absolute;
        height: calc(85vw * 1.5);
        width: 85%;
        margin: 40px 10px 30px 10px;

        a {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    }

    @media(max-height: 667px) and (max-width: 576px) {
        height: calc(85vw * 1.3);
    }

    @media(min-width: 1690px) {
        height: 647.82px;
        padding: 0  0 45.9144px 0;
    }
    
    max-width: 472px;
`

const Background = styled.div`
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
`


const Title = styled.div`
    position: absolute;
    left: 15px;
    top: 30px;

    > h2:first-child {
        color: gray;
    }

    h2 {
        margin: 0;
    }

    @media(min-width: 990px) {
        // left: 30px;
        // top: 25px;
        left: 2.082vw;
        top: 1.735vw;

        h2 {
            font-size: 2.91vw;
        }
    }

    @media(min-width: 1690px) {
        left: 35.18px;
        top: 29.32px;

        h2 {
            font-size: 49.179px;
        }
    }
`

const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-basis: 100%;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    left: 0;
    bottom: ${props => props.data.bottom}%;

    img {
        width: ${props => props.data.width}% !important;
    }


    @media(max-width: 989px) {
        left: 0;

        img {
            width: ${props => props.data.widthMobile}%  !important;
        }
    }

    @media(max-height: 667px) and (max-width: 576px) {
        left: 15%;
        bottom: -7%;

        img {
            width: ${props => props.data.widthMobile - 17}%  !important;
        }
    }

    @media(min-width: 1690px) {
        bottom: calc(${props => props.data.bottom / 100} * 647.81px) !important;
    }

`

const Information = styled.div`
    margin-top: 10px;
    flex-basis: auto;
    min-height: 75px;

    padding: 0px var(--margin);

    p:first-child {
        font-size: 32px;
    }

    p:last-child {
        font-size: 16px;
    }

    @media(min-width: 990px) {
        padding: 0 2.082vw;
        min-height: 5.4vw;

        p:first-child {
            // font-size: 2.6372vw;
            font-size: 2.5vw;
        }

        p:last-child {
            // font-size: 1.388vw;
            font-size: 1.1vw;
        }
    }

    @media(min-width: 1690px) {
        padding: 0 35.18px;
        min-height: 77.73px;

        p:first-child {
            font-size: 42.25px;
        }

        p:last-child {
            font-size: 18.59px;
        }
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 auto 20px auto;
    display: none;

    @media(max-width: 989px) {
        display: block;
        width: 50%;
        margin: 0 auto 20px auto;
    }

    @media(max-width: 540px) {
        width: 85%;
    }
`



let data = [
    {
        name: 'Ines',
        textOne: 'People Promoter',
        textTwo: 'Community hero inspiring togetherness',
        images: [
            characterOne1,
            characterOne2,
            characterOne3,
            characterOne4,
            characterOne5,
            characterOne6,
        ],
        link: '/people-promoter',
        backgroundSrc: gradientOne,
        width: 80,
        widthMobile: 88,
        bottom: -4
    },
    {
        name: 'Theo',
        textOne: 'Climate Champion',
        textTwo: 'Planet preserver inspiring citizens to have a positive impact',
        images: [
            characterTwo1,
            characterTwo2,
            characterTwo3,
            characterTwo4,
            characterTwo5,
            characterTwo6,
        ],
        link: '/climate-champion',
        backgroundSrc: gradientTwo,
        width: 85,
        widthMobile: 93,
        bottom: -4
    },
    {
        name: 'Ivy',
        textOne: 'Active Advocate',
        textTwo: 'Trusted coach who really listens',
        images: [
            characterThree1,
            characterThree2,
            characterThree3,
            characterThree4,
            characterThree5,
            characterThree6
        ],
        link: '/active-advocate',
        backgroundSrc: gradientThree,
        width: 91,
        widthMobile: 93,
        bottom: -6
    },    
]

export default function Component() {
    let gallery = useRef();
    let flickity = null;
    let [selectedIndex, setSelectedIndex] = useState(0);
    let [hoveredIndex, setHoveredIndex] = useState(null);

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
      })


    let init = () => {
        if(flickity !== null) return

        flickity = new Flickity(gallery.current, {
            prevNextButtons: false,
            pageDots: false,
            // friction: 0.25,
            cellAlign: "center",
            percentPosition: true,
            wrapAround: true,
        })

        flickity.on('change', (cellIndex) => {
            setSelectedIndex(cellIndex)
        })
    }

    let destroy = () => {
        if(flickity === null) return
        flickity.destroy()
        flickity = null
    }

    useEffect(() => {

        if(window.innerWidth < 990) {
            init();
        }

        window.addEventListener("resize", () => {
            if(window.innerWidth > 989) {
                destroy();
            } else {
                init();
            }
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if(window.innerWidth < 990) {
                setHoveredIndex(selectedIndex)
            }
        }, 250)
    }, [selectedIndex])

    
    return (
        <Container>
            <Carousel ref={gallery}>
                {
                    data.map((item, index) => 
                            <Card 
                                // transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                // className={hoveredIndex !== null && hoveredIndex !== index ? 'blur' : ''}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={isDesktop ? {scale: 1.05} : {}}
                                transition={{ duration: 0.4 }}
                                data={item}
                            >
                                <Link href={item.link}>
                                    <Background>
                                        <Image src={item.backgroundSrc} priority={true} />
                                    </Background>
                                    <Title>
                                        <h2>Play <br/> With:</h2>
                                        <h2>{item.name}</h2>
                                    </Title>
                                    <ImageWrapper data={item}>
                                        <ImageSequence index={index} data={item.images} hoveredIndex={hoveredIndex}  />
                                    </ImageWrapper>
                                    <Information>
                                        <p className='palatino-small'>{item.textOne}</p>
                                        <p className='body-large'>{item.textTwo}</p>
                                    </Information>
                                </Link>
                            </Card>
                        )
                }
            </Carousel>
            <ButtonWrapper>
                <ButtonLink href={data[selectedIndex].link}>Choose {data[selectedIndex].name}</ButtonLink>
            </ButtonWrapper>
        </Container>
    )
}