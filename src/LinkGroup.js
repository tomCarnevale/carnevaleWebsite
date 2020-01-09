import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

export default class LinkGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            links: props.links
        }
    }

    render() {
        return (
            <div style={{paddingBottom: "40px"}}>
                <div style={{fontSize: 30}}>
                    {this.state.title}
                </div>
                <div>
                    {this.state.links.map(link => (
                        <p key={link}>{link}</p>
                    ))}
                </div>
            </div>
        )
    }

}