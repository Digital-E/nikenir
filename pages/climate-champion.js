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
    questionCount: 4,
    intro: {
        title: 'TO PROTECT THE PLANET AND THOSE WHO WILL INHERIT IT IS A PROMISE WE CAN MAKE TOGETHER.',
        text: [
          'Oh, hey, I’m Ivy, sorry, I just really care about our planet! For me it’s not always about the big solutions.'
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
                text: 'You’re all about the lighter weight, higher yield materials. Efficient patterns and reduced defects. More recycling, less carbon. No more boxes and needless toe stuffing.',
                textCarousel: [
                  'Our Nike Forward collection has a reduced carbon footprint of 75% compared to other ranges.',
                ]
              },
              {
                title: 'Buy it for life',
                text: 'You want this pair to last, so you’re looking for those materials that are durable but lightweight at the same time.',
                textCarousel: [
                  '50% of our key materials are environmentally-preferred (e.g. cotton, leather and rubber).'
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
                img: '/images/tap-spam/ivy/vest.png'
              },
              {
                title: 'Regift your gear',
                img: '/images/tap-spam/ivy/donut.png'
              }
            ],
            information: [
              {
                title: 'RECYCLE YOUR GEAR',
                text: 'Your sneaker collection was your pride and joy. But today you feel different: all these shoes, just gathering dust. Time to recycle and give something back.',
                textCarousel: [
                  'Your sneaker collection was your pride and joy. But today you feel different: all these shoes, just gathering dust. Time to recycle and give something back.',
                ]
              },
              {
                title: 'Regift your gear',
                text: 'You forgot you had these sneakers. You loved them like some people love their cat. Your sister was jealous. Hey, it’s her birthday coming up. You decide to repair and regift.',
                textCarousel: [
                  'Nike Town London’s B.I.L.L. (Bot Initiated Longevity Lab) is a robot-augmented system that cleans and repairs shoes.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3 / 4',
            title: 'MINDFUL OVER MATTER',
            text: 'You hover over the ‘Buy’ button, your new running shorts just a click away. Something in the description makes the decision for you.'
        },  
        {
            type: 'tap spam',
            title: 'Tap spam to make your choice',
            squares: [
              {
                title: 'Renewable Energy',
                img: '/images/tap-spam/ivy/turbine.png'
              },
              {
                title: 'Reduced emissions',
                img: '/images/tap-spam/ivy/wheel.png'
              }
            ],
            information: [
              {
                title: 'Renewable Energy',
                text: 'It’s the idea of circularity that makes you go for it. Just picturing that off-shore wind farm puts a smile on your face.',
                textCarousel: [
                  'All Nike operated facilities in North America and Europe are running on 100% renewable energy, like wind and solar farms. ',
                ]
              },
              {
                title: 'Maximise your potential',
                text: 'It’s the knowledge that this purchase is having a positive versus negative impact on the environment that makes it feel worthwhile.',
                textCarousel: [
                  'We’ve reduced 183 metric tons of emissions with environmentally conscious materials.',
                ]
              }
            ]
        },
      //   {
      //     type: 'question',
      //     number: '4 / 4',
      //     title: 'THIS IS YOUR TIME',
      //     text: 'You’ve been thinking about your future, but it’s hard because people that look like you aren’t always represented in the worlds of work you’re interested in. Something gives you hope…'
      //   },
      //   {
      //     type: 'scratch',
      //     title: 'Scratch out the choice you don’t want',
      //     squares: [
      //       {
      //         title: 'You see a place where you fit in',
      //         img: '/images/scratch/1-yellow.png',
      //         imgBack: '/images/scratch/1.png'
      //       },
      //       {
      //         title: 'You see a life that you aspire to',
      //         img: '/images/scratch/1-yellow.png',
      //         imgBack: '/images/scratch/1.png'
      //       }
      //     ],
      //     information: [
      //       {
      //         title: 'You see a place where you fit in',
      //         text: 'A visit to your sister at college fills you with optimism. You’re surrounded by people just like you expanding their horizons and defining their place in the world.',
      //         textCarousel: [
      //           'We continue to support of Historically Black Colleges and Universities (HBCUs) and Hispanic-Serving Institutions (HSIs) – through storytelling, recruitment, and investments.'
      //         ]
      //       },
      //       {
      //         title: 'You see a life that you aspire to',
      //         text: 'You’re looking for a sport that rewards your ambition with the progression you deserve. You want to be judged on what you bring, not who you are.',
      //         textCarousel: [
      //           'We’re accelerating the career trajectory of women in the workplace by investing in programs that increase a sense of belonging.',
      //         ]
      //       }
      //     ]
      // }                                               
    ],
    pause: {
      title: 'Not so quick !',
      text: ['Answer all the questions to advance!']
    },
    complete: {
      praise: {
        title: 'WE DID IT!',
        text: ['We safeguarded the world for those that will inherit it! Feel lighter somehow? Complete, like a circle?  Bouncy, like a rubber ball?']
      },
      reward: {
        image: '/images/rewards/Asset 1 7.png',
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
