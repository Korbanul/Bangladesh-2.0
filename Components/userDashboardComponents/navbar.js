"use client"; 
import Link from "next/link";
import { Dropdown, Form, Image, Navbar, Container, Stack, Badge } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search, Bell } from "lucide-react";
import { dashboardSearch } from "../Validations/AuthSchema";
import "@/style/dashboard/navbar.css"

export default function UserDashboardNavbar() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(dashboardSearch)
    });

    const onSearch = (data) => {
        console.log("Searching for:", data.dsearch);
        //search logic 
    };

    return (
        <Navbar bg="white" expand="lg" className="border-bottom sticky-top py-2">
            <Container fluid>
                
                <Navbar.Text className="d-none d-md-block fw-medium">
                    Hello, <span className="text-primary">Shanto</span>
                </Navbar.Text>

                
                <Form 
                    className="d-flex align-items-center navbar-search" 
                   
                    onSubmit={handleSubmit(onSearch)}
                >
                    <Form.Group className="input-group input-group-md ">
                        <span className="input-group-text bg-light border-end-0">
                            <Search size={16} className="text-muted" />
                        </span>
                        <Form.Control
                            type="search"
                            placeholder="Search data..."
                            className="bg-light border-start-0 ps-0"
                            {...register("dsearch")}
                            isInvalid={!!errors.dsearch}
                        />
                    </Form.Group >
                </Form>

                
                <div className="d-flex align-items-center gap-3 ps-2">
                    <button className="btn btn-link text-muted p-0 position-relative d-none d-sm-block">
                        <Bell size={20} />
                        <Badge bg="danger" 
                        className="position-absolute top-0 start-100 translate-middle rounded-pill"
                        >9</Badge>
                        
                    </button>

                    <Dropdown align="end">
                        <Dropdown.Toggle variant="link">
                            <Image 
                                src="https://picsum.photos/200/200"
                                alt="User Profile"
                                roundedCircle
                                height={35}
                                width={35}                              
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow-sm border-0 mt-2">
                            <Dropdown.Header>Account Settings</Dropdown.Header>
                            
                            <Dropdown.Item as={Link} href="/dashboard/profile" className="item">My Profile</Dropdown.Item>
                            <Dropdown.Item as={Link} href="/dashboard/settings" className="item">Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/api/auth/logout" className="text-danger item">
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
        </Navbar>
    );
}