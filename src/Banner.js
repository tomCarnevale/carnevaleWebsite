import React from 'react';
import placeholder from './img/PlaceholderImage.png';

export default class Banner extends React.Component {
    render() {
        return (
            <div className="banner" style={{height: 700, width: "100%", marginBottom: `100px`}}>
                <img src={placeholder} style={{height: "100%", width: "100%"}} />

                <div className='bannerTextTitle' style={{
                    position: "absolute",
                    left: "1px",
                    top: "150px"
                }} >
                    Experience the Unprecedented
            </div>
                <div className='bannerText' style={{
                    position: "absolute",
                    left: "1px",
                    top: "300px"
                }} >
                    From apps, to AR/VR, to solutions that defy categorization, we create experiences that scale effortlessly,
                    connect with your existing cloud, and solve pressing business challenges.
            </div>
            </div>
            )
    }
}