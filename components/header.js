import { useState, useRef } from "react"
import styled from "styled-components"


let Container = styled.header`
  position: fixed;
  width: calc(50vw - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  z-index: 9999;
  bottom: 20px;
  left: 20px;
  pointer-events: none;
  transform: translateY(0);
  transition: transform 0.5s;
  box-sizing: border-box;

  @media(max-width: 989px) {
    width: calc(100vw - 30px);
    left: 15px;
    bottom: 15px;
  }

  @media(min-width: 1800px) {
    left: calc((100vw - 1800px) / 2 + 20px);
    width: calc(1800px / 2 - 60px);
  }

  &.hide-header {
    transform: translateY(100%);
  }

  .p {
   margin: 0;
  }

  .nav-mobile-burger {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 60px;
    min-width: 60px;
    z-index: 1;
    cursor: pointer;
    border-left: 1px solid black;
  }

  @media(min-width: 990px) {
    .nav-mobile-burger:hover, &.nav--open .nav-mobile-burger {
      background: black;
    }
  }

  @media(min-width: 990px) {
    .nav-mobile-burger:hover > div > div, &.nav--open .nav-mobile-burger > div > div {
      background-color: var(--secondary-color);
    }
  }

  @media(max-width: 989px) {
    &.nav--open .nav-mobile-burger {
      background: black;
    }

    &.nav--open .nav-mobile-burger > div > div {
      background-color: var(--secondary-color);
    }
  }

  .nav-mobile-burger > div {
    transition: transform 0.3s;
  }

  .nav-mobile-burger > div > div {
      height: 8px;
      width: 8px;
      min-height: 8px;
      min-width: 8px;
      border-radius: 999px;
      background-color: black;
      margin: 3px;
  }

  &.nav--open .nav-mobile-burger > div {
    transform: rotateZ(90deg);
    transform-origin: center center;
    transition: transform 0.3s;
  }

  &.nav--open .nav-mobile-burger > div:nth-child(3) {
      display: none;
  }

  &.nav--open .nav-bar {
    border-top: 1px solid black;
  }

  .menu-list {
    transition: transform 0.5s;
    transform: translateY(100%);
  }

  &.nav--open .menu-list {
    transition: transform 0.5s;
    transform: translateY(0);
  }
`

let NavBar = styled.div`
  display: flex;
  width: 100%;
  z-index: 2;
  // box-sizing: border-box;
  pointer-events: all;
  height: 60px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  > a {
    width: 100%;
  }

  .button {
    z-index: 1;
  }
`


const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  background: black;
  z-index: 1;
  cursor: pointer;

  img {
    height: 45px;
  }
`


let List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;

  width: 100%;
  display: flex;
  justify-content: flex-start;
`

let ListItem = styled.li`
  pointer-events: all;
  
  a {
    width: fit-content;
  }

  .h2 {
    margin: 0;
  }

  > div {
    width: fit-content;
  }

  * {
    color: black;
  }

  @media(min-width: 990px) {
    *:hover {
      color: var(--ternary-color);
      text-decoration: none;
    }
  } 

  .is-active a {
    color: var(--ternary-color);
  }

  @media(max-width: 989px) {
    margin-bottom: 5px;

    .h2 {
      line-height: 1;
    }

    a {
      font-size: 36px;
    }
  }
`

let Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  padding: 20px 0 5px 0;
  order: -1;
  pointer-events: all;

  @media(max-width: 989px) {
    padding: 35px 15px 30px 0;
  }
`
const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;

    &&.show-overlay {
        opacity: 1;
        transition: opacity ease-in-out 0.3s 0s, transform linear 0s 0s;  
        transform: translateX(0);
    }

    &&.hide-overlay {
        opacity: 0;
        transition: opacity ease-in-out 0.3s, transform linear 0s 0.3s;
        transform: translateX(-100%);
    }
`



export default function Header({ data, isLegalPage }) {
  let [menuOpen, setMenuOpen] = useState(false);
  let headerRef = useRef();


  let scrollToTop = () => {
    gsap.to(window, {duration: 2, ease: 'power3.inOut', scrollTo: {y: 0, offsetY: 20} });
  }

  return (
    <>
    <Overlay onClick={() => setMenuOpen(false)} className={menuOpen ? 'show-overlay' : 'hide-overlay'}/>
    <Container className={menuOpen ? "nav--open" : ""} ref={headerRef}>
      <NavBar className="nav-bar">
        <Logo onClick={() => {setMenuOpen(false); scrollToTop()}}>
            <img src='images/logo-d.svg' />
        </Logo>
        {
          !isLegalPage ?
          <Link href='#declare-emergency-now'>
            <Button>
                DECLARE NOW
            </Button>
          </Link>
          :
          <Link href='/'>
            <Button>
                <svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 9.5H29.5" stroke="black" stroke-width="2"/>
                <path d="M8.5 1L2 9.5L8.5 18" stroke="black" stroke-width="2"/>
                </svg>              
                BACK TO WEBSITE
            </Button>
          </Link>                    
        }
        {
          !isLegalPage ?
          <div class="nav-mobile-burger bg-color" onClick={() => setMenuOpen(!menuOpen)}>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          :
          null      
        }
      </NavBar>
      <Menu className={menuOpen ? "menu-list nav--open bg-color" : "menu-list bg-color"}>
        <List ref={listRef}>
          {
          data.links.map((item, index) => {
            return <ListItem key={item._id}><div className="h2 nav-list-item" data-anchor={item.linkURL}><Link href={item.linkURL}>{item.linkLabel}</Link></div></ListItem>
          })
          }
        </List>
      </Menu>
    </Container>
    </>
  )
}
