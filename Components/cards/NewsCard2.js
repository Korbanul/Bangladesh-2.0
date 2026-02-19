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
                        <Card.Title style={{fontWeight:"700"}}><h2>{News.title}</h2></Card.Title>
                        <Image src={News.imgpath} alt="News" 
                            width={134}
                            height={40} 
                            />      
                        <Card.Text>
                            <small className="d-block mb-2">Date: {News.Date} &nbsp; &nbsp; Time: {News.Time}</small>
                        
                            {News.description}
                        </Card.Text>
                        <CustomButton variant="success">Read More</CustomButton>
                    </Card.Body>


                </Col>

                <Col md={4}>
                    <Card.Img src="./satellite.png" alt="Satelite Image" className="CardImg" />
                </Col>
            </Row>
        </Card>
    );
}