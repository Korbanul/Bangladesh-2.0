"use client"
import { useAuth } from "@/app/context/authContext";
import { useListContext } from "@/app/context/donationListContextProvider";
import { CreateNews, getAllNews } from "@/Components/Auth/adminService";
import LastThreeNews from "@/Components/userDashboardComponents/lastThreeNews";
import { Newsform } from "@/Components/Validations/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function News() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(Newsform)
    })
    const [loading, setLoading] = useState(false);
    const [isNewsCreated, setIsNewsCreated] = useState(false);
    const [allNews, setallNews] = useState([]);
    const {isnewsDeleted} =useListContext();
    const handleNewsForm = async (data) => {

        try {
            setLoading(true);

            const response = await CreateNews(data);
            reset()
            setIsNewsCreated(true)
            Swal.fire({
                title: "News Added Successfully",
                icon: "success",
                timer: 2000
            })
        } catch (error) {
            Swal.fire({
                title: "Failed",
                icon: "error",
                text: error.errorMessage,
                timer: 2000
            })
        } finally {
            setLoading(false);
        }

        
    }
    const fetchAllNews = async () => {
        try {
            const response = await getAllNews();
            setallNews(response);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchAllNews();
    }, [isNewsCreated,isnewsDeleted])
    return (
        <section>
            <Container>

                <Row >
                    <div className="d-flex justify-content-center  border rounded-4 my-4 p-4 shadow-lg ">
                        <Form onSubmit={handleSubmit(handleNewsForm)}>
                            <Col>
                                <div className="d-flex justify-content-center">
                                    <h5>Add News</h5>
                                </div>

                                {/* //As we need to send image + text to backend we need to use fromData */}
                                <Form.Group>
                                    <Form.Label className='fw-sm fs-6'>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...register("title")}
                                        placeholder='Enter title'
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.title?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='fw-sm fs-6'>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        {...register("description")}
                                        placeholder='Write description'
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.description?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='fw-sm fs-6'>Add Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        {...register("image")}
                                        placeholder='Choose an image'
                                        isInvalid={!!errors.image}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.image?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="mt-3 d-flex justify-content-center">
                                    <Button type="submit">{loading ? <><Spinner size="sm" className="me-2" />Creating...</> : "Submit"}</Button>
                                </div>

                            </Col>
                        </Form>
                    </div>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h4 className="fw-bold">News</h4>
                        <p className="text-muted mb-0">Update news about Bangladesh 2.0 </p>
                    </Col>
                </Row>
                <LastThreeNews newsList={allNews} />
            </Container>
        </section>
    );
}