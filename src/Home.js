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


export default class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation

        }


    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Banner />
                {/* <div className='dioramaGrid'> */}

                <Container style={{
                    left: "10%",
                    right: "10%",
                    padding: 0
                }} >
                    <Row className="align-items-center" >
                        <Col md={12} lg={6} style={{
                            marginTop: 30
                        }}>
                            <DioramaParallaxTilt
                                index={0}
                                height={300}
                                navigation={this.state.navigation}
                                wasLastPath={this.props.lastPath == '/test0'}
                                navigationCallback={this.props.navigationCallback}
                                lastScroll={this.props.lastScroll}
                            />
                        </Col>

                        <Col md={12} lg={6} style={{
                            marginTop: 30
                        }}>
                            <DioramaParallaxTilt
                                index={1}
                                height={300}
                                navigation={this.state.navigation}
                                wasLastPath={this.props.lastPath == '/test1'}
                                navigationCallback={this.props.navigationCallback}
                                lastScroll={this.props.lastScroll}
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12} lg={6} style={{
                            marginTop: 30
                        }}>
                            <DioramaParallaxTilt
                                index={2}
                                height={300}
                                navigation={this.state.navigation}
                                wasLastPath={this.props.lastPath == '/test2'}
                                navigationCallback={this.props.navigationCallback}
                                lastScroll={this.props.lastScroll}
                            />
                        </Col>
                        <Col md={12} lg={6} style={{
                            marginTop: 30
                        }}>
                            <DioramaParallaxTilt
                                index={3}
                                height={300}
                                navigation={this.state.navigation}
                                wasLastPath={this.props.lastPath == '/test3'}
                                navigationCallback={this.props.navigationCallback}
                                lastScroll={this.props.lastScroll}
                            />
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