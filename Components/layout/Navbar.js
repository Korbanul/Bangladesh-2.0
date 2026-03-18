"use client"
import { Container, Nav, Navbar } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import '@/style/navbar.css'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <>

            <Navbar expand="lg" className="navbar " sticky='top' >
                <Container fluid>
                    <Navbar.Brand as={Link} href="/" className="text-decoration-none" style={{ color: "black" }}> Bangladesh 2.0</Navbar.Brand>
                    {pathname === "/auth/login" ? (
                        <Nav >
                            <Link href="./signup" className="text-decoration-none">
                                <CustomButton variant="outline-success" size="md" /* onClick={() => setshowSignup(true)}*/>
                                    SignUp
                                </CustomButton>
                            </Link>

                        </Nav>

                    ) : pathname === "/auth/signup" ? (
                        <Nav >
                            <Link href="auth/login" className="text-decoration-none">
                                <CustomButton variant="outline-success" size="md" /* onClick={() => setshowSignup(true)}*/>
                                    LogIn
                                </CustomButton>
                            </Link>

                        </Nav>
                    ) :
                        <Nav >
                            <Link href="/auth/login" className="text-decoration-none">
                                <CustomButton variant="outline-success" size="md" /* onClick={() => setshowSignup(true)}*/>
                                    LogIn
                                </CustomButton>
                            </Link>

                        </Nav>
                    }





                </Container>


            </Navbar>

        </>
    );
}