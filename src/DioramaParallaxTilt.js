import DioramaParallax from "./DioramaParallax";
import React, { useRef, Image } from 'react';
import Text from 'react-text';

import Tilt from 'react-tilt';
import { Animate } from 'react-move';
import { easeCubicInOut } from 'd3-ease';
import ReactDOM from 'react-dom';

import { imageGroups, aspectRatios } from "./Images";

const fontRatio = 12;
const bottomMargin = 15;
const titleDefaultTop = 200;
const lineHeight = 40;

export default class DioramaParallaxTilt extends React.Component {


    constructor(props) {
        super(props);

        this.img = React.createRef();
        this.diorama = React.createRef();
        this.container = React.createRef();
        this.titleRef = React.createRef();
        this.titleRefFake = React.createRef();

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
        this.shrinkFinal = this.shrinkFinal.bind(this);
        this.shrinkBuffer = this.shrinkBuffer.bind(this);
        this.setLines = this.setLines.bind(this);
        this.compactState = this.compactState.bind(this);
        this.shrinkStart = this.shrinkStart.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.countLines = this.countLines.bind(this);

    }



    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

        if (this.state.wasLastPath == true) {
            // setTimeout(() => {
            //     this.setState({ shrink: true, update: true });
            // }, 50);
            
            this.setState({ shrinkBuffer: true, update: true });
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
        this.setState({ update: true, shrinkBuffer: false, compact: true, shrinkFinal: false });
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

    //This sets the z and position to get ready to shrink. After we mount, we will update to "shrink" which does the real heavy lifting.
    shrinkStart() {

        return {
            titleX: 0,
            titleY: 0,
            z: 10,
            position: 'absolute',
        }
    }

    shrinkBuffer() {
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
        let offsetTop = 0;
        let fontSize = this.state.height / fontRatio;
        

       
        //return {};
        return {
            height: [height, this.state.height],
            width: [width, elementWidth],
            canvasWidth: elementWidth,
            canvasHeight: elementHeight,
            x: [x, 0],
            y: [y, 0],
            z: [-1],
            titleX: titleX,
            titleY: titleY,
            titleWidth: [this.windowWidth * .8, elementWidth * .8],
            fakeTitleWidth: elementWidth * .8,
            titleMarginX: [0, elementWidth * .1],
            titleMarginY: [0, bottomMargin],
            fontSize: [this.windowHeight / fontRatio, fontSize],
            fakeFontSize: fontSize,

            titleTop: [0, titleDefaultTop + offsetTop],
            position: "absolute",
            max: 10,
            timing: { duration: 700, ease: easeCubicInOut },
            events: {
                start: () => {
                    this.setState({ shrinkFinal: true });

                },
                interrupt: () => {

                },
                end: () => {

                },
            }
        }
    }

    shrinkFinal() {
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

        let diffY = (this.windowHeight - (this.windowHeight / a2)) / 2;
        let diffX = (this.windowWidth - (this.windowWidth / a1)) / 2;

        // console.log(-rect.y);
        // console.log(diffY);
        // console.log(this.state.lastScroll);

        let titleX = this.windowWidth * .1 - titleRect.x;
        let titleY = this.windowHeight * .75 - titleRect.y + this.state.lastScroll;
        let offsetTop = 0;
        let fontSize = this.state.height / fontRatio;
        // console.log(this.titleRefFake);
        // console.log(this.countLines(this.titleRefFake.current));
        if (this.countLines(this.titleRefFake.current) < 2) {
            offsetTop += lineHeight;
        }
        
        //return {};
        return {
            height: [this.state.height],
            width: [elementWidth],
            canvasWidth: elementWidth,
            canvasHeight: elementHeight,
            x: [0],
            y: [0],
            z: [-1],
            titleX: [0],
            titleY: [0],
            titleWidth: [elementWidth * .8],
            fakeTitleWidth: elementWidth * .8,
            titleMarginX: [elementWidth * .1],
            titleMarginY: [bottomMargin],
            fontSize: [fontSize],
            fakeFontSize: fontSize,
            titleTop: [titleDefaultTop + offsetTop],
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

    countLines(target) {
        var style = window.getComputedStyle(target, null);
        var height = parseInt(style.getPropertyValue("height"));
        var font_size = parseInt(style.getPropertyValue("font-size"));
        var line_height = parseInt(style.getPropertyValue("line-height"));
        var box_sizing = style.getPropertyValue("box-sizing");

        if (isNaN(line_height)) line_height = font_size * 1.2;

        if (box_sizing == 'border-box') {
            var padding_top = parseInt(style.getPropertyValue("padding-top"));
            var padding_bottom = parseInt(style.getPropertyValue("padding-bottom"));
            var border_top = parseInt(style.getPropertyValue("border-top-width"));
            var border_bottom = parseInt(style.getPropertyValue("border-bottom-width"));
            height = height - padding_top - padding_bottom - border_top - border_bottom
        }
        var lines = Math.ceil(height / line_height);

        return lines;
    }

    countFutureLines(height, fontSize, paddingBottom, paddingTop) {

        let line_height = fontSize * 1.2;
        console.log(fontSize);
        height = height - paddingBottom - paddingTop
        var lines = Math.ceil(height / line_height);

        return lines;
    }

    compactState() {


        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        let elementWidth = 1;

        if (this.container.current != null) {
            elementWidth = this.container.current.offsetWidth;
        }

        return {
            height: this.state.height,
            canvasHeight: this.state.height,
            width: elementWidth,
            fakeTitleWidth: elementWidth,
            canvasWidth: elementWidth,
            titleWidth: elementWidth * .8,
            fontSize: this.state.height / fontRatio,
            fakeFontSize: this.state.height / fontRatio,
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

    setLines() {
        return {
            titleTop: titleDefaultTop + lineHeight,
        }
    }

    componentDidUpdate() {

        if (this.countLines(this.titleRef.current) < 2 && this.state.setLines != true && this.state.shrinkBuffer != true && this.state.shrinkFinal != true) {
            this.setState({ setLines: true });
        }
    }

    update() {

        if (this.state.wasClicked == true) {
            return this.grow();
        }
        if (this.state.shrinkFinal == true) {

            console.log('shrink final');
            return this.shrinkFinal();
        }
        if (this.state.shrinkBuffer == true) {

            console.log('shrink buffer');

            return this.shrinkBuffer();
        }
        if (this.state.setLines == true) {
            return this.setLines();
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
                        titleX, titleY, fontSize, titleWidth, titleMarginX, titleMarginY, titleTop,
                        fakeTitleWidth, fakeFontSize}) => {
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
                                    }}
                                />

                                <div style={{
                                    color: "#cccccc",
                                    fontSize: fakeFontSize,
                                    zIndex: -100,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                                >
                                    <p ref={this.titleRefFake} style={{
                                        position: 'absolute',
                                        opacity: 0,
                                        top: titleTop,

                                        marginLeft: titleMarginX,
                                        marginRight: titleMarginX,
                                        marginBottom: titleMarginY,
                                        width: fakeTitleWidth,
                                        //WebkitTransform: `translate(${titleX}px, ${titleY}px)`,
                                        //transform: `translate(${titleX}px, ${titleY}px)`,
                                        zIndex: z + 2,
                                    }} >
                                        Celebrating Grilling without getting
                                    </p>

                                </div>

                                <div style={{
                                    color: "#cccccc",
                                    fontSize: fontSize,
                                    zIndex: 100,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                                >
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
                                        Celebrating Grilling without getting
                                    </p>
                                </div>

                                <div style={{
                                    height: this.state.height,
                                    width: "100%",
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

