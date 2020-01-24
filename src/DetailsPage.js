import React from 'react';
import { Transition } from 'react-transition-group';
import DioramaParallax from './DioramaParallax';
import useWindowDimensions from './Utils';

export default class DetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            in: props.in,
            index: props.index,
            width: 0,
            height: 0 
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    render() {

        return (
            <div >
                <DioramaParallax index={this.state.index} height={this.state.height} style={{
                    position: "absolute"
                }}/>

            </div>

        )
    }
}

