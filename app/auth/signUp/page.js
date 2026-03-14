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


//When i will click the Brand text it will reload the page because the root folder is in Main route group.
//when the any page.js don't share the same layout.js then the NextJs web will reload . 
// same layout.js share by many page.js they will not reload to route to new page just the inside content will chnage  
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


        <Container className="SignupPage ">


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
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Profession*</Form.Label>
                        <Form.Select size="md"  {...register("profession")} isInvalid={!!errors.profession}>
                            <option value="">Select your profession</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="farmer">Farmer</option>
                            <option value="engineer">Engineer</option>
                            <option value="doctor">Doctor</option>
                            <option value="pilot">Pilot</option>
                            <option value="govtJob">GovtJob</option>
                            <option value="defence">Defence</option>
                            <option value="housewife">Housewife</option>
                            <option value="lawyer">Lawyear</option>
                            <option value="others">Others</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.profession?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Gender *</Form.Label>
                        <Row>

                            <Col xs={12} md={4} lg={4}>

                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Male"
                                    value="male"
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Gender is required" })}
                                />
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Female"
                                    value="female"
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Gender is required" })}
                                />
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Others"
                                    value="others"
                                    isInvalid={!!errors.gender}
                                    {...register("gender", { required: "Gender is required" })}
                                />
                            </Col>
                        </Row>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Date of Birth *</Form.Label>

                        <Form.Control
                            type="date"
                            {...register("dob")}
                            isInvalid={!!errors.dob}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.dob?.message}
                        </Form.Control.Feedback>
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
                        <CustomButton type="button" size="md" onClick={handleClear} variant="danger" >Clear</CustomButton>
                        <CustomButton type="submit" size="md" variant="success" disabled={isLoading} >{isLoading ? "Signing up..." : "Submit"}</CustomButton>
                    </Col>

                </Row>

            </Form>
        </Container >

    );
}