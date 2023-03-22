import { useEffect, useContext } from "react"
import Head from 'next/head'
import styled from 'styled-components'

import { store } from "../store"

// Components
import Layout from '../components/layout'
import Slices from '../components/slices'

// Images
import avatarImage from '../public/images/avatars/carousel/ivy/ivy-0.png'
import avatarImageTwo from '../public/images/avatars/praise/ivy.png'

const Container = styled.div``

let data = {
    title: 'Active Activist',
    name: 'Ivy',
    role: 'Active Activist',
    avatar: avatarImage,
    avatarMiniature: `${process.env.basePath}/images/avatars/miniature/ivy.png`,
    colourOne: '#A2D8EF',
    colourTwo: '#F05822',
    colourThree: '#A2D8EF',
    tickerColourOne: 'rgba(62, 216, 239, 0.5)',
    questionCount: 4,
    intro: {
        title: 'EVERYONE SHOULD EXPERIENCE THE JOY OF MOVEMENT. GIRLS INCLUDED.',
        text: [
          'Oh, hey, I’m Ivy, sorry, I just really care about our big blue ball!',
          'There are so many small but significant things that we can do as individuals, families and communities to move the climate dial!'
        ],
        desktop: {
          bubbleBottom: 33,
          bubbleLeft: 18.5,
          avatarWidth: 29
        },
        mobile: {
          bubbleBottom: 123,
          bubbleLeft: 35,
          avatarWidth: 110,
          avatarLeft: -30,
          avatarBottom: 0
        }
    },
    slices: [    
        {
            type: 'question',
            number: '1 / 4',
            title: 'MOVE AS ONE',
            text: 'You never thought of yourself as into sports. But a friend had you join her one time and something made you want to come back'
        },
        {
            type: 'drag',
            title: 'Drag the ball into a box',
            img: `${process.env.basePath}/images/active-activist/objects/Play_Q1.png`,
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
                text: 'At first even the thought of all the running and jumping made you tired. But by the time the game was over, you never felt more energized!',
                textCarousel: [
                  'Play fights against the chemicals released when young people face excessive stress in their lives.',
                ]
              },
              {
                title: 'Being part of a team',
                text: 'Before, the thought of ‘team spirit’ made you cringe, but before you knew it these people were like a second family.',
                textCarousel: [
                  'Through Made to Play, we’re investing in inclusive play and sport-based programs that break barriers, expand opportunities and build a strong community for girls. Last year, Nike helped more than 375K girls to find joy in movement.'
                ]
              }
            ]
        },
        {
            type: 'question',
            number: '2 / 4',
            title: 'SEEN AND HEARD',
            text: 'You were always interested in sport and an active lifestyle, but until now, it’s never felt set up for someone with your background. Today you saw something that gave you courage…'
        },
        {
            type: 'tap spam',
            title: 'Drag the roller-skate into a box',
            squares: [
              {
                title: 'Sport sees me',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q2.png`,
              },
              {
                title: 'Sport hears me',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q2_02.png`,
              }
            ],
            information: [
              {
                title: 'Sport sees me',
                text: 'You see one of your classmates wearing an item of sports gear you didn’t even know existed. Right away it makes you feel less on the outside, looking in. You sign up for try-outs.',
                textCarousel: [
                  'We provide our non-profit partners with sportswear – like sports bras and hijabs – …',
                ]
              },
              {
                title: 'Sport hears me',
                text: 'You’re hearing stories of people like you feeling like they belong, not just by being part of a team, but because they have people who really listen.',
                textCarousel: [
                  'The number one influence in a kid’s sport experience is their coach. Positive role models can welcome more kids into play. + resources like ‘how to coach kids’ and ‘coaching girls guide’.'
                ]
              }
            ]
        },   
        {
            type: 'question',
            number: '3 / 4',
            title: 'THANKS TO SPORT',
            text: 'You decide it’s time to give something back to your community, make yourself useful somehow. Something sports related because…'
        },  
        {
            type: 'like',
            title: 'Answer with a like',
            heartImg: `${process.env.basePath}/images/like/heart-fill-ivy.png`,
            squares: [
              {
                title: 'My coach is my rock',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q3.png`
              },
              {
                title: 'Sport is what drives me',
                img: `${process.env.basePath}/images/active-activist/objects/Play_Q3_01.png`
              }
            ],
            information: [
              {
                title: 'My coach is my rock',
                text: 'You want to give someone else the same time and space your coach gave you. The confidence you gained from being really seen and heard still carries you to this day.',
                textCarousel: [
                  'We’re investing in helping coaches (9K of them last year) become game-changing mentors to kids, both on and off the field.',
                ]
              },
              {
                title: 'Sport is what drives me',
                text: 'The joy of movement, the sense of belonging, and of shared purpose. Sport was always the brightest star in your sky.',
                textCarousel: [
                  'Play builds confidence and problem-solving skills in girls. Proof: 94% of women at the Nike C-suite played a sport growing up.',
                ]
              }
            ]
        },
        {
          type: 'question',
          number: '4 / 4',
          title: 'MOVE TO HERO',
          text: 'You didn’t think you’d ever last more than a minute playing sports. But a year on from joining the team it’s become such an important part of your life. And that’s because:'
        },
        {
          type: 'scratch',
          title: 'Scratch out your choice',
          squares: [
            {
              title: 'Sport gives you purpose',
              img: `${process.env.basePath}/images/active-activist/objects/Play_Q4_background.png`,
              imgBack: `${process.env.basePath}/images/logos/nike logo.svg`
            },
            {
              title: 'Sport gives you confidence',
              img: `${process.env.basePath}/images/active-activist/objects/Play_Q4_background.png`,
              imgBack: `${process.env.basePath}/images/logos/nike logo.svg`
            }
          ],
          information: [
            {
              title: 'Sport gives you purpose',
              text: 'Structure. That’s the word you’ve heard your coach use but it’s true: sport is your every day. It’s your social life. It’s what you think about when you wake up and dream about at night.',
              textCarousel: [
                'We support organisations like Legacy Volleyball Club, which brings young female athletes – particularly girls of colour – into sport, providing year-round programming.'
              ]
            },
            {
              title: 'Sport gives you confidence',
              text: 'Confidence. That’s what I feel when I’m out there with my friends, and I’m doing what I’m doing and they’re doing their thing and together we can do anything!',
              textCarousel: [
                'Grow Our Game is about empowering young girls to become fierce, formidable leaders through passion, teamwork and sisterhood – all while learning the art of basketball.',
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
        text: ['We did it! We made the world a fairer place!',
        'Feel that fresh air in your lungs? That new-found confidence? The satisfaction of giving back to the community?',
        'That’s all us! Well all you, really.',
        'Goes to show. These personal choices can wind up meaning so much for future generations. Go empathy!'
      ],
      avatar: avatarImageTwo,
      desktop: {
        bubbleBottom: 45,
        bubbleLeft: 60,
        avatarLeft: -250
      },
      mobile: {
        bubbleBottom: 60,
        bubbleLeft: 63,
        avatarLeft: -35
      }
      },
      reward: {
        image: `${process.env.basePath}/images/rewards/3.png`,
        title: 'The move maker',
        text: 'You believe in the power of play to raise young people’s spirits and make them feel part of something bigger',
        link: '/reward/active-activist'
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
          avatarMiniature: `${process.env.basePath}/images/avatars/miniature/ines.png`,
          link: '/people-promoter'
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
