import { useEffect, useContext } from "react"
import styled from 'styled-components'

import { store } from "../store"

// Components
import Footer from '../components/footer'
import Layout from '../components/layout'
import Slices from '../components/slices'

// Images
import avatarImage from '../public/images/avatars/character-intro/ivy.png'

const Container = styled.div``

let data = {
    title: 'Climate Champion',
    name: 'Ivy',
    role: 'Climate Champion',
    avatar: avatarImage,
    avatarMiniature: '/images/avatars/miniature/ivy.png',
    colourOne: '#C2BCEB',
    colourTwo: '#F05822',
    colourThree: '#C2BCEB',
    tickerColourOne: 'rgba(194, 188, 235, 0.5)',
    questionCount: 4,
    intro: {
        title: 'TO PROTECT THE PLANET AND THOSE WHO WILL INHERIT IT IS A PROMISE WE CAN MAKE TOGETHER.',
        text: [
          'Oh, hey, I’m Ivy, sorry, I just really care about our big blue ball! There are so many small but significant things that we can do as individuals, families and communities to move the climate dial!'
        ]
    },
    slices: [    
        {
            type: 'question',
            number: '1 / 4',
            title: 'The good buy',
            text: 'You care about your planet but also kind of need a new pair of sneakers.'
        },
        {
            type: 'drag',
            title: 'Drag the shoe into the answer box',
            img: '/images/climate-champion/objects/Planet_Q1.png',
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
                text: 'You’re all about the lighter weight, longer lasting materials. Efficient patterns and smart design decisions. More recycling, less carbon. No extra boxes and needless toe stuffing.',
                textCarousel: [
                  'Our Move To Zero collection helps reduce our overall carbon footprint through environmentally preferred materials.',
                ]
              },
              {
                title: 'Buy it for life',
                text: 'You want this pair to last, so you’re looking for those materials that are durable but lightweight at the same time.',
                textCarousel: [
                  '50% of our key materials are environmentally-preferred. This includes rubber, which is also known for its flexibility and durability.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2 / 4',
            title: 'MOVE TO CIRCULAR',
            text: 'You decide to pare down your wardrobe, but don’t want to add to the landfill. Instead you'
        },
        {
            type: 'tap spam',
            squares: [
              {
                title: 'Recycle your gear',
                img: '/images/climate-champion/objects/Planet_Q2.png'
              },
              {
                title: 'Regift your gear',
                img: '/images/climate-champion/objects/Planet_Q2_02.png'
              }
            ],
            information: [
              {
                title: 'RECYCLE YOUR GEAR',
                text: 'You realise that there are more lucky shirts and shoes here than not, and it’s time to let some of these treasures serve a new purpose. Time to recycle and give something back.',
                textCarousel: [
                  'We clean and donate or recycle your used athletic gear to make sure it lives on, even when you’re done wearing it.',
                ]
              },
              {
                title: 'Regift your gear',
                text: 'You forgot you had these sneakers. You loved them like some people love their cat. Your sister was jealous. Hey, it’s her birthday coming up. You decide to repair and regift.',
                textCarousel: [
                  'B.I.L.L. (Bot Initiated Longevity Lab) is a robot-augmented system that cleans and repairs shoes. An inspiration to us all to think twice before throwing our treasures in the trash!'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3 / 4',
            title: 'FRESH WHEELS',
            text: 'You wake up early on Saturday for soccer practice. You open the curtains, and the sky has never looked so blue. You see at the car in the driveway and decide to make a change.'
        },  
        {
            type: 'like',
            title: 'Answer with a like',
            squares: [
              {
                title: 'Ride your bike to practice',
                img: '/images/climate-champion/objects/Planet_Q2.png'
              },
              {
                title: 'Take the bus to practice',
                img: '/images/climate-champion/objects/Planet_Q2_02.png'
              }
            ],
            information: [
              {
                title: 'Ride your bike to practice',
                text: 'You dig your bike out of the garage and set off. The warm breeze in your face brings a smile, and by the time you arrive at practice you’ve had the perfect warm-up!',
                textCarousel: [
                  'Our Nike Forward collection – with its ultra-thin, needle-punched fabrics – is made to do more with less process energy. Meaning less emissions.',
                ]
              },
              {
                title: 'Take the bus to practice',
                text: 'Something about this bus, the cool silence of the electric motor, the people and trees outside the window, makes this journey the perfect time to ponder your strategy for today’s game.',
                textCarousel: [
                  'All Nike operated facilities in North America and Europe are running on 100% renewable energy, like wind and solar farms.',
                ]
              }
            ]
        },
        {
          type: 'question',
          number: '4 / 4',
          title: 'BEACHCOMBER',
          text: 'You and your team flop on the sand after a great practice on the beach. You sit and watch the gentle waves. A plastic bottle floats to shore. The next words from your mouth are:'
        },
        {
          type: 'scratch',
          title: 'Scratch out your choice',
          squares: [
            {
              title: 'Time to clean this beach!',
              img: '/images/climate-champion/objects/Planet_Q4_Background.png',
              imgBack: '/images/logos/nike logo.svg'
            },
            {
              title: 'Time we reused our bottles!',
              img: '/images/climate-champion/objects/Planet_Q4_02_Background.png',
              imgBack: '/images/logos/nike logo.svg'
            }
          ],
          information: [
            {
              title: 'Time to clean this beach!',
              text: 'With plenty of adrenaline left over from the game, you jump to your feet, pluck the bottle from the shoreline and give a rousing speech about recycling that spurs your team to action.',
              textCarousel: [
                'Nike Grind is moving us towards a more circular future by turning waste products into playgrounds and running tracks.'
              ]
            },
            {
              title: 'Time we reused our bottles!',
              text: 'You pick up the plastic bottle, and on the walk back across the beach talk to your coach about the possibility of issuing everyone on the team with a reusable bottle.',
              textCarousel: [
                'We are diverting 100% of Nike’s manufacturing scraps at our Tier 1 finished goods footwear suppliers from landfills through increased recycling and reuse.',
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
        text: ['We safeguarded the world for those that will inherit it! Feel lighter somehow? Complete, like a circle?  That’s all us! Well all you, actually. Goes to show. How these small acts of thoughtfulness can come to mean so much. Go altruism!']
      },
      reward: {
        image: '/images/rewards/2.png',
        text: 'Congratulations, you are a wise and inclusive'
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
        title: 'Fancy another round?',
        text: 'Don’t go anywhere, there are still decisions to be made.',
        next: {
          name: 'Theo',
          role: 'Active Activist',
          avatarMiniature: '/images/avatars/miniature/theo.png',
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

    if(window.innerWidth > 990) {
      document.addEventListener("scroll", scrollListener)
    }

    return () => {
      document.removeEventListener("scroll", scrollListener)
    }
  }, [])

  return (
    <Layout title={`${data.title} | Nike Impact Report`} content={`${data.title} | Nike Impact Report`}>
      <Container>
        <Slices data={data}/>
        <Footer />
      </Container>
    </Layout>
  )
}
