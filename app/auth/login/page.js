"use client"
import CustomButton from "@/Components/common/CustomButton";
import { loginSchema } from "@/Components/Validations/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "@/style/LoginPage.css"
import { LoginUser } from "@/Components/Auth/authService";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { email } from "zod";
import Link from "next/link";

export default function LogIn() {
    const { isAdmin, refreshUser } = useAuth();
    const [showPassword, setshowpassword ] = useState(false);
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
            const trimmedData={...data,
                username:data.username.trim(),
                password:data.password.trim()
            }
            const response = await LoginUser(trimmedData);
            const userData = await refreshUser();
            // console.log("Login Successful", response);
            await Swal.fire({
                title: " Login Successful",
                text: "Congratulations!",
                icon: "success",
                timer:1000
            })
            reset();
            // {isAdmin()? (router.push("../admin/dashboard")) : (router.push("../user/dashboard"))}
            if (userData?.roles?.includes("ROLE_ADMIN")) {
                router.push("/admin/dashboard");
            } else {
                router.push("/user/dashboard");
            }


        } catch (error) {
            console.error("Login Failed", error)
            await Swal.fire({
                title: " Login Failed",
                text: error.errorMessage || "Server is not Connected",
                icon: "error"
            })

        }




    }
    const handleShowPassword=()=>setshowpassword(prev=>!prev)
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
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    isInvalid={!!errors.password}
                                />
                                <InputGroup.Text
                                onClick={handleShowPassword}
                                 style={{ cursor: "pointer" }}
                                 aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <Eye /> : <EyeClosed />}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col className=" mb-2 mt-3 d-flex justify-content-center" xl="12" xs="12" sm="12" md="12" >
                            <CustomButton variant="success" size="lg" type="submit" className="w-100">Login</CustomButton>
                        </Col>
                        <Col className="mt-5 d-flex align-items-center justify-content-center">
                            <span className="fs-6 fw-bold text-muted">Not a user?&nbsp; &nbsp; </span>
                            <Link href="/auth/signup" className="fs-6" >SignUp</Link>
                            
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}