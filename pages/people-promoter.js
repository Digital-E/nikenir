import { useEffect, useContext } from "react"
import Head from 'next/head'
import styled from 'styled-components'

import { store } from "../store"

// Components
import Layout from '../components/layout'
import Slices from '../components/slices'

// Images
import avatarImage from '../public/images/avatars/carousel/ines/ines-0.png'
import avatarImageTwo from '../public/images/avatars/praise/ines.png'

const Container = styled.div``

let data = {
    title: 'People Promoter',
    name: 'Ines',
    role: 'People Promoter',
    avatar: avatarImage,
    avatarMiniature: `${process.env.basePath}/images/avatars/miniature/ines.png`,
    colourOne: '#FFB800',
    colourTwo: '#F05822',
    colourThree: '#FFB800',
    tickerColourOne: 'rgba(255, 184, 0, 0.5)',
    questionCount: 4,
    intro: {
        title: 'A CREATIVE AND HARMONIOUS SOCIETY IS ONE THAT IS DIVERSE AND INCLUSIVE.',
        text: [
          'The choices we make now can help shape a fairer society.',
          'Hi, I’m Ines, and I genuinely believe that if we can each think of ourselves as part of a greater whole, fewer people are going to feel left out!',
          'In fact, how about we make some positive choices right now? Let’s imagine three scenarios. Then you decide what you would do in each case.',
          'Don’t worry, there are no wrong answers. Only progress!'
        ],
        desktop: {
          // bubbleBottom: 29,
          // bubbleLeft: 16,
          bubbleBottom: 85,
          bubbleLeft: 65,
          avatarWidth: 24,
          avatarHeight: 70,
          avatarBottom: 50
        },
        mobile: {
          bubbleBottom: 75,
          bubbleLeft: 25,
          avatarWidth: 70,
          avatarLeft: -30,
          avatarBottom: -5,
        }
    },
    slices: [    
        {
            type: 'question',
            number: '1/4',
            title: 'Walk and talk',
            text: 'You feel a little lost in your feelings. Isolated, even. You want to feel connected to the world again, find a way back to being yourself. Do you…'
        },
        {
            type: 'tap spam',
            title: 'Tap spam to make your choice',
            heartImg: `${process.env.basePath}/images/like/heart-fill-ines.png`,
            squares: [
              {
                title: 'Walk it out',
                img: `${process.env.basePath}/images/people-promoter/objects/People_Q1.png`
              },
              {
                title: 'Talk it out',
                img: `${process.env.basePath}/images/people-promoter/objects/People_Q1_02.png`
              }
            ],
            information: [
              {
                title: 'Walk it out',
                text: 'Nothing like stepping out into the fresh air, noticing the birds in the trees and the ground under your feet.',
                textCarousel: [
                  'We encourage our employees all around the world to practice sport and movement as a way of maintaining their well-being.',
                ]
              },
              {
                title: 'Talk it out',
                text: 'Knowing there are other people out there facing similar struggles helps you feel more in control.',
                textCarousel: [
                  'We’re investing in our employees’ ongoing wellbeing by providing mental health support, for themselves and their families. In doing so we want to help redefine traditional American workplace benefits.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2/4',
            title: 'Win win',
            text: 'Time to pick a new roller derby team. You wonder if there’s a winning formula. Is this about team spirit or team balance?'
        },
        {
            type: 'drag',
            title: 'Drag the roller-skate into the box',
            img: `${process.env.basePath}/images/people-promoter/objects/People_Q2.png`,
            squares: [
              {
                title: 'FIND STRENGTH IN TOGETHERNESS',
              },
              {
                title: 'FIND BALANCE IN OUR DIFFERENCES',
              }
            ],
            information: [
              {
                title: 'FIND STRENGTH IN TOGETHERNESS',
                text: 'A team where everyone feels included, is a team that could make anything happen. That sense of belonging will help us dream and move as one.',
                textCarousel: [
                  'We’re working to break down barriers so everyone has the chance to be the best they can be. Our Employee Resource Groups – through which teammates gather and connect around identity – strengthens our commitment to inclusion goals.',
                ]
              },
              {
                title: 'FIND BALANCE IN OUR DIFFERENCES',
                text: 'A diverse team means new ideas, fresh plays, and great balance. Our combined skills will give us the edge.',
                textCarousel: [
                  'Through inclusive hiring practices we’re building more diverse teams, which is leading to break through design and innovation. Check out our Serena Williams Design Crew program, for example.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3/4',
            title: 'All about progress',
            text: 'You love the teamwork of volleyball and the pure focus of tennis. But it’s time to choose where to put more of your time and energy. Will you...'
        },  
        {
            type: 'tap spam',
            title: 'Tap spam to make your choice',
            squares: [
              {
                title: 'Be part of something bigger',
                img: `${process.env.basePath}/images/people-promoter/objects/People_Q3_Object_01.png`
              },
              {
                title: 'Maximise your potential',
                img: `${process.env.basePath}/images/people-promoter/objects/People_Q3_Object_02.png`
              }
            ],
            information: [
              {
                title: 'Be part of something bigger',
                text: 'You want to be part of a team where you feel you can make a difference. Where everyone is counted and accountable.',
                textCarousel: [
                  'We’re accelerating the career trajectory of women in the workplace – check out our WIN and Valari Fellowship programs, for example.',
                ]
              },
              {
                title: 'Maximise your potential',
                text: 'You’re looking for a sport that rewards your ambition with the progression you deserve. You want to be judged on what you bring to the table, not where you sit.',
                textCarousel: [
                  'We have a target of reaching 50% representation of women globally in leadership positions. Since last year, we’ve increased the number of women in our corporate teams – at the director level and above – to 43%.',
                ]
              }
            ]
        },
        {
          type: 'question',
          number: '4/4',
          title: 'THIS IS YOUR TIME',
          text: 'You’ve been thinking about your future, but it’s hard because people that look like you aren’t always represented in the worlds of work you’re interested in. Something gives you hope…'
        },
        {
          type: 'drag',
          title: 'Drag the medal into the box',
          img: `${process.env.basePath}/images/people-promoter/objects/People_Q4.png`,
          squares: [
            {
              title: 'You see a place where you fit in',
              img: `${process.env.basePath}/images/people-promoter/objects/People_Q4_background.png`,
              imgBack: `${process.env.basePath}/images/logos/MOVE_TO_ZERO.png`
            },
            {
              title: 'You see a life that you aspire to',
              img: `${process.env.basePath}/images/people-promoter/objects/People_Q4_background.png`,
              imgBack: `${process.env.basePath}/images/logos/MOVE_TO_ZERO.png`
            }
          ],
          information: [
            {
              title: 'You see a place where you fit in',
              text: 'A visit to your sister at college fills you with optimism. You’re surrounded by people just like you, expanding their horizons and defining their place in the world.',
              textCarousel: [
                'n the US we continue our support of Historically Black Colleges and Universities (HBCUs) and Hispanic-Serving Institutions (HSIs) – through storytelling, recruitment, and financial investments.'
              ]
            },
            {
              title: 'You see a life that you aspire to',
              text: 'While searching for a new pair of sneakers you get sidetracked watching a bunch of inspiring videos of people from your community telling the story of how they pursued their dream.',
              textCarousel: [
                'ike, Converse, Jordan Brand and Michael Jordan have committed a combined $140 million over 10 years to invest in and support organizations focused on economic empowerment, education, and social justice to address racial inequality for Black Americans.',
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
        text: ['We did it! Feel that spring in your step? That warm glow of belonging?',
              'Goes to show. These personal choices can wind up meaning so much for the bigger picture.'
            ],
        avatar: avatarImageTwo,
        desktop: {
          bubbleBottom: 70,
          bubbleLeft: 50,
          avatarLeft: -210
        },
        mobile: {
          bubbleBottom: 95,
          bubbleLeft: 67.7,
          bubbleRight: 43,
          avatarLeft: -20,
          avatarWidth: 140
        },
        tablet: {
          bubbleBottom: 95,
        }
      },
      reward: {
        image: `${process.env.basePath}/images/rewards/1.png`,
        title: 'The people person',
        text: 'You believe that we’re all in this together, that if we can just keep listening and learning from one another, no one will feel left out.',
        link: '/reward/people-promoter'
      },
      more: {
        title: 'Want to know more?',
        text: [
          'Explore the Serena Williams Design Crew',
          'Explore',
          'Explore the Serena Williams Design Crew',
          'Explore ',
        ],
        link: 'https://nike.com'
      },
      continue: {
        title: 'Pick another path?',
        text: 'Don’t go anywhere, there are still plenty of positive choices to be made!',
        next: {
          name: 'Theo',
          role: 'Climate Champion',
          avatarMiniature: `${process.env.basePath}/images/avatars/miniature/theo.png`,
          link: '/climate-champion'
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
    dispatch({type: "update gradient index", value: 1})

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
