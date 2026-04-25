"use client"
import Image from "next/image";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import "@/style/NewsCard.css"
import CustomButton from "../common/CustomButton";
export default function NewsCard({ News }) {
    return (
        <Card className="w-100 eachcard">
            <Row >
                <Col md={8}>
                    <Card.Body>
                        <Card.Title style={{ fontWeight: "700" }}><h2>{News.title}</h2></Card.Title>
                        <Image src="/Aljazeera.png" alt="News"
                            width={134}
                            height={40}
                        />
                        <Card.Text style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // Change this to your desired line number
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }} >
                            <small className="d-block  mb-2">Date:
                                {News.createdAt ? new Date(News.createdAt).toLocaleString("en-BD", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: true
                                })
                                    : "—"}
                            </small>
                            {News.description}
                        </Card.Text>
                        <CustomButton variant="success">Read More</CustomButton>
                    </Card.Body>


                </Col>

                <Col md={4}>
                    <Card.Img src={News.imgUrl} alt="Satelite Image" className="CardImg" />
                </Col>
            </Row>
        </Card>
    );
}