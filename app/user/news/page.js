"use client"
import { getAllNewsUser } from "@/Components/Auth/userService";
import LastThreeNews from "@/Components/userDashboardComponents/lastThreeNews";
import { useEffect, useState } from "react";
import { Container, Row,Col } from "react-bootstrap";

export default function News() {
    const [allNews, setallNews] = useState([]);
    const fetchAllNews = async () => {
            try {
                const response = await getAllNewsUser();
                setallNews(response);
            } catch (error) {
                console.log(error);
            }
    
        }
    
        useEffect(() => {
            fetchAllNews();
        }, [])
    return (
        <section>
            <Container>
                <Row>
                    <Col>
                        <h4 className="fw-bold">News</h4>
                        <p className="text-muted mb-0">Update news about Bangladesh 2.0 </p>
                    </Col>
                </Row>
                 <LastThreeNews newsList={allNews}/>
            </Container>
        </section>
    );
}