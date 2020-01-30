import React from 'react';
import Diorama from './Diorama';
import Banner from './Banner';
import InfoDump from './InfoDump';
import DioramaParallax from './DioramaParallax';
import Copyright from './Copyright';
import { PlaceholderImage } from './PlaceholderImage';
import Links from './Links';
import Contact from './Contact';
import { SwitchTransition } from 'react-transition-group';
import DetailsPage from './DetailsPage';
import DioramaParallaxTilt from './DioramaParallaxTilt';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation
        }
        console.log(props);
    }
  
    componentDidMount()
    {
        console.log("mounted home");
    }

    render() {
        return (
            <div>
                <Banner />
                <div className='dioramaGrid'>
                    <DioramaParallaxTilt index={0} height={300} navigation={this.state.navigation}/>
                    <DioramaParallaxTilt index={1} height={300} navigation={this.state.navigation}/>
                    <DioramaParallaxTilt index={2} height={300} navigation={this.state.navigation}/>
                    <DioramaParallaxTilt index={3} height={300} navigation={this.state.navigation}/>
                    {/* <Diorama />
                    <Diorama /> */}
                </div>
                <InfoDump />
                <PlaceholderImage height='600' />
                <InfoDump />
                <Links />
                <InfoDump />
                <PlaceholderImage height='600' />
                <InfoDump />
                <PlaceholderImage height='600' />
                <Contact />
                <Copyright />
            </div>
        )
    }
}