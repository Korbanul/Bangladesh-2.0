"use client"
import { Container, Nav, Navbar } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import '@/style/navbar.css'
import Link from "next/link";

export default function NavBarWithLogin() {
    
   
    return (
        <>

            <Navbar expand="lg" className="navbar " sticky='top' >
                <Container fluid>
                <Navbar.Brand  as={Link} href="/" className="text-decoration-none" style={{color:"black"}}> Bangladesh 2.0</Navbar.Brand>

                    <Nav >
                        <Link href="/logIn" className="text-decoration-none">
                            <CustomButton variant="outline-success" size="md" /* onClick={() => setshowSignup(true)}*/>
                                LogIn
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