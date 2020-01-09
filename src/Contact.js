import React from 'react';
import { Container, Col, Row } from 'react-grid-system';
import InfoDump from './InfoDump';

export default class Contact extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: "100px" ,width:"80%"}} fluid>
                <Row>
                    <Col md={10} style={{paddingLeft: "0px"}}>
                        <div className='infoDumpTitle'>
                            Contact
                        </div>
                        <div className='infoDumpText' style={{width: "60%"}}>
                           Whether you need a smarter app, a next-generation technology like IoT, AR/VR, ambient computing, or something entirely unprecedented, CARNEVALE is your partner.
                        </div>
                    </Col>
                    <Col md={2} style={{paddingLeft: "0px"}}>
                        <p>
                            44 Grandville Ave SW <br />
                            Suite 320 <br />
                            Grand Rapids, MI 49503 <br />
                            <br />
                            +1 616 233 9998 <br />
                            info@carnevale.co <br />
                            <br />
                            Facebook <br />
                            Instragram <br />
                            Linkedin <br />
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}