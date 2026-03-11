"use client"
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CustomButton from "../../../Components/common/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../../Components/Validations/AuthSchema";
import "../../../style/SignUpPage.css"
import { signUpUser } from "@/Components/Auth/authService";
import Swal from 'sweetalert2'
import { useState } from "react";

export default function page() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(signUpSchema)
    });
    const handleClear = () => {
        reset();
    };
    const onsubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await signUpUser(data);
            console.log("SignUp Successful", response);
            Swal.fire({
                title: "Success",
                text: "Account Created",
                icon: "success"
            })
            handleClear()
        } catch (error) {
            console.error("SignUp Failed", error)
            await Swal.fire({
                title: "Failed",
                text: error.message || "Currently Can't Create Account",
                icon: "error"
            })
        }
        finally {
            setIsLoading(false); // Stop loading no matter what happened
        }


    }

    return (


        <Container className="SignupPage">


            <Form onSubmit={handleSubmit(onsubmit)} className="SignupBox ">
                <h2 className="signupTitle ">Create Account</h2>
                <Row>

                    <Form.Group as={Col} className="mb-2" xs={12} md={12} lg={12}>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            {...register("username")}
                            isInvalid={!!errors.username} //!!convert the value into boolean true or false

                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username?.message}
                        </Form.Control.Feedback>

                        {/* <p className="text-danger">{errors.username?.message}</p> */}
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" xs={12} md={12} lg={12}>
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                            isInvalid={!!errors.email}

                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                        {/* <p className="text-danger">{errors.email?.message}</p> */}
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" xs={12} md={12} lg={12}>
                        <Form.Label>Password *</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="********"
                            {...register("password")}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                        {/* <p className="text-danger">{errors.password?.message}</p> */}
                    </Form.Group>



                </Row>
                <Row>
                    <Col className=" mt-3 d-flex justify-content-center gap-3">
                        <CustomButton type="button" size="md" onClick={handleClear} >Clear</CustomButton>
                        <CustomButton type="submit" size="md" variant="success" disabled={isLoading} >{isLoading ? "Signing up..." : "Submit"}</CustomButton>
                    </Col>

                </Row>

            </Form>
        </Container>

    );
}