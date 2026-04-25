"use client"
import Image from "next/image";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import "@/style/NewsCard.css"
import { useAuth } from "@/app/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NewsCard({ News }) {
    const pathname = usePathname();              
        const isHomePage = pathname === "/";  
    const { user } = useAuth();
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
                        {user ?
                            user?.roles == "ROLE_ADMIN" ?
                                <>
                                    <Button className="btn-success" as={Link}
                                        href={`/admin/manageNews/${News.id}`}
                                        target="_blank">Read More
                                    </Button>
                                   
                                </>

                                : <Button className="btn-success" as={Link}
                                    href={`/user/news/${News.id}`}
                                    target="_blank"
                                >Read More</Button>
                            :


                            <Button className="btn-success" as={Link}
                                href={`/user/news/${News.id}`}
                                target="_blank"
                            >Read More</Button>
                        }

                    </Card.Body>


                </Col>

                <Col md={4}>
                    <Card.Img src={News.imgUrl} alt="Satelite Image" className="CardImg" />
                </Col>
            </Row>
        </Card>
    );
}