"use client"
import { Col, Container, Form, FormSelect, Row, Table } from "react-bootstrap";
import Image from "next/image";
import DonationHero from "@/public/donationHeroImage.jpg";
import "@/style/User/donation.css"
import { useForm } from "react-hook-form";
import CustomButton from "@/Components/common/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationinputval } from "@/Components/Validations/AuthSchema";
import { Download } from "lucide-react";
import DonationHistory from "@/Components/userDashboardComponents/table/donationHistory";

export default function Donation() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(donationinputval),
        defaultValues: {
            donationamount: 100,
        }
    })
    return (
        <section className="py-4">
            <Container>
                {/* Header Section */}
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="fw-bold text-dark mb-1">Donation</h2>
                        <p className="text-muted fs-5">
                            Manage your contributions and support the vision for Bangladesh 2.0.
                        </p>
                    </Col>
                </Row>

                {/* Hero Image Card */}
                <Row>
                    <Col xs={12}>
                        <div className="position-relative overflow-hidden shadow-sm rounded-4"
                            style={{
                                height: "350px", border: "1px solid #eee"

                            }}>
                            <Image
                                src={DonationHero}
                                alt="Support Bangladesh"
                                fill
                                priority
                                quality={75}
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center"
                                }}
                                className="transition-all hover-zoom"
                            />
                            <div className="position-absolute bottom-0 start-0 w-100 p-4"
                                style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
                                <span className="badge bg-success mb-2">Impactful Giving</span>
                                <h3 className="text-white fw-bold">Together for a Better Future</h3>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className=" mx-4 mt-5">
                    <Col md={3} lg={3} sm={12} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">100 Taka</CustomButton>
                    </Col>
                    <Col md={3} lg={3} sm={12} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">200 Taka</CustomButton>
                    </Col>
                    <Col md={3} lg={3} sm={12} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">500 Taka</CustomButton>
                    </Col>
                    <Col md={3} lg={3} sm={12} xs={12}>
                        <CustomButton variant="light" size={"lg"} className="mb-2 modifyDonationbutton">1000 Taka</CustomButton>
                    </Col>
                </Row>
                <Form >
                    <Row className=" align-items-center justify-content-center d-flex flex-column  ">

                        <Col className="mt-3 mb-4 inputbox " md={4} lg={4}>
                        <Form.Label >Others Amount:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Other Amount (Taka)"
                                size="lg"
                                className="text-center amountinput"
                                {...register("donationamount")}

                            />
                        </Col>

                        <Col xs="auto">
                            <CustomButton variant="success" size={"lg"} >
                                Donate Now
                            </CustomButton>
                        </Col>

                    </Row>
                </Form>
             <DonationHistory/>
               
            </Container>
        </section>
    );
}