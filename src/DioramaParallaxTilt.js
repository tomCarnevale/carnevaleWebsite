import DioramaParallax from "./DioramaParallax";
import React, { useRef } from 'react'
import Tilt from 'react-tilt'
import { Animate } from 'react-move'
import { easeCubicIn } from 'd3-ease'
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
            console.log(this.img.current.style);
            return {
                height: [this.windowHeight],
                width: [this.windowWidth],
                x: [-this.rect.x],
                y: [-this.rect.y],
                timing: { duration: 500, ease: easeCubicIn },
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
        }
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <Animate
                    start={{
                        height: 0,
                        width: 0,
                        x: 0,
                        y: 0,
                        position: 'absolute'
                    }}
                    update={this.update}>

                    {({ height, width, position, x, y }) => {
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
                                        transform: `translate(${x}px, ${y}px)`
                                    }}
                                />
                                <DioramaParallax index={this.state.index} height={this.state.height} />
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

