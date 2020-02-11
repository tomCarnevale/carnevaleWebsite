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

const fontRatio = 20;

export default class DioramaParallaxTilt extends React.Component {


    constructor(props) {
        super(props);

        this.img = React.createRef();
        this.diorama = React.createRef();
        this.container = React.createRef();
        this.titleRef = React.createRef();

        this.state = {
            index: props.index,
            height: props.height,
            navigation: props.navigation,
            wasLastPath: props.wasLastPath,
            navigationCallback: props.navigationCallback,
            lastScroll: props.lastScroll
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

        if (this.state.wasLastPath == true) {
            // setTimeout(() => {
            //     this.setState({ shrink: true, update: true });
            // }, 50);
            this.setState({ shrink: true, update: true });
        }
        else {
            this.setState({ compact: true, update: true });
        }
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
        this.state.navigationCallback();
        this.setState((prev) => ({ update: true, wasClicked: true }));
    }

    grow() {
        this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        let titleRect = this.titleRef.current.getBoundingClientRect();

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.imageAspect = aspectRatios[this.state.index];
        let elementWidth = (window.innerWidth * .8) / 2 - 15;

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
        //console.log(window.pageYOffset);
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
            titleWidth: [this.windowWidth * .8],
            titleX: [this.windowWidth * .1 - titleRect.left + 15],
            titleY: [this.windowHeight - 200 - titleRect.top],
            fontSize: (elementWidth * .8) / fontRatio,
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
            titleWidth: this.windowWidth * .8,
            titleX: -this.windowWidth * .1 + 15,
            titleY: -this.windowHeight + 200,
            z: 10,
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
        let titleRect = this.titleRef.current.getBoundingClientRect();

        //window.scrollTo(0, 700);
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        let elementWidth = (window.innerWidth * .8) / 2 - 60;
        let elementHeight = 1;

        if (this.container.current != null) {
            elementWidth = this.container.current.offsetWidth;
        }

        elementHeight = elementWidth * (this.windowHeight / this.windowWidth);

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
            height: [elementHeight],
            width: [elementWidth],
            canvasWidth: elementWidth,
            canvasHeight: elementHeight,
            x: [-this.rect.x + diffX, 0],
            y: [-this.rect.y + diffY + this.state.lastScroll, 0],
            z: [-1],
            titleX: [this.windowWidth * .1 - titleRect.left + 15, 0],
            titleY: [this.windowHeight - 200 - titleRect.top, 0],
            titleWidth: [elementWidth * .8],
            fontSize: (elementWidth * .8) / fontRatio,
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

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        let elementWidth = (window.innerWidth * .8) / 2 - 60;
        let elementHeight = 1;

        if (this.container.current != null) {
            elementWidth = this.container.current.offsetWidth;
        }

        elementHeight = elementWidth * (this.windowHeight / this.windowWidth);

        return {
            height: elementHeight,
            canvasHeight: elementHeight,
            width: elementWidth,
            canvasWidth: elementWidth,
            titleWidth: elementWidth * .8,
            fontSize: elementWidth * .8 / fontRatio,
            x: 0,
            y: 0,
            z: -1,
            titleX: 0,
            titleY: 0,
            // position: 'absolute',
            max: 10
        }
    }

    componentDidUpdate() {

    }

    update() {

        if (this.state.wasClicked == true) {
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
        return (
            <div onClick={this.handleClick} ref={this.container}>
                <Animate
                    // start={this.state.index != 0? this.compactState() : this.shrinkStart()}

                    start={this.state.wasLastPath == true ? this.shrinkStart() : this.compactState()}

                    update={this.update}
                >
                    {({ height, canvasHeight, width, canvasWidth, position, x, y, z, bottom, left, top, right,
                        titleX, titleY, fontSize, titleWidth }) => {
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
                                    // bottom, top, left, right,

                                    // height,
                                    color: "#cccccc",
                                    fontSize: fontSize,
                                    zIndex: 100,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <p ref={this.titleRef} style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        marginLeft: "10%",
                                        marginRight: "10%",
                                        width: titleWidth,
                                        WebkitTransform: `translate(${titleX}px, ${titleY}px)`,
                                        transform: `translate(${titleX}px, ${titleY}px)`,
                                        zIndex: z + 2,
                                    }} >
                                        Celebrating Grilling without getting in the way
                                        </p>
                                </div>
                                <div style={{
                                    height: canvasHeight,
                                    width: canvasWidth,
                                    zIndex: 1
                                }}>
                                    <DioramaParallax index={this.state.index} height={canvasHeight} ref={this.diorama}
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

