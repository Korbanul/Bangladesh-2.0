"use client";
import Image from 'next/image';
import { Carousel, Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import '@/style/User/explore.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminImageUpload } from '@/Components/Validations/validationSchema';
import Swal from 'sweetalert2';
import { getAllImage, uploadImage } from '@/Components/Auth/adminService';
import { useEffect, useState } from 'react';
import { useListContext } from '@/app/context/donationListContextProvider';



const slides = [
    { id: 1, src: '/hero1.jpg', title: 'Discover Innovation', desc: 'Explore the latest in tech.' },
    { id: 2, src: '/hero2.jpg', title: 'Future Solutions', desc: 'Building tomorrow, today.' },
    { id: 3, src: '/hero3.jpg', title: 'Exprience the nature', desc: 'Building tomorrow, today.' },
];


export default function Explore() {

    const {fetchAllImages,allImages}=useListContext(); //Using this contextApi for showing all images 
    const [isUploaded,setisUploaded]=useState(false);

    useEffect( () => {
        fetchAllImages();
    }, [isUploaded])


    const [loading, setLoading] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm(
        {
            resolver: zodResolver(adminImageUpload)
        }
    );

    const handleFileUpload = async (data) => {
        const file = data.image[0];
        //  console.log(data);          
        // console.log("file:", file);          // must be File object
        // console.log("file name:", file?.name); // must show filename.jpg
        try {
            setLoading(true);
            const response = await uploadImage(file);
            reset()
            await Swal.fire({
                title: "Image Uploaded", icon: "success"
            })
            setisUploaded(true);
        } catch (error) {
            await Swal.fire({
                title: "Image Uploaded Failed",
                icon: "error",
                text: error.errorMessage
            })
        } finally {
            setLoading(false);
        }


    }
    return (
        <section className="exploreSection">
            {/* Slide Show Section */}
            <div className="carouselWrapper">
                <Carousel fade indicators={false} interval={1000} pause="hover">
                    {slides.map((slide) => (
                        <Carousel.Item key={slide.id} className="carouselItem">
                            <Image
                                src={slide.src}
                                alt={slide.title}
                                fill
                                priority
                                className="heroImage"
                            />
                            <Carousel.Caption className="customCaption">
                                <h2 className="display-4 fw-bold">{slide.title}</h2>
                                <p className="lead">{slide.desc}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <Container className='mt-5'>
                <Row className='d-flex flex-column '>
                    <Form onSubmit={handleSubmit(handleFileUpload)}>
                        <Col>

                            <Form.Group>
                                <Form.Label className='fw-bold fs-5'>Upload Image</Form.Label>
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

                        </Col>
                        <Col className='mt-3'>
                            <Button type="submit">{loading
                                ? <><Spinner size="sm" className="me-2" />Uploading...</>
                                : "Upload to Cloudinary"
                            }</Button>
                        </Col>
                    </Form>
                </Row>
            </Container>

            {/* Gallery Section */}
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h2 className="sectionTitle">Visual Gallery</h2>
                    <div className="underline"></div>
                </div>
                <Row className="g-4">
                    {allImages.map((item) => (
                        <Col key={item.publicId} xs={12} sm={6} lg={3}>
                            <div className="galleryCard">
                                <div className="imageContainer">
                                    <Image
                                        src={item.imageUrl}
                                        alt="images"
                                        width={400}
                                        height={300}
                                        className="galleryImage"
                                    />
                                    <div className="overlay">
                                        <span>View Details</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}