import { useEffect, useContext } from "react"
import styled from 'styled-components'

import { store } from "../store"

// Components
import Footer from '../components/footer'
import Layout from '../components/layout'
import Slices from '../components/slices'



const Container = styled.div``

let data = {
    title: 'Active Activist',
    name: 'Theo',
    role: 'Active Activist',
    avatar: '/images/avatars/character-intro/theo.png',
    avatarMiniature: '/images/avatars/miniature/theo.png',
    colourOne: '#A2D8EF',
    colourTwo: '#F05822',
    colourThree: '#0584FE',
    questionCount: 4,
    intro: {
        title: 'EVERYONE SHOULD EXPERIENCE THE JOY OF MOVEMENT. GIRLS INCLUDED.',
        text: [
          'The decisions we take now can make a future where everyone belongs.'
        ]
    },
    slices: [    
        {
            type: 'question',
            number: '1 / 4',
            title: 'The good buy',
            text: 'You never thought of yourself as into sports. But a friend had you join her one time and something made you want to come back'
        },
        {
            type: 'like',
            squares: [
              {
                title: 'The simple joy of play'
              },
              {
                title: 'Being part of a team'
              }
            ],
            information: [
              {
                title: 'The simple joy of play',
                text: 'At first the thought of all the running and jumping made you sad. But by the time the game was over, you never felt happier.',
                textCarousel: [
                  'Play fights against the chemicals released when young people face excessive stress in their lives. Last year, Nike helped more than 375K girls to find joy in movement.',
                ]
              },
              {
                title: 'Being part of a team',
                text: 'Before, the thought of ‘team spirit’ made you cringe, but before you knew it these people were like a second family.',
                textCarousel: [
                  'Play fights against the chemicals released when young people face excessive stress in their lives. Last year, Nike helped more than 375K girls to find joy in movement.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2 / 4',
            title: 'Win win',
            text: 'Time to pick a new roller derby team. You wonder if there’s a winning formula. Is this about team spirit or team balance?'
        },
        {
            type: 'drag',
            title: 'Drag the roller-skate into a box',
            squares: [
              {
                title: 'FIND STRENGTH IN TOGETHERNESS'
              },
              {
                title: 'FIND BALANCE IN OUR DIFFERENCES'
              }
            ],
            information: [
              {
                title: 'FIND STRENGTH IN TOGETHERNESS',
                text: 'You want to be part of a team where you feel you can make a difference. Where everyone is counted and accountable.',
                textCarousel: [
                  'We’re accelerating the career trajectory of women in the workplace by investing in programs that increase a sense of belonging.',
                ]
              },
              {
                title: 'FIND BALANCE IN OUR DIFFERENCES',
                text: 'A diverse team means news ideas, fresh plays and great balance. Our combined skills will give us the edge.',
                textCarousel: [
                  'We’re building more diverse teams, check out our Serena Williams Design Crew program.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3 / 4',
            title: 'All about progress',
            text: 'You love the teamwork of volleyball and the pure purpose of tennis. But it’s time to choose where to put more of your time and energy. Will you...'
        },  
        {
            type: 'tap spam',
            title: 'Tap spam to make your choice',
            squares: [
              {
                title: 'Be part of something bigger',
                img: '/images/tap-spam/Bag_01.png'
              },
              {
                title: 'Maximise your potential',
                img: '/images/tap-spam/Bottle_01 2.png'
              }
            ],
            information: [
              {
                title: 'Be part of something bigger',
                text: 'You’re looking for a workplace where you feel you can make a difference. Where everyone is counted and accountable.',
                textCarousel: [
                  'We continue to support of Historically Black Colleges and Universities (HBCUs) and Hispanic-Serving Institutions (HSIs) – through storytelling, recruitment, and investments.',
                ]
              },
              {
                title: 'Maximise your potential',
                text: 'You’re looking for a sport that rewards your ambition with the progression you deserve. You want to be judged on what you bring, not who you are.',
                textCarousel: [
                  'We’re committed to reaching 50% representation of women in leadership positions. Since last year, we’ve increased the number of women at the Director level to 43%.',
                ]
              }
            ]
        },
        {
          type: 'question',
          number: '4 / 4',
          title: 'THIS IS YOUR TIME',
          text: 'You’ve been thinking about your future, but it’s hard because people that look like you aren’t always represented in the worlds of work you’re interested in. Something gives you hope…'
        },
        {
          type: 'scratch',
          title: 'Scratch out the choice you don’t want',
          squares: [
            {
              title: 'You see a place where you fit in',
              img: '/images/scratch/1-yellow.png',
              imgBack: '/images/scratch/1.png'
            },
            {
              title: 'You see a life that you aspire to',
              img: '/images/scratch/1-yellow.png',
              imgBack: '/images/scratch/1.png'
            }
          ],
          information: [
            {
              title: 'You see a place where you fit in',
              text: 'A visit to your sister at college fills you with optimism. You’re surrounded by people just like you expanding their horizons and defining their place in the world.',
              textCarousel: [
                'We continue to support of Historically Black Colleges and Universities (HBCUs) and Hispanic-Serving Institutions (HSIs) – through storytelling, recruitment, and investments.'
              ]
            },
            {
              title: 'You see a life that you aspire to',
              text: 'You’re looking for a sport that rewards your ambition with the progression you deserve. You want to be judged on what you bring, not who you are.',
              textCarousel: [
                'We’re accelerating the career trajectory of women in the workplace by investing in programs that increase a sense of belonging.',
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
        text: ['We safeguarded the world for those that will inherit it! Feel lighter somehow? Complete, like a circle? Bouncy, like a rubber ball?']
      },
      reward: {
        image: '/images/rewards/Asset 1 7.png',
        text: 'Congratulations, you are a wise and inclusive'
      },
      more: {
        title: 'Want to know more?',
        text: [
          'Discover the B.I.L.L. programfrom Niketown London',
          'Explore'
        ],
        link: 'https://nike.com'
      },
      continue: {
        title: 'Fancy another round?',
        text: 'Don’t go anywhere, there are still decisions to be made.',
        next: {
          name: 'Ines',
          role: 'People Promoter',
          avatarMiniature: '/images/avatars/miniature/ines.png',
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
    dispatch({type: "update gradient index", value: 3})

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
