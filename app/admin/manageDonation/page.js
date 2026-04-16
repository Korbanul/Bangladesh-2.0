"use client"
import { Button, Col, Container, Form, FormSelect, Modal, Row, Table } from "react-bootstrap";
import Image from "next/image";
import DonationHero from "@/public/donationHeroImage.jpg";
import "@/style/User/donation.css"
import { useForm } from "react-hook-form";
import CustomButton from "@/Components/common/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationinputval } from "@/Components/Validations/AuthSchema";
import DonationHistory from "@/Components/userDashboardComponents/table/donationHistory";
import { useEffect, useState } from "react";
import { adminDashboardAddPaymentMethod } from "@/Components/Validations/validationSchema";
import { addPaymentMethod, getDonationList, getPaymentMethodList } from "@/Components/Auth/adminService";
import Swal from "sweetalert2";
import { set } from "zod";
import PaymentMethodtable from "@/Components/userDashboardComponents/table/PaymentMethodTable";

export default function Donation() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(adminDashboardAddPaymentMethod),

    })

    const [showModal, setShowModal] = useState(false);

    const handleAddPaymentMethodModal = () => {
        setShowModal(true)
    }

    const handleAddPaymentMethod = async (data) => {
        console.log(data)
        try {
            const payload = {
                name: data.PaymentMethodName,
                logoUrl: data.PaymentMethodImageLink
            };
            const response = await addPaymentMethod(payload);
            fetchPaymentMethods()
            reset()
            setShowModal(false)
            await Swal.fire({ title: "Payment Method Added", icon: "success" });
        } catch (error) {
            await Swal.fire({ title: "Payment Method Not Added", icon: "error", text: error.errorMessage || "Can't Add Method Now" });
        };




    }
    const handleHeaderClose = () => {
        setShowModal(false)
    }
    const [PaymentMethodList, setPaymentMethodList] = useState([]);
    const [DonationList, setDonationList] = useState([]);

    const fetchPaymentMethods = async () => {
        try {
            const list = await getPaymentMethodList();
            setPaymentMethodList(list);
        } catch (error) {
            // await Swal.fire({
            //     title: "Payment Method List Not Found",
            //     icon: "error",
            //     text: error.errorMessage || "Can't Find Method List Now"
            // });
        }
    };
    const fetchDonationList = async () => {
        try {
            const list = await getDonationList();
            setDonationList(list);
        } catch (error) {
           
        }
    };
    useEffect(()=> { 
        fetchPaymentMethods()
        fetchDonationList()
    }, [])

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
                                src="/donationHeroImage.jpg"
                                alt="Support Bangladesh"
                                fill
                                priority
                                quality={[75, 100]}
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
                <Button className="mt-3" type="button" onClick={handleAddPaymentMethodModal}>
                    Add Payment Method
                </Button>
                <Modal
                    show={showModal}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>Add Payment Method</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit(handleAddPaymentMethod)} >
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label >Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. Bkash"
                                    {...register("PaymentMethodName")}
                                    isInvalid={!!errors.PaymentMethodName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.PaymentMethodName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Logo Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Paste the image link"
                                    {...register("PaymentMethodImageLink")}
                                    isInvalid={!!errors.PaymentMethodImageLink}
                                />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                {errors.PaymentMethodImageLink?.message}
                            </Form.Control.Feedback>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" type="button" onClick={handleHeaderClose} >
                                Cancle
                            </Button>
                            <Button variant="success" type="submit">
                                Confirm Adding
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <PaymentMethodtable data={PaymentMethodList}/>
                <DonationHistory data={DonationList} />

            </Container>
        </section >
    );
}