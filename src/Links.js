import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import LinkGroup from "./LinkGroup";

export default class Links extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: "100px" ,width:"80%"}} fluid>
                <Row>
                    <Col style={{paddingLeft: "0px"}}>
                        <LinkGroup title="Consumer" links={consumerLinks} />
                    </Col>
                    <Col style={{paddingLeft: "0px"}}>
                        <LinkGroup title="Education" links={educationLinks} />
                        <LinkGroup title="Financial" links={financialLinks} />
                    </Col>
                    <Col style={{paddingLeft: "0px"}}>
                        <LinkGroup title="Healthcare" links={healthcareLinks} />
                        <LinkGroup title="Industrial" links={industrialLinks} />
                    </Col>
                    <Col style={{paddingLeft: "0px"}}>
                        <LinkGroup title="Media" links={mediaLinks} />
                        <LinkGroup title="Non-Profit" links={nonProfitLinks} />
                    </Col>
                </Row>
            </Container>
        )
    }
}


const consumerLinks = ["Pepsi", "Microsoft", "Cumberland Furniture", "Celebrity Cruises", "Lego", "Tiara Yachts", "Rockstar Games", "Mattel", "Amyway", "Newell", "Whirlpool", "Traeger", "GolfLogix", "Graco", "Steelcase", "Take Two Games", "Christies"];
const educationLinks = ["National Heritage Academies", "Harper Collins", "Zondervan", "National Geographic Kids"];
const financialLinks = ["Reuters", "GFT", "NYSE Euronext", "K2 Intelligence", "Federal Home Loan Bank of Cincinnati", "Fifth Third Bank"];
const healthcareLinks = ["Perrigo", "Phyzer", "Stryker", "Spectrum Health", "Van Andel Institute"];
const industrialLinks = ["TGW", "Cascade Engineering", "Dematic", "Johnson Controls", "Viastore", "SAF Holland", "QNX"];
const mediaLinks = ["CMT", "Warner Bros.", "Fox News", "Viacom", "Mass Appeal", "VH1", "Speed Media Group"];
const nonProfitLinks = ["Queens Botanical Garden", "Gilda's LaughFest", "WMCAT", "Universal Hip Hop Museum", "ICCF"];