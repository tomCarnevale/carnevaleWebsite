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
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const styles = {
    grid: {
        paddingLeft: 0,
        paddingRight: 0
    },
    row: {
        marginLeft: 0,
        marginRight: 0
    },
    col: {
        paddingLeft: 0,
        paddingRight: 0
    }
};
export default class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation
        }
        console.log(props);
    }

    componentDidMount() {
        console.log("mounted home");
    }

    render() {
        return (
            <div>
                <Banner />
                {/* <div className='dioramaGrid'> */}

                <Container >
                    <Row >
                        <Col md={12} lg={6} >
                            <DioramaParallaxTilt index={0} height={300} navigation={this.state.navigation} />
                        </Col>
                        <Col md={12} lg={6} >
                            <DioramaParallaxTilt index={1} height={300} navigation={this.state.navigation} />
                        </Col>
                    </Row>
                    <Row >
                        <Col md={12} lg={6} >
                            <DioramaParallaxTilt index={3} height={300} navigation={this.state.navigation} />
                        </Col>
                        <Col md={12} lg={6} >
                            <DioramaParallaxTilt index={2} height={300} navigation={this.state.navigation} />
                        </Col>
                    </Row>
                </Container>

                {/* </div> */}
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