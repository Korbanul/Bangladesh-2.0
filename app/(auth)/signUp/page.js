"use client"
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CustomButton from "../../../Components/common/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../../Components/Validations/AuthSchema";
import "../../../style/SignUpPage.css"
import { signUpUser } from "@/Components/Auth/authService";

export default function page({ onSubmit }) {
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
        try {
            const response = await signUpUser(data);
            console.log("SignUp Successful", response);
            handleClear()
        } catch (error) {
            console.error("SignUp Failed", error)
        }

    }

    return (


        <Container className="SignupPage">

            
            <Form onSubmit={handleSubmit(onsubmit)} className="SignupBox ">
            <h2 className="signupTitle ">Create Account</h2>
                <Row>

                    <Form.Group as={Col} className="mb-2" xs={12} md={12} lg={12}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            {...register("username")}

                        />
                        <p className="text-danger">{errors.username?.message}</p>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" xs={12} md={12} lg={12}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}

                        />
                        <p className="text-danger">{errors.email?.message}</p>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" xs={12} md={12} lg={12}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="********"
                            {...register("password")}

                        />
                        <p className="text-danger">{errors.password?.message}</p>
                    </Form.Group>



                </Row>
                <Row>
                    <Col className="d-flex justify-content-center gap-3">
                        <CustomButton type="button" size="md" onClick={handleClear} >Clear</CustomButton>
                        <CustomButton type="submit" size="md" variant="success"  >Submit</CustomButton>
                    </Col>

                </Row>

            </Form>
        </Container>

    );
}