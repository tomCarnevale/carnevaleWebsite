import DioramaParallax from "./DioramaParallax";
import React, { useRef, Image } from 'react'
import Tilt from 'react-tilt'
import { Animate } from 'react-move'
import { easeCubicInOut } from 'd3-ease'
import ReactDOM from 'react-dom';

import mountain from './img/mount.jpg';
import ball from './img/ball.jpg';
import lady from './img/lady.jpg';
import canyon from './img/canyon.jpg';

const imageGroups = [
    mountain,
    ball,
    lady,
    canyon
]
export default class DioramaParallaxTilt extends React.Component {


    constructor(props) {
        super(props);

        this.img = React.createRef();
        // this.diorama = React.createRef();

        this.state = {
            index: props.index,
            height: props.height
        }
        this.update = this.update.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

       
        
    }



    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    

        // this.setState({ initialUpdate: true, initialWidth: this.diorama.current.width, initialHeight: this.diorama.current.height })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }
    handleClick = () => {
        this.setState((prev) => ({ wasClicked: true }));
    }

    update() {
        if (this.state.wasClicked == true) {
            this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();


            this.imageAspect = this.img.current.naturalHeight / this.img.current.naturalWidth;
            console.log(this.imageAspect);

            let a1, a2;
            if (this.windowHeight / this.windowWidth < this.imageAspect) {
                a1 = 1;
                a2 = (this.windowHeight / this.windowWidth) / this.imageAspect;
            } else {
                a1 = (this.windowWidth / this.windowHeight) * this.imageAspect;
                a2 = 1;
            }

            let diff = (this.windowHeight - (this.windowHeight / a2)) / 2;
            console.log(diff);
            return {
                height: [this.windowHeight / a2],
                width: [this.windowWidth / a1],
                x: [-this.rect.x],
                y: [-this.rect.y + diff],
                z: 5,
                timing: { duration: 700, ease: easeCubicInOut },
                position: 'absolute',
                // events: {
                //     start: () => {

                //     },
                //     interrupt: () => {

                //     },
                //     end: () => {

                //     },
                // }
            }
        } else if (this.state.initialUpdate == true) {

            console.log(this.state.initialHeight);
            return {
                height: this.state.initialHeight,
                width: this.state.initialWidth,
                x: 0,
                y: 0,
                position: 'absolute'
            }

        }
    }

    render() {

        let elementWidth = (window.innerWidth * .8) / 2 - 15;
        return (
            <div onClick={this.handleClick}>
                <Animate
                    
                    start={{
                        height: this.state.height,
                        width: elementWidth,
                        x: 0,
                        y: 0,
                        z: -1,
                        position: 'absolute'
                    }}
                    update={this.update}>

                    {({ height, width, position, x, y, z}) => {
                        return (
                            // <Tilt className="canvasTilt" options={{ max: 10, scale: 1.05, speed: 500, reverse: false }}  style={{
                            //     width: this.state.width
                            // }} >
                            // <svg style={style}>
                            <div>

                                <img src={imageGroups[this.state.index]} ref={this.img}
                                    style={{
                                        height,
                                        width,
                                        position,
                                        WebkitTransform: `translate(${x}px, ${y}px)`,
                                        transform: `translate(${x}px, ${y}px)`,
                                        zIndex: z
                                    }}
                                />
                                <DioramaParallax index={this.state.index} height={this.state.height} ref={this.getDioramaRef} />
                            </div>

                            // </svg>
                            // </Tilt>
                        )

                    }}

                </Animate>

            </div>
        )
    }
}

