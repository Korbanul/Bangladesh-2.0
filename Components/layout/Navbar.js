"use client"
import { Container, Nav, Navbar } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import '@/style/navbar.css'

export default function NavBar() {
    return (
        <Navbar expand="lg" className="navbar "  sticky='top' >
            <Container fluid>
                <Navbar.Brand  > Bangladesh 2.0</Navbar.Brand>

                <Nav >
                    <CustomButton variant="outline-success" size="md">
                        Sign In
                    </CustomButton>
                </Nav>




            </Container>
        </Navbar>

    );
}