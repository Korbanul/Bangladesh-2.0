import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import "@/style/SubscribeSection.css"
export default function SubscribeSection() {
    return (
        <section>
            {/* This px -4 is very important for all device it will keep scpace between screen edge and the section 1.5 rem left and right */}

            <Container className="SubscribeBox mb-5">
                <Row >
                    <Col className="mb-3">
                        <h2 style={{ textAlign: "center", color: "black" }}>Subscribe Newsletter</h2>
                        <p style={{ textAlign: "center" }}>
                            Bangladesh 2.0 aims to redefine the nation’s
                            trajectory by embracing cutting-edge technology,
                            promoting inclusive growth.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={6}>
                        <div className="d-flex flex-column flex-md-row gap-1 gap-md-0 ">
                            {/* For md or large gap will be 0 */}
                            {/* flex-md-row means when screen size is md or larger show as flex and in row wise if sm show flex in column */}
                            <Form.Control
                                placeholder="Enter your email here"
                                className="Inputbox flex-grow-1"
                            />

                            <CustomButton variant="success" className="w-50 w-md-auto align-self-center align-self-md-auto">
                                {/* width will be 50% if screen md or large it will be auto
                                        align-self always works on the cross axis.
                                 for control 1 single item use self, align center  cross-axis = horizontaly when flex is column then it center in rowise and when flex it 
                                 */}
                                Subscribe
                            </CustomButton>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className="mt-3">
                        <p style={{ textAlign: "center" }}>We promise not to spam you!</p>
                    </Col>
                </Row>



            </Container>
        </section>
    );
}