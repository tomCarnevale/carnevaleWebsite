import React from 'react';
import { Animate } from 'react-move';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class GradientScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gradientTop: 0,
            gradientBottom: 0,
        }
        this.container = React.createRef();

        this.handleScroll = this.handleScroll.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (this.container.current == undefined)
            return;

        let gradient = (this.container.current.scrollTop / 1000);
        this.setState({

            gradientTop: gradient,
            gradientBottom: gradient * 2
        });

    };

    update() {
        return {
            gradientTop: this.state.gradientTop,
            gradientBottom: this.state.gradientBottom,
        };
    }

    render() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        // console.log("Target width" + (this.windowWidth * .8));

        return (
            <div>

                <Animate
                    start={{
                        gradientTop: 0,
                        gradientBottom: 0,
                        //timing: { duration: 3000 },
                    }}
                    update={this.update}
                >
                    {({ gradientTop, gradientBottom }) => {
                        return (
                            <div style={{
                                position: "fixed",
                                zIndex: 0,
                                height: "100%",
                                //margin: "auto",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                background: `linear-gradient(rgb(55, 55, 55, ${gradientTop}), rgb(55, 55, 55, ${gradientBottom}))`
                            }}>
                                <Container
                                    ref={this.container}
                                    style={{
                                        position: "fixed",
                                        zIndex: 0,
                                        height: "100%",
                                        maxWidth: this.windowWidth * .8,
                                        width: this.windowWidth * .8,
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                       
                                        marginLeft: this.windowWidth * .1,
                                        marginRight: this.windowWidth * .1,
                                        overflow: 'scroll',
                                        fontSize: "30px",
                                        color: "#dddddd",

                                    }}>
                                    <Row style={{
                                        height: this.windowHeight * .75
                                    }}></Row>
                                    <Row style={{
                                        fontSize: (this.windowWidth * .8) / 20
                                    }}>
                                        <Col xl={12} md={12} style={{ padding: 0 }}>Celebrating Grilling without getting in the way</Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ padding: 0 }}>
                                            {this.props.text}
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    }}

                </Animate>
            </div>

        )
    }
}
