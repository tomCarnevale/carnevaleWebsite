import DioramaParallax from "./DioramaParallax";
import React, { useRef, Image } from 'react'
import Tilt from 'react-tilt'
import { Animate } from 'react-move'
import { easeCubicInOut } from 'd3-ease'
import ReactDOM from 'react-dom';

import { imageGroups, aspectRatios } from "./Images";

const fontRatio = 12;
const bottomMargin = 15;
const titleDefaultTop = 200;
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
        let elementWidth = 0;

        if (this.container.current != null) {
            elementWidth = this.container.current.offsetWidth;
        }

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
        //console.log(titleRect.x);

        let x = -this.rect.x + diffX;
        let y = -this.rect.y + diffY
        let fontSize = this.windowHeight / fontRatio;
        let titleX = this.windowWidth * .1 - titleRect.x + elementWidth * .1;
        let titleY = (this.windowHeight * .75) - titleRect.y;

        console.log(titleY);

        return {
            height: [this.windowHeight / a2],
            width: [this.windowWidth / a1],
            x: [x],
            y: [y],
            z: 100,
            titleWidth: [this.windowWidth * .8],
            titleX: [titleX],
            titleY: [titleY],
            fontSize: [fontSize],
            titleMarginX: [0],
            titleMarginY: [0],
            timing: { duration: 600, ease: easeCubicInOut },
            position: 'absolute',
            max: 0,             
            events: {
                start: () => {

                },
                interrupt: () => {

                },
                end: () => {
                    //NAVIGATION
                    this.state.navigation.history.push('/test' + this.state.index);
                },
            }
        }
    }

    shrinkStart() {
        // this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        let elementWidth = (window.innerWidth * .8) / 2 - 60;

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

            canvasHeight: this.state.height,
            canvasWidth: elementWidth,
            titleWidth: this.windowWidth * .8,
            x: 0,
            y: 0,
            titleX: 0,
            titleY: 0,
            titleMarginX: 0,
            titleMarginY: 0,
            z: 10,
            position: 'absolute',
            fontSize: this.state.height / fontRatio,
            max: 10,
            titleTop: [titleDefaultTop],
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
        //this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        let rect = this.diorama.current.getBoundingClientRect();

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
        //a2 = (this.windowHeight / this.windowWidth) / this.imageAspect;

        let diffY = (this.windowHeight - (this.windowHeight / a2)) / 2;
        let diffX = (this.windowWidth - (this.windowWidth / a1)) / 2;

        // console.log(-rect.y);
        // console.log(diffY);
        // console.log(this.state.lastScroll);

        let height = this.windowHeight / a2;
        let width = this.windowWidth / a1;
        let x = -rect.x + diffX;
        let y = -rect.y + diffY + this.state.lastScroll;
        let titleX = this.windowWidth * .1 - titleRect.x;
        let titleY = this.windowHeight * .75 - titleRect.y + this.state.lastScroll;

        //return {};
        return {
            height: [height, this.state.height],
            width: [width, elementWidth],
            canvasWidth: elementWidth,
            canvasHeight: elementHeight,
            x: [x, 0],
            y: [y, 0],
            z: [-1],
            titleX: [titleX, 0],
            titleY: [titleY, 0],
            titleWidth: [this.windowWidth * .8, elementWidth * .8],
            titleMarginX: [0, elementWidth * .1],
            titleMarginY: [0, bottomMargin],
            fontSize: [this.windowHeight / fontRatio, this.state.height / fontRatio],
            titleTop: [0, titleDefaultTop],
            position: "absolute",
            max: 10,
            timing: { duration: 700, ease: easeCubicInOut },
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


        return {
            height: this.state.height,
            canvasHeight: this.state.height,
            width: elementWidth,
            canvasWidth: elementWidth,
            titleWidth: elementWidth * .8,
            fontSize: this.state.height / fontRatio,
            titleMarginX: elementWidth * .1,
            titleMarginY: bottomMargin,
            x: 0,
            y: 0,
            z: -1,
            titleX: 0,
            titleY: 0,
            titleTop: titleDefaultTop,
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
                    {({ height, canvasHeight, width, canvasWidth, position, x, y, z,
                        titleX, titleY, fontSize, titleWidth, titleMarginX, titleMarginY, titleTop }) => {
                        return (
                            <div style={{
                                position: 'relative',

                            }}>

                                <img src={imageGroups[this.state.index][0]} ref={this.img}
                                    style={{
                                        width, height,
                                        position: 'absolute',
                                        WebkitTransform: `translate(${x}px, ${y}px)`,
                                        transform: `translate(${x}px, ${y}px)`,
                                        zIndex: z,
                                        objectFit: 'cover'
                                    }} />


                                <div style={{
                                    color: "#cccccc",
                                    fontSize: fontSize,
                                    zIndex: 100,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <p ref={this.titleRef} style={{
                                        position: 'absolute',
                                        top: titleTop,

                                        marginLeft: titleMarginX,
                                        marginRight: titleMarginX,
                                        marginBottom: titleMarginY,
                                        width: titleWidth,
                                        //WebkitTransform: `translate(${titleX}px, ${titleY}px)`,
                                        transform: `translate(${titleX}px, ${titleY}px)`,
                                        zIndex: z + 2,
                                    }} >
                                        Celebrating Grilling without getting in the way
                                        </p>
                                </div>
                                <div style={{
                                    height: this.state.height,
                                    width: canvasWidth,
                                    zIndex: 1

                                }} ref={this.diorama}>
                                    <DioramaParallax index={this.state.index} height={this.state.height} lockToDiv={true}
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

