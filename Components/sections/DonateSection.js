"use client"
import { Col, Container, Form, Row } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import "@/style/DonationSection.css"

export default function DonateSection() {
    return (
        <section>
            <Container className="mb-5">
                <Row >
                    <Col >
                        <h2 style={{ textAlign: "center" }}>
                            Donate Today
                        </h2>
                        <p style={{ textAlign: "center" }}>
                            Bangladesh 2.0 aims to redefine the nation’s trajectory by embracing
                            cutting-edge technology, promoting inclusive growth, and ensuring
                            sustainability. With initiatives in renewable energy, digital transformation,
                            and robust infrastructure.
                        </p>
                    </Col>
                </Row>
                <Row className="px-5 mx-4">
                    <Col md={3} lg={3} sm={6} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">100 Taka</CustomButton>
                    </Col>
                    <Col md={3} lg={3} sm={6} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">200 Taka</CustomButton>
                    </Col>
                    <Col md={3} lg={3} sm={6} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">500 Taka</CustomButton>
                    </Col>
                    <Col md={3} lg={3} sm={6} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">1000 Taka</CustomButton>
                    </Col>
                </Row>
                <Form>
                    <Row className=" align-items-center justify-content-center d-flex flex-column  ">

                        <Col className="mt-3 mb-4 inputbox">
                            <Form.Control
                                type="text"
                                placeholder="Other Amount (Taka)"
                                size="lg"
                                className="text-center"
                            />
                        </Col>

                        <Col xs="auto">
                            <CustomButton variant="success" size={"lg"}>
                                Donate Now
                            </CustomButton>
                        </Col>

                    </Row>
                </Form>


                
            </Container>
        </section>
    );
}