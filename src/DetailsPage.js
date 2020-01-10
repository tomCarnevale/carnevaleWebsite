import React from 'react';
import { Transition } from 'react-transition-group';
import DioramaParallax from './DioramaParallax';

export default class DetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            in: props.in,
            index: props.index
        };

    }

    render() {
        return (
            <div >
                <DioramaParallax index={this.state.index} height={"1000px"}/>
                {/* <Transition in={this.state.in}> */}

                    <div>
                  
                    </div>
                {/* </Transition> */}
            </div>

        )
    }
}