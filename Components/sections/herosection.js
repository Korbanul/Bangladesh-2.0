import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import Flag from "@/public/image.png"
import Image from "next/image";
import '@/style/heroSection.css'
export default function HeroSection() {
    return (
        <section className="px-4">
            {/* This px -4 is very important for all device it will keep scpace between screen edge and the section 1.5 rem left and right */}
            <Container className="heroSection ">
                <Row className="align-items-center ">
                    <Col xs={12} sm={6} md={6}>
                        <small style={{ fontWeight: 600, color: "gray" }}>Bangladesh 2.0</small>
                        <h2>Idea, innovation, vision and challenges in New Bangladesh.</h2>
                        <CustomButton variant="success" size="md">
                            Explore New Bangladesh
                        </CustomButton>

                    </Col >
                    <Col md={6} xs={12} sm={6} >
                        <Image
                            src={Flag}                          
                            alt="Bangladesh Flag"
                            className="img-fluid"
                            priority

                            quality={100}

                        />
                    </Col>
                </Row>
            </Container>
        </section>

    );
}