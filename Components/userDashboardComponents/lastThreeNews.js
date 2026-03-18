import NewsCard from "@/Components/cards/NewsCard";
import Newsdata from "@/data/newsdata";
import { Container, Row,Col } from "react-bootstrap";

export default function LastThreeNews() {
    return (
        <section>
            <Container>
                <Row >
                    {Newsdata.map((newsdata) => (<Col key={newsdata.id} xs={12} sm={12} md={12} lg={12} className="mb-4 p-4 NewsCard">
                        {
                             <NewsCard News={newsdata}/>
                        }
                    </Col>))}
                </Row>

            </Container>
        </section>
    );
}