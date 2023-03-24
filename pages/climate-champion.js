import { useEffect, useContext } from "react"
import Head from 'next/head'
import styled from 'styled-components'

import { store } from "../store"

// Components
import Layout from '../components/layout'
import Slices from '../components/slices'

// Images
import avatarImage from '../public/images/avatars/carousel/theo/theo-0.png'
import avatarImageTwo from '../public/images/avatars/praise/theo.png'

const Container = styled.div``

let data = {
    title: 'Climate Champion',
    name: 'Theo',
    role: 'Climate Champion',
    avatar: avatarImage,
    avatarMiniature: `${process.env.basePath}/images/avatars/miniature/theo.png`,
    colourOne: '#C2BCEB',
    colourTwo: '#F05822',
    colourThree: '#C2BCEB',
    tickerColourOne: 'rgba(194, 188, 235, 0.5)',
    questionCount: 4,
    intro: {
        title: 'TO PROTECT THE PLANET AND THOSE WHO WILL INHERIT IT IS A MOVE WE CAN MAKE TOGETHER.',
        text: [
          'The choices and actions we take right now will make all the difference for the next generation.',
          'Oh, hey, I’m Theo, I really care about our big blue ball! There are so many significant things we can do as individuals, families, and communities to help move the climate dial.',
          'No time like the present! Let’s imagine three scenarios. Then you decide what you would do in each case.',
          'Don’t worry, there are no wrong answers. Only progress!'
        ],
        desktop: {
          bubbleBottom: 29,
          bubbleLeft: 17,
          avatarWidth: 24
        },
        mobile: {
          bubbleBottom: 75,
          bubbleLeft: 25,
          avatarWidth: 70,
          avatarLeft: -35,
          avatarBottom: -5,
        }
    },
    slices: [    
        {
            type: 'question',
            number: '1/4',
            title: 'The good buy',
            text: 'You care about your planet a lot but also kind of need a new pair of sneakers. You choose to…'
        },
        {
            type: 'drag',
            title: 'Drag the shoe into the answer box',
            img: `${process.env.basePath}/images/climate-champion/objects/Planet_Q1.png`,
            squares: [
              {
                title: 'Reduce your footprint'
              },
              {
                title: 'Buy it for life'
              }
            ],
            information: [
              {
                title: 'Reduce your footprint',
                text: 'You’re all about the lighter weight, longer lasting materials. Efficient patterns and smart design decisions. More recycling, less carbon. No extra boxes or added paper toe stuffing.',
                textCarousel: [
                  'Our Move To Zero collection helps reduce our overall carbon footprint through environmentally preferred materials.',
                ]
              },
              {
                title: 'Buy it for life',
                text: 'You want this pair to last, so you’re looking for those materials and designs that are durable and timeless at the same time.',
                textCarousel: [
                  'To create products that last longer and are designed with the end in mind we created ‘Circularity: Guiding the Future of Design’, a resource for designers around the world.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2/4',
            title: 'MOVE TO CIRCULAR',
            text: 'You decide it’s time to curate your wardrobe, but don’t want to add to the landfill. Will you…'
        },
        {
            type: 'scratch',
            title: 'Scratch out your choice',
            squares: [
              {
                id: 1,
                title: 'Recycle your gear',
                img: `${process.env.basePath}/images/climate-champion/objects/Planet_Q2_Object_01_02_background.png`,
                imgBack: `${process.env.basePath}/images/logos/MOVE_TO_ZERO.png`
              },
              {
                id: 1,
                title: 'Regift your gear',
                img: `${process.env.basePath}/images/climate-champion/objects/Planet_Q2_Object_02_background.png`,
                imgBack: `${process.env.basePath}/images/logos/MOVE_TO_ZERO.png`
              }
            ],
            information: [
              {
                title: 'RECYCLE YOUR GEAR',
                text: 'You realize that there are more lucky shirts and shoes here than not, and it’s time to let some of these treasures serve a new purpose. Time to recycle and give something back.',
                textCarousel: [
                  'In selected locations, through our Recycling + Donation program, we clean and donate or recycle your used athletic gear to make sure it lives on, even when you’re done wearing it.',
                ]
              },
              {
                title: 'Regift your gear',
                text: 'You forgot you had these sneakers. You loved them like some people love their cat. Your sister was jealous…and your same size. Hey, it’s her birthday coming up. You decide to repair and regift.',
                textCarousel: [
                  'B.I.L.L. (Bot Initiated Longevity Lab) is a robot-augmented system that cleans and repairs shoes in London. An inspiration to us all to care for and repair our clothes so they can have a longer useful life.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3/4',
            title: 'FRESH WHEELS',
            text: 'You wake up early on Saturday for football practice. You open the curtains, and the sky has never looked so blue. You see the car in the driveway and decide to make a change. Do you…'
        },  
        {
            type: 'tap spam',
            heartImg: `${process.env.basePath}/images/like/heart-fill-theo.png`,
            squares: [
              {
                title: 'Ride your bike to practice',
                img: `${process.env.basePath}/images/climate-champion/objects/Planet_Q3_Object_01.png`
              },
              {
                title: 'Take the bus to practice',
                img: `${process.env.basePath}/images/climate-champion/objects/Planet_Q3_Object_02.png`
              }
            ],
            information: [
              {
                title: 'Ride your bike to practice',
                text: 'You dig your bike out of the garage and set off. The warm breeze in your face brings a smile, and by the time you arrive at practice you’ve had the perfect warm-up!',
                textCarousel: [
                  'Our Nike Forward collection – with its ultra-thin, needle-punched layers – is made to do more with less process energy. Meaning smaller carbon footprint, like riding a bike.',
                ]
              },
              {
                title: 'Take the bus to practice',
                text: 'Something about this bus, the cool silence of the electric motor, the people, and trees outside the window, makes this journey the perfect time to ponder your strategy for your next game.',
                textCarousel: [
                  'All Nike operated facilities in North America and Europe are running on 100% renewable energy, like wind and solar farms.',
                ]
              }
            ]
        },
        {
          type: 'question',
          number: '4/4',
          title: 'BEACHCOMBER',
          text: 'You and your team flop on the sand after a great practice on the beach. You sit and watch the gentle waves. A plastic bottle floats to shore. The next words from your mouth are:'
        },
        {
          type: 'scratch',
          title: 'Scratch out your choice',
          squares: [
            {
              id: 2,
              title: 'Time to clean this beach!',
              img: `${process.env.basePath}/images/climate-champion/objects/Planet_Q4_Background.png`,
              imgBack: `${process.env.basePath}/images/logos/MOVE_TO_ZERO.png`
            },
            {
              id: 2,
              title: 'Time we reused our bottles!',
              img: `${process.env.basePath}/images/climate-champion/objects/Planet_Q4_02_Background.png`,
              imgBack: `${process.env.basePath}/images/logos/MOVE_TO_ZERO.png`
            }
          ],
          information: [
            {
              title: 'Time to clean this beach!',
              text: 'With plenty of adrenaline left over from the practice, you jump to your feet, pluck the bottle from the shoreline, and give a rousing speech about recycling that spurs your team to action.',
              textCarousel: [
                'Nike Grind is moving us towards a more circular future by recycling material waste and turning it into new products, playgrounds and running tracks.'
              ]
            },
            {
              title: 'Time we reused our bottles!',
              text: 'You pick up the plastic bottle, and on the walk back across the beach talk to your coach about the possibility of issuing everyone on the team a reusable bottle.',
              textCarousel: [
                'We are diverting 100% of Nike’s manufacturing scraps at our Tier 1 finished goods footwear suppliers from landfills through increased reuse.',
              ]
            }
          ]
      }                                               
    ],
    pause: {
      title: 'Not so quick !',
      text: ['Answer all the questions to advance!']
    },
    complete: {
      praise: {
        title: 'WE DID IT!',
        text: [
          'We did it! Feel lighter somehow? Complete, like a circle?',
          'Goes to show. How these acts of thoughtfulness can come to mean so much.'
        ],
        avatar: avatarImageTwo,
        desktop: {
          bubbleBottom: 50,
          bubbleLeft: 65,
          avatarLeft: -330
        },
        mobile: {
          bubbleBottom: 95,
          bubbleLeft: 67.7,
          bubbleRight: 43,
          avatarLeft: -20,
          avatarWidth: 140
          // flip: true
        },
        tablet: {
          bubbleBottom: 95,
        }
      },
      reward: {
        image: `${process.env.basePath}/images/rewards/2.png`,
        title: 'The earth minder',
        text: 'You believe in the small as well as big actions we can take for the planet we share, and in the people taking them.',
        link: '/reward/climate-champion'
      },
      more: {
        title: 'Want to know more?',
        text: [
          'Discover the B.I.L.L. program from Niketown London',
          'Explore'
        ],
        link: 'https://nike.com'
      },
      continue: {
        title: 'Pick another path?',
        text: 'Don’t go anywhere, there are still plenty of positive choices to be made!',
        next: {
          name: 'Ivy',
          role: 'Active Activist',
          avatarMiniature: `${process.env.basePath}/images/avatars/miniature/ivy.png`,
          link: '/active-activist'
        }
      }
    }
}


export default function Component() {
  // Context
  const context = useContext(store);
  const { state, dispatch } = context;
  
  // Scroll Event Listener

  let scrollListener = () => {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                          html.clientHeight, html.scrollHeight, html.offsetHeight );  

    if(window.scrollY > height - window.innerHeight - 55) {
      document.querySelector('.sidebar').classList.add('lift-sidebar')
    } else {
      document.querySelector('.sidebar').classList.remove('lift-sidebar')
    }         
  }  

  useEffect(() => {
    dispatch({type: "update colour", value: data.colourThree})
    dispatch({type: "update message", value: data.role})
    dispatch({type: "update question count", value: data.questionCount})
    dispatch({type: "update progress", value: 0})
    dispatch({type: "update back link", value: '/pick-your-player'})
    dispatch({type: "update gradient index", value: 2})

    setTimeout(() => {
      document.querySelector('header').classList.remove('hide-header')

      document.querySelector('.sidebar').classList.remove('hide-sidebar')
    }, 250)

    document.addEventListener("scroll", scrollListener)

    return () => {
      document.removeEventListener("scroll", scrollListener)
    }
  }, [])

  return (
    <Layout title={`${data.title} | Nike Impact Report`} content={`${data.title} | Nike Impact Report`}>
      <Head><link rel="preload" href={avatarImageTwo.src} as="image" /></Head>
      <Container>
        <Slices data={data}/>
      </Container>
    </Layout>
  )
}
