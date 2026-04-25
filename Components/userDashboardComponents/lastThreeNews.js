import NewsCard from "@/Components/cards/NewsCard";
import { Container, Row,Col } from "react-bootstrap";
import "@/style/NewsCard.css"
export default function LastThreeNews({newsList}) {
    return (
        <section>
            <Container>
                <Row >
                    {newsList.map((news) => (<Col key={news.id} xs={12} sm={12} md={12} lg={12} className="mb-3 p-2 NewsCard">
                        {
                             <NewsCard News={news}/>
                        }
                    </Col>))}
                </Row>

            </Container>
        </section>
    );
}