import { Col, Container, Row } from "react-bootstrap";
import vision from "@/data/visiondata";
import Visioncard from "../cards/VisionCard";
import Image from "next/image";
import quote from "@/public/quote.svg"
import "@/style/Quoteicon.css"
export default function VisionofBD() {
    return (
        <section className="px-4">
            {/* This px -4 is very important for all device it will keep scpace between screen edge and the section 1.5 rem left and right */}

            <Container className="mb-5">
                <Row className="w-100 ps-2">
                    <Col className="mb-3 w-100" xs={12} sm={6} md={4} >
                        <h1 className="mb-3"> The Vision of Future</h1>
                        <p>
                            Bangladesh 2.0 aims to redefine the nation’s trajectory by embracing cutting-edge technology,
                            promoting inclusive growth, and ensuring sustainability. With initiatives in renewable energy,
                            digital transformation, and robust infrastructure, the country is set to become a global model
                            of development.
                        </p>
                    </Col>

                </Row>

                <Row className="mb-3">

                    {vision.map((visionDtails) => (
                        <Col key={visionDtails.id} xs={12} sm={6} md={4} className="mb-3">
                            <Visioncard visiondtails={visionDtails} />
                        </Col>))}

                </Row>

                <Row>
                    <Col style={{ backgroundColor: "#FFFFFF", borderRadius: "1rem", padding: "1rem 1rem" }}>
                        <p style={{ opacity: "60%" }}>
                            <Image src={quote} alt="Quote icon" className="quote-icon " />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quas,
                            ducimus labore sequi quos deserunt optio id repellendus tempora veniam amet
                            porro corporis exercitationem numquam debitis culpa laudantium odio, velit
                            vel minus sit? Veritatis aut maiores ducimus fugit error ex sit, dignissimos
                            eum tempora perferendis a rem culpa ab aliquid modi? Est vitae neque esse,
                            cumque, quam tenetur rem earum eaque mollitia modi ipsum aspernatur,
                            dignissimos excepturi aliquam architecto soluta necessitatibus vero?"
                        </p>

                        <h2 >Dr. Muhammad Yunus</h2>
                        <p style={{ opacity: "60%" }}>
                            Chief Adviser of the People's Republic of Bangladesh
                        </p>


                    </Col>
                </Row>
            </Container>
        </section>
    );
}