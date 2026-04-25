"use client"
import Image from "next/image";
import { Card, Col, Row } from "react-bootstrap";
import "@/style/NewsCard.css"
import CustomButton from "../common/CustomButton";
export default function NewsCard({ News }) {
    const truncate = (text, limit = 150) => {
        if (!text) return "";
        return text.length > limit ? text.slice(0, limit) + " ..." : text;
    };
    return (
        <Card className="w-100 eachcard">
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} sm={12} md={4}>
                    <Card.Img src={News.imgUrl} alt="Image" className="CardImg img-fluid" />

                </Col>

                <Col xs={12} sm={12} md={8}>
                    <Card.Body>


                        <Card.Title style={{ fontWeight: "700" }}><h5>{News.title}</h5></Card.Title>
                        <Image src="/Aljazeera.png" alt="News"
                            width={134}
                            height={40}
                            className="mb-2 img-fluid"

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
            </Row>
        </Card>
    );
}