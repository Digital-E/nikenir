import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'

import Button from '../button'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;

    @media(max-width: 989px) {
        width: 100%;
    }
`

const Carousel = styled.div`
    display: flex;
    justify-content: center;

    > div {
        flex-basis: 25%;
    }

    outline: none !important;

    @media(max-width: 989px) {
        display: block;
    }
`

const Card = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    margin: 40px 20px 40px 20px;
    padding: 25px var(--padding);
    border-radius: 27px;
    background: ${props => props.data.background};
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    overflow: hidden;

    transition: filter 0.7s;

    @media(min-width: 990px) {
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
        height: calc(85vw * 1.8);
        width: 85%;
        margin: 40px 10px 30px 10px;
    }
`

const Title = styled.div`
    > h2:first-child {
        color: gray;
    }
`

const Image = styled.div`
    flex-grow: 1;
    margin-top: ${props => props.data.top}%;
    margin-left: ${props => props.data.left}%;
    width: ${props => props.data.width}%;

    img {
        width: 100%;
    }

    @media(max-width: 989px) {
        height: 0;
        width: auto;
    }
`

const Information = styled.div`
    margin-top: 10px;

    p:last-child {
        width: 65%;
    }

    p:first-child {
        font-size: 38px;
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
        width: 85%;
        margin: 0 auto 20px auto;
    }
`

const ButtonDesktopWrapper = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);

    @media(max-width: 989px) {
        display: none;
    }
`



let data = [
    {
        name: 'Ines',
        textOne: 'People Protector',
        textTwo: 'Community hero inspiring togetherness',
        img: '/images/avatars/MaxGuther_11-2.png',
        background: 'radial-gradient(101.96% 52.55% at 84.6% 50%, rgba(254, 194, 37, 0.9) 0%, rgba(255, 255, 255, 0) 76.07%)',
        width: 60,
        left: 35,
        top: -25
    },
    {
        name: 'Ivy',
        textOne: 'Climate Champion',
        textTwo: 'Planet protector empowering citizens of the world',
        img: '/images/avatars/mg_zc_03 1.png',
        background: 'radial-gradient(101.96% 52.55% at 84.6% 50%, rgba(195, 188, 236, 0.9) 0%, rgba(255, 255, 255, 0) 76.07%)',
        width: 80,
        left: 15,
        top: -20
    },
    {
        name: 'Theo',
        textOne: 'Active Activist',
        textTwo: 'Trusted coach who really listens',
        img: '/images/avatars/MaxGuther_12-2.png',
        background: 'radial-gradient(239.95% 126.46% at 33.97% 17.02%, rgba(2, 131, 254, 0.7) 0%, rgba(255, 255, 255, 0) 76.07%)',
        width: 45,
        left: 40,
        top: -25
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

    let cardHoverVariants = {
        'show': {
            opacity: 1,
            x: '-50%',
            y: 0,
            transition: {
                duration: 0.2
            }
        },
        'hide': {
            opacity: 0,
            x: '-50%',
            y: '10%',
            transition: {
                duration: 0.2
            }
        }
    }
    
    return (
        <Container>
            <Carousel ref={gallery}>
                {
                    data.map((item, index) => 
                        <Card 
                            // transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className={hoveredIndex !== null && hoveredIndex !== index ? 'blur' : ''}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            whileHover={isDesktop ? {scale: 1.05} : {}}
                            data={item}
                        >
                            <Title>
                                <h2>Play <br/> With:</h2>
                                <h2>{item.name}</h2>
                            </Title>
                            <Image data={item}><img src={item.img} /></Image>
                            <Information>
                                <p className='palatino-small'>{item.textOne}</p>
                                <p className='body-large'>{item.textTwo}</p>
                            </Information>
                            <ButtonDesktopWrapper
                                animate={hoveredIndex === index ? 'show' : 'hide'}
                                variants={cardHoverVariants}
                            >
                                <Button>Choose {item.name}</Button>
                            </ButtonDesktopWrapper>
                        </Card>
                        )
                }
            </Carousel>
            <ButtonWrapper>
                <Button>Choose {data[selectedIndex].name}</Button>
            </ButtonWrapper>
        </Container>
    )
}