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
import { interpolate } from 'd3-interpolate'
import { Redirect } from 'react-router-dom';

const imageGroups = [
    mountain,
    ball,
    lady,
    canyon
]

const aspectRatios = [
    1069 / 1600,
    1067 / 1600,
    853 / 1280,
    855 / 1280
]

export default class DioramaParallaxTilt extends React.Component {


    constructor(props) {
        super(props);

        this.img = React.createRef();
        this.diorama = React.createRef();

        this.state = {
            index: props.index,
            height: props.height,
            navigation: props.navigation
        }
        this.update = this.update.bind(this);
        this.grow = this.grow.bind(this);
        this.shrink = this.shrink.bind(this);
        this.compactState = this.compactState.bind(this);
        this.shrinkStart = this.shrinkStart.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }



    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

        this.setState({ shrink: this.state.navigation.history.action != "POP" })

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

    grow() {
        this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();


        this.imageAspect = aspectRatios[this.state.index];

        let a1, a2;
        if (this.windowHeight / this.windowWidth < this.imageAspect) {
            a1 = 1;
            a2 = (this.windowHeight / this.windowWidth) / this.imageAspect;
        } else {
            a1 = (this.windowWidth / this.windowHeight) * this.imageAspect;
            a2 = 1;
        }

        let diff = (this.windowHeight - (this.windowHeight / a2)) / 2;
        return {
            height: [this.windowHeight / a2],

            width: [this.windowWidth / a1],
            x: [-this.rect.x],
            y: [-this.rect.y + diff],
            z: 100,
            timing: { duration: 600, ease: easeCubicInOut },
            position: 'absolute',
            max: 0,
            events: {
                start: () => {

                },
                interrupt: () => {

                },
                end: () => {
                    this.state.navigation.history.push('/test' + this.state.index);
                    // this.setState({ redirect: true });
                },
            }
        }
    }

    shrinkStart() {
        // this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        let elementWidth = (window.innerWidth * .8) / 2 - 15;

        this.imageAspect = aspectRatios[this.state.index];

        let a1, a2;
        if (this.windowHeight / this.windowWidth < this.imageAspect) {
            a1 = 1;
            a2 = (this.windowHeight / this.windowWidth) / this.imageAspect;
        } else {
            a1 = (this.windowWidth / this.windowHeight) * this.imageAspect;
            a2 = 1;
        }

        let diff = (this.windowHeight - (this.windowHeight / a2)) / 2;
        return {
            height: this.windowHeight / a2,
            canvasHeight: this.state.height,
            width: this.windowWidth / a1,
            canvasWidth: elementWidth,
            x: 0,
            y: 0,
            z: 0,
            timing: { duration: 600, ease: easeCubicInOut },
            position: 'absolute',
            max: 10,
            events: {
                start: () => {

                },
                interrupt: () => {

                },
                end: () => {

                },
            }
        }
    }

    shrink() {
        window.scrollTo(0, 700);
        let elementWidth = (window.innerWidth * .8) / 2 - 15;
        return {
            height: [this.state.height],
            width: [elementWidth],
            x: [0],
            y: [0],
            z: [100, -1],
            position: 'absolute',
            max: 10,
            timing: { duration: 600, ease: easeCubicInOut },
            events: {
                start: () => {

                },
                interrupt: () => {

                },
                end: () => {

                },
            }
        }
    }

    compactState() {
        let elementWidth = (window.innerWidth * .8) / 2 - 15;
        return {
            height: this.state.height,
            canvasHeight: this.state.height,
            width: elementWidth,
            canvasWidth: elementWidth,
            x: 0,
            y: 0,
            z: -1,
            position: 'absolute',
            max: 10
        }
    }

    update() {

        if (this.state.wasClicked == true) {
            console.log("grow!");
            return this.grow();
        }
        if (this.state.shrink == true) {
            return this.shrink();
        }

    }

    render() {
        console.log(this.state.navigation.history.action);

        // if (this.state.redirect == true) {
        //     return <Redirect to={'/test' + this.state.index} />;
        // }

        return (
            <div onClick={this.handleClick}>
                <Animate

                    start={this.state.navigation.history.action == "POP" ? this.compactState() : this.shrinkStart()}
                    update={this.update}
                >



                    {({ height, canvasHeight, width, canvasWidth, position, x, y, z, max }) => {
                        return (
                            // <svg style={style}>
                            <div>
                                {max > 0 ?
                                    <Tilt className="canvasTilt" options={{ max, scale: 1.05, speed: 500, reverse: false }}
                                        style={{
                                            height: canvasHeight,
                                            width: canvasWidth,
                                            position,
                                            zIndex: 1

                                        }}
                                    >
                                        <div style={{
                                            position: "absolute",
                                            bottom: "30px",
                                            left: "30px",
                                            height: "20%",
                                            width: "80%",
                                            color: "#dddddd",
                                            fontSize: 'x-large'
                                        }}>
                                            Celebrating Grilling without getting in the way
                                        </div>

                                        <DioramaParallax index={this.state.index} height={this.state.height} ref={this.diorama}
                                            style={{
                                                zIndex: 1,
                                            }}
                                        />
                                    </Tilt> : null
                                }


                                <Tilt className="Tilt" options={{ max, scale: 1, speed: 500, reverse: false }}
                                    style={{
                                        height: canvasHeight,
                                        width: canvasWidth,
                                        zIndex: z + 1,

                                    }} >

                                    <div className="Tilt-inner">
                                        <div style={{
                                            position: "absolute",
                                            bottom: "30px",
                                            left: "30px",
                                            height: "20%",
                                            width: "80%",
                                            color: "#dddddd",
                                            fontSize: 'x-large',
                                        }}>
                                            Celebrating Grilling without getting in the way
                                        </div>
                                        <img src={imageGroups[this.state.index]} ref={this.img}
                                            style={{
                                                height,
                                                width,
                                                position,
                                                WebkitTransform: `translate(${x}px, ${y}px)`,
                                                transform: `translate(${x}px, ${y}px)`,
                                                zIndex: z,

                                            }}
                                        />
                                    </div>
                                </Tilt>


                            </div>

                            // </svg>

                        )

                    }}

                </Animate>

            </div>
        )
    }
}

