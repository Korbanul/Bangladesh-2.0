"use client"
import { Button, Col, Container, Dropdown, DropdownToggle, Form, Image, Modal, Row } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import "@/style/DonationSection.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationinputval, donorInfoSchema } from "../Validations/AuthSchema";
import { useEffect, useState } from "react";
import { getAllActivePaymentMethod, guestDonate } from "../Auth/userService";
import Swal from "sweetalert2";

export default function DonateSection() {

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm(
        {
            resolver: zodResolver(donationinputval),
            defaultValues: {
                donationamount: 100,
            },
        }

    )

    const {
        register: guestHeaderRegister,
        reset: guestHeaderReset,
        handleSubmit: guestHeaderHandleSubmit,
        formState: { errors: guestHeaderErrors }
    } = useForm({
        resolver: zodResolver(donorInfoSchema)
    })

    const handleDonationSubmit = (data) => {
        setShowModel(true);
        setPendingAmount(data.donationamount.toFixed(2))
        fetchactivePaymentMethodList() //when user click 1st donate then fetch all method to show in Modal
    }
    const handleHeaderClose = () => {
        setShowModel(false)
    }
    const handleHeaderFinalSubmit = async (Guestdata) => {
        const finaldata = {
            amount: pendingAmount,
            name: Guestdata.guestName,
            phone: Guestdata.guestPhone,
            paymentMethodId: Guestdata.paymentmethod
        }
        const selectedMethod = activePaymentMethodList.find(
            (m) => m.id === Number(Guestdata.paymentmethod)
        );
        // console.log(finaldata)
        try {
            const response = await guestDonate(finaldata);
            await Swal.fire({
            title: "Payment Successful!",
            icon: "success",
            confirmButtonText: "Done",
            html: `
                <div style="text-align:left; font-size:14px; line-height:2">
                    <hr/>
                    <p><strong>Name</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${Guestdata.guestName}</p>
                    <p><strong>Phone</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${Guestdata.guestPhone}</p>
                    <p><strong>Amount</strong> &nbsp;&nbsp;&nbsp;&nbsp;: ৳ ${pendingAmount}</p>
                    <p><strong>Method</strong> &nbsp;&nbsp;&nbsp;&nbsp;: ${selectedMethod?.name}</p>
                    <p><strong>Txn ID</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <code>${response.transactionId}</code></p>
                    <p><strong>Status</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style="color:green; font-weight:600">${response.status}</span></p>
                    <hr/>
                    <p style="font-size:12px; color:gray; text-align:center">Keep this transaction ID for your records.</p>
                </div>
            `,
        })
            setShowModel(false)
            guestHeaderReset()
        } catch (error) {
            await Swal.fire({
                title: "Failed",
                text: "Payment Unsuccessful",
                icon: "error",
            })

        }
       

    }
    const fetchactivePaymentMethodList = async () => {
        const list = await getAllActivePaymentMethod();
        setActivePaymentMethodList(list)

    }




    const [selected, setSelected] = useState(null)
    const [showModel, setShowModel] = useState(false)
    const [pendingAmount, setPendingAmount] = useState(null);
    const [activePaymentMethodList, setActivePaymentMethodList] = useState([])
    return (
        <section>
            <Container className="mb-5">
                <Row >
                    <Col >
                        <h2 style={{ textAlign: "center" }}>
                            Donate Today
                        </h2>
                        <p style={{ textAlign: "center" }}>
                            Bangladesh 2.0 aims to redefine the nation’s trajectory by embracing
                            cutting-edge technology, promoting inclusive growth, and ensuring
                            sustainability. With initiatives in renewable energy, digital transformation,
                            and robust infrastructure.
                        </p>
                    </Col>
                </Row>
                <Row className="px-5 mx-4">
                    {[100, 200, 500, 1000].map((amount) => (
                        <Col md={3} lg={3} sm={6} xs={12} key={amount}>
                            <CustomButton
                                variant={selected === amount ? "warning" : "light"}
                                size={"lg"} type="button"
                                className="mb-2 modifyDonationbutton"
                                onClick={() => {
                                    setSelected(amount)
                                    setValue("donationamount", amount, { shouldValidate: true })
                                }}>
                                {amount} Taka</CustomButton>
                        </Col>
                    ))}

                </Row>
                <Form onSubmit={handleSubmit(handleDonationSubmit)}>
                    <Row className=" align-items-center justify-content-center d-flex flex-column  ">

                        <Col className="mt-3 mb-4 inputbox">
                            <Form.Control
                                type="number"
                                step="0.01"
                                placeholder="Other Amount (Taka)"
                                size="lg"
                                className="text-center"
                                {...register("donationamount", { valueAsNumber: true })}
                                isInvalid={!!errors.donationamount}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.donationamount?.message}
                            </Form.Control.Feedback>

                        </Col>

                        <Col xs="auto">
                            <CustomButton variant="success" size={"lg"} type="submit" >
                                Donate Now
                            </CustomButton>
                        </Col>

                    </Row>
                </Form>
                {/*PopUp model for Guest Donation Details */}
                <Modal
                    show={showModel}
                    centered

                >
                    <Modal.Header>
                        <Modal.Title>Complete Your Donation</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={guestHeaderHandleSubmit(handleHeaderFinalSubmit)}>
                        <Modal.Body>
                            <p className="text-muted">
                                Donating <span className="text-success fw-bold">{pendingAmount} </span>Taka — please provide your details.
                            </p>
                            <Form.Group>
                                <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    {...guestHeaderRegister("guestName")}
                                    placeholder="Enter Full Name"
                                    isInvalid={!!guestHeaderErrors.guestName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {guestHeaderErrors.guestName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="py-3">
                                <Form.Label>Phone<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="tel"
                                    {...guestHeaderRegister("guestPhone")}
                                    placeholder="e.g 01xxxxxxxxx"
                                    isInvalid={!!guestHeaderErrors.guestPhone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {guestHeaderErrors.guestPhone?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label> Payment Method <span className="text-danger"> *</span></Form.Label>
                                <Row>
                                    {/* Getting all the active Payment Method and printing the name and logo */}
                                    {activePaymentMethodList.map((method) =>
                                        <Col xs={12} md={4} lg={4} key={method.name}>

                                            <Form.Check
                                                inline
                                                type="radio"
                                                label={<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <span>{method.name}</span>
                                                    <img
                                                        src={method.logoUrl}
                                                        alt={method.name}
                                                        width="24"
                                                        height="24"
                                                    />

                                                </div>}
                                                value={method.id}

                                                isInvalid={!!guestHeaderErrors.paymentmethod}
                                                {...guestHeaderRegister("paymentmethod")}
                                            />
                                        </Col>

                                    )}
                                </Row>
                                <Form.Control.Feedback type="invalid">
                                    {guestHeaderErrors.paymentmethod?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center">
                            <Button variant="outline-secondary" type="button" onClick={handleHeaderClose} >
                                Cancle
                            </Button>
                            <Button variant="success" type="submit">
                                Confirm Donation
                            </Button>
                        </Modal.Footer>

                    </Form>


                </Modal>



            </Container>
        </section >
    );
}