"use client";
import Image from 'next/image';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import '@/style/User/explore.css';
import { useEffect } from 'react';
import { useListContext } from '@/app/context/donationListContextProvider';


const slides = [
    { id: 1, src: '/hero1.jpg', title: 'Discover Innovation', desc: 'Explore the latest in tech.' },
    { id: 2, src: '/hero2.jpg', title: 'Future Solutions', desc: 'Building tomorrow, today.' },
    { id: 3, src: '/hero3.jpg', title: 'Future Solutions', desc: 'Building tomorrow, today.' },
];


export default function Explore() {

    const{fetchAllImages,allImages}=useListContext();

    useEffect(()=>{
        fetchAllImages();
    },[])
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