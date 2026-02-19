import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import "@/style/SubscribeSection.css"
export default function SubscribeSection() {
    return (
        <section>
            <Container className="SubscribeBox mb-5">
                <Row >
                    <Col className="mb-3">
                        <h2 style={{ textAlign: "center" ,color:"black"}}>Subscribe Newsletter</h2>
                        <p style={{ textAlign: "center" }}>
                            Bangladesh 2.0 aims to redefine the nation’s
                            trajectory by embracing cutting-edge technology,
                            promoting inclusive growth.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className=" align-items-center justify-content-center d-flex   ">

                        <Form.Control
                            placeholder="Enter your email here"
                            size="sm"
                            className="Inputbox"

                        />
                        <CustomButton variant="success">
                            Subscribe
                        </CustomButton>

                    </Col>
                    <Col md={12} lg={12} sm={12} xs={12} className="mt-3">
                        <p style={{ textAlign: "center" }}>We promise not to spam you!</p>
                    </Col>
                </Row>



            </Container>
        </section>
    );
}