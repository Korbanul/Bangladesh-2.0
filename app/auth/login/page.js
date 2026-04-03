"use client"
import CustomButton from "@/Components/common/CustomButton";
import { loginSchema } from "@/Components/Validations/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "@/style/LoginPage.css"
import { LoginUser } from "@/Components/Auth/authService";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

export default function LogIn() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });
    const handleLogin = async (data) => {
        try {
            const response = await LoginUser(data);
            console.log("Login Successful", response);
            await Swal.fire({
                title: " Login SuccessFul",
                text: "Congratulations!",
                icon: "success"
            })
            reset();
            router.push("../user/dashboard")

        } catch (error) {
            console.error("Login Failed", error)
            await Swal.fire({ 
                title: " Login Failed",
                text: error.errorMessage||"Server is not Connected",
                icon: "error"
            })

        }
        



    }
    return (
        <div className="LoginPage px-3">
            <div className="LoginBox p-5">
                <Form onSubmit={handleSubmit(handleLogin)}>
                    <h2 className="text-center">LogIn</h2>
                    <Row>
                        <Form.Group className="mb-3" as={Col} xl="12" xs="12" sm="12" md="12">
                            <Form.Label>Username *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                {...register("username")}
                                isInvalid={!!errors.username}  //!value   → converts to opposite boolean
                            //!!value  → converts back to actual boolean
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username?.message}
                            </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} xl="12" xs="12" sm="12" md="12">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                                isInvalid={!!errors.password}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>

                        </Form.Group>
                    </Row>
                    <Row>
                        <Col className=" mb-2 mt-3 d-flex justify-content-center" xl="12" xs="12" sm="12" md="12" >
                            <CustomButton variant="success" size="lg" type="submit" className="w-100">Login</CustomButton>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}