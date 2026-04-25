"use client"
import Image from "next/image";
import { Button, Card, Col, Row } from "react-bootstrap";
import "@/style/NewsCard.css"
import Link from "next/link";
import { useAuth } from "@/app/context/authContext";
import Swal from "sweetalert2";
import { deleteNews } from "../Auth/adminService";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NewsCard({ News }) {
    const { user } = useAuth()
    const [deleting,setDeleting] =useState(null);
    const pathname = usePathname();              
    const isHomePage = pathname === "/";  
    const handleDelete = async () => {
        try {
            setDeleting(true)
            const response = await deleteNews(News.id)
            Swal.fire(
                {
                    title: "News with id: " + News.id + " deleted",
                    icon: "success"
                }
            )
        } catch (error) {
            Swal.fire(
                {
                    title: " Can't delete now",
                    icon: "error",
                    text:error.errorMessage
                }
            )
        }finally{
            setDeleting(false);
        }
    }
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
                            WebkitLineClamp: 3, // to show few line number else hidden
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
                                <div className="d-flex gap-2">
                                    <Button className="btn-success" as={Link}
                                        href={`/admin/manageNews/${News.id}`}
                                        target="_blank">Read More
                                    </Button>
                                    
                                    {!isHomePage && ( 
                                        <Button className="btn-danger" onClick={handleDelete}>
                                            {deleting ? "Deleting..." : "Delete"}
                                        </Button>
                                    )}
                                </div>
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
            </Row>
        </Card>
    );
}