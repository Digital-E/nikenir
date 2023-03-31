import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'

import { store } from '../store'


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
	  background: white;
    z-index: -1;

    #canvas {
        filter: blur(100px);
        transform: translate3d(0, 0, 0);
    }

    svg {
        position: absolute;
    }
`


const Noise = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    // background-image: url(data:image/png;base64,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);
    opacity: 1;
    // background: url(https://grainy-gradients.vercel.app/noise.svg);
    background: url(#noiseFilter);
    mix-blend-mode: multiply;
    // mix-blend-mode: hard-light;
    // mix-blend-mode: plus-lighter;
    z-index: 9;
    filter: contrast(100%) brightness(100%);
    // isolation: isolate;
`


export default function Component({ data }) {
    // Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let containerRef = useRef();
    let allCircles = useRef([]);
    let [colours, setColours] = useState(data[0])

    useEffect(() => {
      let copyAllCircles = allCircles.current
      copyAllCircles.forEach((item, index) => item.colour = data[state.gradientIndex][index].color)
    }, [state.gradientIndex])

    
    useEffect(() => {
        let canvas = document.getElementById("canvas");

        resize();

        function resize() {
            // canvas.width = window.innerWidth * window.devicePixelRatio
            // canvas.height = window.innerHeight * window.devicePixelRatio

            canvas.width = innerWidth;
            canvas.height = innerHeight;
            canvas.style.width = window.innerWidth + 'px'
            canvas.style.height = window.innerHeight + 'px'
        }
        
        window.onresize = resize;
        
        let ctx = canvas.getContext("2d");

        function noise(ctx) {
    
            const w = ctx.canvas.width,
                        h = ctx.canvas.height,
                        iData = ctx.createImageData(w, h),
                        buffer32 = new Uint32Array(iData.data.buffer),
                        len = buffer32.length
              let i = 0
        
            for(; i < len;i++)
                
                if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
        
                ctx.putImageData(iData, 0, 0);
        }
        
        function Vector2D(x, y) {
          this.x = x;
          this.y = y;
        }
        
        function Circle(position, velocity, rad, colour) {
          this.position = position;
          this.velocity = velocity;
          this.rad = rad;
          this.colour = colour
          
          this.draw = function() {
            ctx.beginPath();
            ctx.fillStyle = this.colour
            // ctx.ellipse(this.position.x, this.position.y, radiusX, radiusY, rotation, startAngle, endAngle)
            // ctx.arc(this.position.x, this.position.y, this.rad, Math.PI * 2, false);
            ctx.ellipse(this.position.x, this.position.y, this.rad * 2, this.rad, -Math.PI / 4, 0, 2 * Math.PI)
            ctx.fill()
          };
          
          this.update = function() {
        
            // if ( this.position.x + this.rad > innerWidth || this.position.x - this.rad < 0 ) {
            //   this.velocity.x = -this.velocity.x;
            // }
        
            // if (this.position.y + this.rad > innerHeight || this.position.y - this.rad < 0 ) {
            //   this.velocity.y = -this.velocity.y;
            // }

            if ( this.position.x  > innerWidth || this.position.x < 0 ) {
              this.velocity.x = -this.velocity.x;
            }
        
            if (this.position.y  > innerHeight || this.position.y < 0 ) {
              this.velocity.y = -this.velocity.y;
            }            
        
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            
          };
        }
        
        colours.forEach(item => {

            let initPosition = new Vector2D(Math.random() * (window.innerWidth), Math.random() * (window.innerHeight))

            let initVelocity = new Vector2D(Math.random() > 0.5 ? 1 : -1, Math.random() > 0.5 ? 1 : -1)

            let circle = new Circle(
                initPosition, 
                initVelocity, 
                200,
                item.color
            );

            allCircles.current.push(circle)
        })
        
        function animate() {
          requestAnimationFrame(animate);
          ctx.clearRect(0, 0, innerWidth, innerHeight);

          allCircles.current.forEach(circle => {
            circle.draw()
            circle.update()
          })

        }
        
        animate();
    }, [])

    return (
        <Container ref={containerRef}>
            {/* <Noise /> */}
            {/* https://grainy-gradients.vercel.app/ */}
            {/* <svg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'>
            <filter id='noiseFilter'>
                <feTurbulence 
                type='fractalNoise' 
                // baseFrequency='9.77' 
                baseFrequency='12' 
                numOctaves='1' 
                stitchTiles='stitch'/>
            </filter>
            
            <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
            </svg>          */}
            <canvas id="canvas"></canvas>
        </Container>
    )
}