import LastThreeNews from "@/Components/userDashboardComponents/lastThreeNews";
import { Container, Row,Col } from "react-bootstrap";

export default function News() {
    return (
        <section>
            <Container>
                <Row>
                    <Col>
                        <h4 className="fw-bold">News</h4>
                        <p className="text-muted mb-0">Update news about Bangladesh 2.0 </p>
                    </Col>
                </Row>
                 <LastThreeNews/>
            </Container>
        </section>
    );
}