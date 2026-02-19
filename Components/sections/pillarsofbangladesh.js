import { Col, Container, Row } from "react-bootstrap";
import pillars from "@/data/pillarsdata"
import PillarsCard from "../cards/pillarsCard";
import '@/style/pillersection.css'
export default function PillersofBD() {
    return (
        <section>
            <Container className="Pillersection">
                
                <Row className="w-100">
                    <Col >
                        <h1 className="mb-4">
                            Pillars of "Bangladesh 2.0"
                        </h1>
                    </Col>
                </Row>

                <Row >
                    {pillars.map((pDtails) => (
                        //In large screen each card will take 3 column total 12 col so 12/3= 4 card in large screen 
                        <Col key={pDtails.id} xs={12}  sm={6} md={4} lg={3} className="mb-3"> 
                            <PillarsCard pillarsDtails={pDtails} />
                        </Col>
                    ))}
                </Row>

            </Container>
        </section>
    );
}
