"use client"
import { Col, Container, Form, FormSelect, Modal, Row, Table, Button } from "react-bootstrap";
import Image from "next/image";
import DonationHero from "@/public/donationHeroImage.jpg";
import "@/style/User/donation.css"
import { useForm } from "react-hook-form";
import CustomButton from "@/Components/common/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationinputval, donorInfoSchema2 } from "@/Components/Validations/AuthSchema";
import DonationHistory from "@/Components/userDashboardComponents/table/donationHistory";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { getAllActivePaymentMethod, userDonate, userDonationHistoryList } from "@/Components/Auth/userService";
import Swal from "sweetalert2";
import { useDonationListContext } from "@/app/context/donationListContextProvider";
import UserDonationHistory from "@/Components/userDashboardComponents/table/userDonationHistory";



export default function Donation() {
    const { user } = useAuth();
    const {userDonationList,setuserDonationList} =useDonationListContext();
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(donationinputval),
        defaultValues: {
            donationamount: 100,
        }
    })
    const handleHeaderClose = () => {
        setShowModel(false)

    }
    const {
        register: userHeaderRegister,
        reset: userHeaderReset,
        handleSubmit: userHeaderHandleSubmit,
        formState: { errors: userHeaderErrors }
    } = useForm({
        resolver: zodResolver(donorInfoSchema2)
    })

    const handleDonationSubmit = (data) => {
        setShowModel(true);
        setPendingAmount(data.donationamount.toFixed(2))
        fetchactivePaymentMethodList() //when user click 1st donate then fetch all method to show in Modal
    }
    const handleHeaderFinalSubmit = async (userdata) => {
        const finaldata = {
            amount: pendingAmount,
            phone: userdata.userPhone,
            name: user.username, //context
            paymentMethodId: userdata.paymentmethod
        }
        const selectedMethod = activePaymentMethodList.find(
            (m) => m.id === Number(userdata.paymentmethod)
        );
        console.log(finaldata)
        try {
            const response = await userDonate(finaldata);
            await Swal.fire({
                title: "Payment Successful!",
                icon: "success",
                confirmButtonText: "Done",
                html: `
                    <div style="text-align:left; font-size:12px; ">
                        <hr/>
                        <p><strong>Name</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${user.username}</p>
                        <p><strong>Phone</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${userdata.userPhone}</p>
                        <p><strong>Amount</strong> &nbsp;&nbsp;&nbsp;&nbsp;: ৳ ${pendingAmount}</p>
                        <p><strong>Method</strong> &nbsp;&nbsp;&nbsp;&nbsp;: ${selectedMethod?.name}</p>
                        <p><strong>Txn ID</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <code>${response.transactionId}</code></p>
                        <p><strong>Status</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span style="color:green; font-weight:600">${response.status}</span></p>
                        <hr/>
                        <p style="font-size:12px; color:gray; text-align:center">Keep this transaction ID for your records.</p>
                    </div>
                `,
            })
            fetchdonationHistoryList();
            setShowModel(false)
            userHeaderReset()
            reset()
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
    

    const fetchdonationHistoryList = async ()=>{
        const list= await userDonationHistoryList()
        setuserDonationList(list)
        }

    useEffect(() => {
        fetchdonationHistoryList()
    },[])

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
                    {[100, 200, 500, 1000].map((amount) => (
                        <Col md={3} lg={3} sm={12} xs={12} key={amount}>
                            <CustomButton
                                variant={selected === amount ? "warning" : "light"}
                                size={"lg"}
                                className="mb-2 modifyDonationbutton "
                                type="button"                              // ← prevent form submit
                                onClick={() => {
                                    setSelected(amount)
                                    setValue("donationamount", amount, { shouldValidate: true })
                                }}
                            >
                                {amount} Taka
                            </CustomButton>
                        </Col>
                    ))}
                </Row>
                <Form onSubmit={handleSubmit(handleDonationSubmit)}>
                    <Row className=" align-items-center justify-content-center d-flex flex-column  ">

                        <Col className="mt-3 mb-4 inputbox " md={4} lg={4}>
                            <Form.Label >Others Amount:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Other Amount (Taka)"
                                size="lg"
                                className="text-center amountinput"

                                {...register("donationamount", { valueAsNumber: true })}
                                isInvalid={!!errors.donationamount}
                            //Why { valueAsNumber: true } used?
                            //<input type="number"> always returns a string from the DOM. 
                            // React Hook Form passes that raw string to Zod, 
                            // but zod schema expects z.number() — hence the type mismatch.

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

                <Modal
                    show={showModel}
                    centered

                >
                    <Modal.Header>
                        <Modal.Title>Complete Your Donation</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={userHeaderHandleSubmit(handleHeaderFinalSubmit)}>
                        <Modal.Body>
                            <p className="text-muted">
                                Donating <span className="text-success fw-bold">{pendingAmount} </span>Taka — please provide your details.
                            </p>
                            <Form.Group className="py-3">
                                <Form.Label>Phone<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="tel"
                                    {...userHeaderRegister("userPhone")}
                                    placeholder="e.g 01xxxxxxxxx"
                                    isInvalid={!!userHeaderErrors.userPhone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {userHeaderErrors.userPhone?.message}
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

                                                isInvalid={!!userHeaderErrors.paymentmethod}
                                                {...userHeaderRegister("paymentmethod")}
                                            />
                                        </Col>

                                    )}
                                </Row>
                                <Form.Control.Feedback type="invalid">
                                    {userHeaderErrors.paymentmethod?.message}
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

                
                <UserDonationHistory data={userDonationList}/>

            </Container>
        </section>
    );
}