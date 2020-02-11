import React from 'react';
import { Transition } from 'react-transition-group';
import DioramaParallax from './DioramaParallax';
import useWindowDimensions from './Utils';
import { Link } from 'react-router-dom';
import mountain from './img/mount.jpg';
import ball from './img/ball.jpg';
import lady from './img/lady.jpg';
import canyon from './img/canyon.jpg';
import { Animate } from 'react-move'
import { easeCubicInOut } from 'd3-ease'
import ReactDOM from 'react-dom';

import GradientScroll from './GradientScroll';

const imageGroups = [
    mountain,
    ball,
    lady,
    canyon
]

//TODO make this runtime
const aspectRatios = [
    1069 / 1600,
    1067 / 1600,
    853 / 1280,
    855 / 1280
]
export default class DetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            in: props.in,
            index: props.index,
            width: 0,
            height: 0,
            transitionState: props.transitionState,
            text: "",
            navigation: props.navigation
        };

        this.img = React.createRef();
        this.diorama = React.createRef();
        this.update = this.update.bind(this);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.setState({ text: this.getText() });
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentWillUpdate() {
    }

    getText() {
        return (
            <div>
 <br /> <br /> <br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
                The best experiences change the game.They break new ground yet seem inevitable once introduced.While they
            may include IoT, AR / VR, and spacial computing, they are just as likely to defy categorization.Along with
                the mobile and web, these are the experiences we create for enterprise.Ones that scale effortlessly, connect
            with your existing cloud, and solve pressing business challenges.Welcome to the unprecendented.
        < br />
            </div>
        );
    }

    update() {

        if (this.state.wasClicked == false) {

            this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            console.log(this.windowHeight);
            this.imageAspect = this.img.current.naturalHeight / this.img.current.naturalWidth;
            let a1, a2;

            a1 = (this.windowWidth / this.windowHeight) * this.imageAspect;
            a2 = 1;

            let diff = (this.windowHeight - (this.windowHeight / a2)) / 2;
            return {
                height: this.windowHeight / a2,
                width: this.windowWidth / a1,
                x: 0,
                y: -diff,
                z: -5,
                timing: { duration: 700, ease: easeCubicInOut },
                position: 'absolute',
            }
        }
    }
    handleClick = () => {
        this.state.navigation.history.goBack();
        // this.state.navigation.history.push('/');
        // this.setState((prev) => ({ wasClicked: true }));
    }



    render() {

        // this.rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.imageAspect = aspectRatios[this.state.index];
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;


        //used to calculate the width and height of our static image and the canvas for the parallaxing effect
        let aspectWidth, aspectHeight;
        if (this.windowHeight / this.windowWidth < this.imageAspect) {
            aspectWidth = 1;
            aspectHeight = (this.windowHeight / this.windowWidth) / this.imageAspect;
        } else {
            aspectWidth = (this.windowWidth / this.windowHeight) * this.imageAspect;
            aspectHeight = 1;
        }

        //height used for the parallaxing canvas 
        let canvasAspectWidth, canvasAspectHeight;
        canvasAspectWidth = (this.windowWidth / this.windowHeight) * this.imageAspect;
        canvasAspectHeight = 1;

        let diffY = (this.windowHeight - (this.windowHeight / aspectHeight)) / 2;
        let diffX = (this.windowWidth - (this.windowWidth / aspectWidth)) / 2;

        // console.log(this.windowHeight);
        return (
            <div>

                {/* <DioramaParallax index={this.state.index} height={this.state.height} style={{
                    position: "absolute",
                    zIndex: -100

                }} /> */}

                <Animate

                    start={{
                        shrink: false,
                        height: this.windowHeight / aspectHeight,
                        width: this.windowWidth / aspectWidth,
                        canvasHeight: this.windowHeight / canvasAspectHeight,
                        canvasWidth: this.windowWidth / canvasAspectWidth,
                        // x: -this.rect.x,
                        y: 0,
                        z: -10,
                        position: 'absolute'
                    }}
                    update={this.update}
                >
                    {({ height, canvasHeight, width, canvasWidth, position, x, y, z }) => {
                        return (
                            <div>

                                {/* <Link to='/'> */}
                                <div
                                    onClick={this.handleClick}
                                    style={{
                                        position,
                                        width: 50,
                                        height: 50,
                                        right: 20,
                                        top: 20,
                                        backgroundColor: 'rgba(200, 200, 200, 1)',
                                        zIndex: 10
                                    }}>
                                </div>
                                {/* </Link> */}
                                <img src={imageGroups[this.state.index]} ref={this.img}
                                    style={{
                                        height,
                                        width,
                                        position: 'fixed',
                                        top: diffY,
                                        left: diffX,
                                        
                                        zIndex: z
                                    }}
                                />
                               
                               <GradientScroll text={this.getText()}/>

                                <DioramaParallax index={this.state.index} height={canvasHeight} ref={this.diorama}
                                    style={{
                                        position: "fixed",
                                        top: diffY,
                                        zIndex: -5
                                    }}
                                />

                            </div>


                        )

                    }}

                </Animate>
            </div>

        )
    }
}

