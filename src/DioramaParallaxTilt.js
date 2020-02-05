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
        this.container = React.createRef();

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

        if (this.state.navigation.history.action != "POP" && this.state.index == 0)
            this.setState({ shrink: true, update: true });
        else {
            this.setState({ compact: true, update: true });
        }
        console.log(this.container.current.offsetWidth);
        // this.setState({ initialUpdate: true, initialWidth: this.diorama.current.width, initialHeight: this.diorama.current.height })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.setState({ update: true, shrink: false, compact: true });
    }
    handleClick = () => {
        this.setState((prev) => ({ update: true, wasClicked: true }));
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

        let diffY = (this.windowHeight - (this.windowHeight / a2)) / 2;
        let diffX = (this.windowWidth - (this.windowWidth / a1)) / 2;

        return {
            height: [this.windowHeight / a2],

            width: [this.windowWidth / a1],
            x: [-this.rect.x + diffX],
            y: [-this.rect.y + diffY],
            z: 100,
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
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

      
        return {
            height: this.windowHeight / a2,
            canvasHeight: this.state.height,
            width: this.windowWidth / a1,
            canvasWidth: elementWidth,
           
            z: 10,
            timing: { duration: 600, ease: easeCubicInOut },
            position: 'fixed',
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
        this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

        window.scrollTo(0, 700);
        let elementWidth = (window.innerWidth * .8) / 2 - 60;
        if (this.container.current != null) {
            elementWidth = this.container.current.offsetWidth;
        }
        console.log(this.container.current.offsetWidth);


        this.imageAspect = aspectRatios[this.state.index];

        let a1, a2;
        if (this.windowHeight / this.windowWidth < this.imageAspect) {
            a1 = 1;
            a2 = (this.windowHeight / this.windowWidth) / this.imageAspect;
        } else {
            a1 = (this.windowWidth / this.windowHeight) * this.imageAspect;
            a2 = 1;
        }

        let diffY = (this.windowHeight - (this.windowHeight / a2)) / 2;
        let diffX = (this.windowWidth - (this.windowWidth / a1)) / 2;
        return {
            height: [this.state.height],
            width: [elementWidth],
            canvasWidth: elementWidth,
            x: [-this.rect.x + diffX, 0],
            y: [-this.rect.y + diffY + 700, 0],
            z: [-1],
            position: "absolute",
            max: 10,
            timing: { duration: 1000, ease: easeCubicInOut },
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
        let elementWidth = (window.innerWidth * .8) / 2 - 60;
        console.log(this.container.current);

        if (this.container.current != null) {
            elementWidth = this.container.current.offsetWidth;
        }
        return {
            height: this.state.height,
            canvasHeight: this.state.height,
            width: elementWidth,
            canvasWidth: elementWidth,
            x: 0,
            y: 0,
            z: -1,
            // position: 'absolute',
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
        if (this.state.compact == true) {
            return this.compactState();
        }

    }

    render() {
        // if (this.state.redirect == true) {
        //     return <Redirect to={'/test' + this.state.index} />;
        // }

        return (
            <div onClick={this.handleClick} ref={this.container}>
                <Animate
                    // start={this.state.index != 0? this.compactState() : this.shrinkStart()}

                    start={this.state.navigation.history.action == "POP" ? this.compactState() :
                        this.state.index == 0 ? this.shrinkStart() : this.compactState()
                    }
                    update={this.update}
                >
                    {({ height, canvasHeight, width, canvasWidth, position, x, y, z, bottom, left, top, right }) => {
                        return (
                            <div style={{
                                position: 'relative',

                            }}>

                                <img src={imageGroups[this.state.index]} ref={this.img}
                                    style={{
                                        width, height,
                                        position: 'absolute',
                                        WebkitTransform: `translate(${x}px, ${y}px)`,
                                        transform: `translate(${x}px, ${y}px)`,
                                        zIndex: z,
                                        objectFit: 'cover'
                                    }} />


                                <div style={{
                                    bottom, top, left, right,
                                    // width,
                                    // height,
                                    color: "#cccccc",
                                    fontSize: 'x-large',
                                    zIndex: 100,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'bottom',

                                }}>
                                    <p style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 30,
                                        // WebkitTransform: `translate(${x}px, ${y}px)`,
                                        // transform: `translate(${x}px, ${y}px)`,
                                        zIndex: z + 2,
                                    }} >

                                        Celebrating Grilling without getting in the way
                                        </p>
                                </div>
                                <div //canvasHolder
                                    style={{
                                        height: canvasHeight,
                                        width: canvasWidth,
                                        // position: "absolute",
                                        zIndex: 1
                                    }}
                                >

                                    <DioramaParallax index={this.state.index} height={this.state.height} ref={this.diorama}
                                        style={{
                                            zIndex: 1,
                                        }}
                                    />
                                </div>

                            </div>
                        )
                    }}

                </Animate>

            </div>
        )
    }
}

