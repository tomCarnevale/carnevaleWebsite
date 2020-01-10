import React from 'react';
import Diorama from './Diorama';
import Banner from './Banner';
import InfoDump from './InfoDump';
import DioramaParallax from './DioramaParallax';
import Copyright from './Copyright';
import canyon from './img/canyon.jpg'
import { PlaceholderImage } from './PlaceholderImage';
import Links from './Links';
import Contact from './Contact';
export default class App extends React.Component {
    render() {
        return <div>
            <Banner />
            <div className='dioramaContainer'>
                <DioramaParallax index={0}/>
                {/* <DioramaParallax index={1}/> */}
                <DioramaParallax index={2}/>
                <DioramaParallax index={3}/>
                <Diorama/>
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
    }
}