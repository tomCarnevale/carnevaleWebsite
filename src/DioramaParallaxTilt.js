import DioramaParallax from "./DioramaParallax";
import React, { useRef } from 'react'
import Tilt from 'react-tilt'

export default class DioramaParallaxTilt extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            index: props.index,
            height: props.height
        }
    }

    render() {
        return (
            <div className="diorama">
                <Tilt className="canvasTilt" options={{ max: 10, scale: 1.05, speed: 500, reverse: false }}  >
                    <div className="Tilt-inner">
                        <DioramaParallax index={this.state.index}  />
                    </div>
                </Tilt>
            </div>
        )
    }
}
