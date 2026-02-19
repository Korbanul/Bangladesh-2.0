import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";


export default function FooterBD() {
    return (
        <section>
            <Container fluid>
                <Row className="d-flex flex-column align-items-center justify-content-center pt-5 pb-4" style={{ backgroundColor: "white" }}>
                    <Col>
                        <h2 style={{ fontWeight: 700, textAlign: "center" }}>
                            Bangladesh 2.0
                        </h2>
                        <hr className="mx-5" />
                    </Col>
                    <Col xs={12} md={12} lg={12} className="d-flex align-items-center justify-content-center">
                        <Image
                            src={"/Facebook_Logo_Primary.png"}
                            alt="facebook"
                            width={25}
                            height={25}
                            className="mx-2"
                        />

                        <Image
                            src={"/instagram.png"}
                            alt="Instagram"
                            width={25}
                            height={25}
                            className="mx-2"
                        />
                        <Image
                            src={"/twitter.png"}
                            alt="Twitter"
                            width={25}
                            height={25}
                            className="mx-2"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}