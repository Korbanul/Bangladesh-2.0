import { Col, Container, Row } from "react-bootstrap";
import Newsdata from "@/data/newsdata"
import NewsCard from "../cards/NewsCard";
import NewsCard2 from "../cards/NewsCard2";
import "@/style/NewsCard.css"

export default function RecentNewSection() {
    return (
        <section className="px-4">
         {/* This px -4 is very important for all device it will keep scpace between screen edge and the section 1.5 rem left and right */}

            <Container className="mt-5">
                <Row>
                    <Col className="mb-2">
                        <h2>Recent News</h2>
                        <p>
                            Bangladesh 2.0 aims to redefine the nation’s trajectory by embracing cutting-edge technology,
                            promoting inclusive growth, and ensuring sustainability. With initiatives in renewable energy,
                            digital transformation, and robust infrastructure, the country is set to become a global model
                            of development.
                        </p>
                    </Col>
                </Row>

                <Row >
                        {Newsdata.map((newsdata)=>(<Col key={newsdata.id} xs={12} sm={12} md={12} lg={12} className="mb-4 p-4 NewsCard">
                                {
                                    newsdata.id%2==1 ? <NewsCard News={newsdata} />  : <NewsCard2 News={newsdata}/>
                                }
                        </Col>))}
                </Row>


            </Container>
        </section>
    );
}