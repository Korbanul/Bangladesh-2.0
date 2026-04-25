"use client"
import { getNewsAdmin } from "@/Components/Auth/adminService";
import { getNews } from "@/Components/Auth/userService";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {  Card, Col, Container, Placeholder, Row} from "react-bootstrap";
import Swal from "sweetalert2";

export default function NewsDetails() {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchNews = async () => {
        try {
            setLoading(true);
            const data = await getNews(id);
            setNews(data);
            console.log(data)
        } catch (error) {
            Swal.fire({
                title: "News Loading Failed",
                icon: "error",
                text: error.errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <section className="bg-light min-vh-100 py-5">
            <Container>

                <Card className="border-0 shadow-sm rounded-4 overflow-hidden">

                    <div className="bg-danger" style={{ height: "4px" }} />

                    <Card.Body className="p-4 p-md-5">

                        {loading ? (
                            <>
                                <Placeholder as="div" animation="glow" className="mb-2">
                                    <Placeholder xs={3} size="sm" className="rounded" />
                                </Placeholder>
                                <Placeholder as="h2" animation="glow" className="mb-3">
                                    <Placeholder xs={10} />
                                    <Placeholder xs={7} />
                                </Placeholder>
                                <Placeholder as="div" animation="glow" className="mb-4">
                                    <Placeholder xs={5} size="sm" />
                                </Placeholder>
                                <Placeholder animation="glow">
                                    <Placeholder xs={12} style={{ height: "320px", borderRadius: "12px" }} />
                                </Placeholder>
                                <Placeholder as="p" animation="glow" className="mt-4">
                                    <Placeholder xs={12} />
                                    <Placeholder xs={11} />
                                    <Placeholder xs={10} />
                                    <Placeholder xs={6} />
                                </Placeholder>
                            </>
                        ) : news ? (

                            <>
                                <h1 className="fw-bold mb-2 lh-sm" >
                                    {news.title}
                                </h1>


                                <Row className="align-items-center border-top border-bottom py-2 my-3  text-muted" style={{ fontSize: "0.82rem" }}>
                                    {news.createdAt && (
                                        <Col xs="auto" className="text-secondary">
                                            {new Date(news.createdAt).toLocaleDateString("en-BD", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: true
                                            })}
                                        </Col>
                                    )}

                                </Row>

                                <div className="position-relative w-100 rounded-3 overflow-hidden mb-2" style={{ height: "380px" }}>
                                    <Image
                                        src={news.imgUrl}
                                        alt={news.title}
                                        fill
                                        sizes="(max-width: 780px) 100vw, 780px"
                                        style={{ objectFit: "cover" }}
                                        priority
                                    />
                                </div>

                                <hr className="my-4" />

                             
                                <div className="text-secondary lh-lg " style={{ fontSize: "1.05rem" }}>  {/* lh-lg = line height = large  */}
                                    {news.description}
                                </div>

                                {/* Footer for link copy */}
                                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-4">
                                    <small className="text-muted">Article #{id}</small>
                                    <button
                                        className="btn btn-sm btn-outline-dark"
                                        onClick={() => navigator.clipboard?.writeText(window.location.href)}
                                    >
                                        🔗 Copy Link
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-5 text-muted">
                                <div className="fs-1 mb-3">📰 </div>
                                <h5 className="fw-semibold text-dark">Article Not Found</h5>
                                <p className="small">This article may have been removed or is unavailable.</p>
                            </div>
                        )}

                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
}