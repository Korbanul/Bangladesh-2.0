"use client"
import { Container, Nav, Navbar } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import '@/style/navbar.css'
import Link from "next/link";

export default function NavBar() {
    
   
    return (
        <>

            <Navbar expand="lg" className="navbar " sticky='top' >
                <Container fluid>
                    <Navbar.Brand  > Bangladesh 2.0</Navbar.Brand>

                    <Nav >
                        <Link href="/signUp" className="text-decoration-none">
                            <CustomButton variant="outline-success" size="md" /* onClick={() => setshowSignup(true)}*/>
                                Sign In
                            </CustomButton>
                        </Link>

                    </Nav>




                </Container>
                {/* {showSignup &&(<SignUpModel onClose={()=>setshowSignup(false)}/>)} */}

            </Navbar>
            {/* <SignUpModel show={showSignup}
                handleClose={() => setshowSignup(false)} /> */}
        </>
    );
}