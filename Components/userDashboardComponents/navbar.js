"use client";
import Link from "next/link";
import { Dropdown, Form, Image, Navbar, Container, Stack, Badge, Button, OverlayTrigger, Tooltip, Offcanvas } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search, Bell, Menu, ChevronRight, LayoutDashboard, Newspaper, HeartHandshake, Images, User2 } from "lucide-react";
import { dashboardSearch } from "../Validations/AuthSchema";
import "@/style/dashboard/navbar.css"
import Swal from "sweetalert2";
import { LogoutUser } from "../Auth/authService";
import { usePathname, useRouter } from "next/navigation";
import CustomButton from "../common/CustomButton";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";


export default function UserDashboardNavbar() {
    const { user, isAdmin } = useAuth();
    const navItems = [
        { name: 'Dashboard', href: '/user/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'News', href: '/user/news', icon: <Newspaper size={20} /> },
        { name: 'Donation', href: '/user/donation', icon: <HeartHandshake size={20} /> },
        { name: 'Expole', href: '/user/explore', icon: <Images size={20} /> }
    ];
    const adminnavItems = [
        { name: 'Admin Dashboard', href: '/admin/Dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage News', href: '/admin/manageNews', icon: <Newspaper size={20} /> },
        { name: 'Manage Donation', href: '/admin/manageDonation', icon: <HeartHandshake size={20} /> },
        { name: 'Manage Expole', href: '/admin/manageExplore', icon: <Images size={20} /> },
        { name: 'Manage Users', href: '/admin/manageUser', icon: <User2 size={20} /> }
    ];
    const router = useRouter();
    const pathname = usePathname();
    const [showMobile, setShowMobile] = useState(false);
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

    const handleLogout = async () => {

        try {
            const response = await LogoutUser();
            console.log("Logout Successful", response);
            await Swal.fire({
                title: " LogOut",
                icon: "success",
                timer: 1000
            })
            router.push("../")

        } catch (error) {
            console.error("Logout Failed", error)
            await Swal.fire({
                title: " Logout Failed",
                text: error.errorMessage,
                icon: "error"
            })

        }
    }


    return (
        <>
            <Navbar bg="white" expand="lg" className="border-bottom sticky-top py-2">
                <Container fluid>

                    <Navbar.Text className="d-none d-md-block fw-medium">
                        Hello, <span className="text-primary">{user?.username}</span>
                    </Navbar.Text>


                    <CustomButton
                        variant="transparent"
                        className="d-block d-sm-none"

                        onClick={() => setShowMobile(true)}
                    >
                        <Menu size={20} />
                    </CustomButton>


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

                                <Dropdown.Item as={Link} href={isAdmin() ? "/admin/profile" : "/user/profile"} className="item">My Profile</Dropdown.Item>
                                <Dropdown.Item as={Link} href="/dashboard/settings" className="item">Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout} className="text-danger item">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Container>
            </Navbar>

            <Offcanvas show={showMobile} onHide={() => setShowMobile(false)} style={{ width: '60%' }} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="fw-bold text-primary">Bangladesh 2.0</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex flex-column">
                        {(isAdmin() ? adminnavItems : navItems).map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setShowMobile(false)} // Close menu when a link is clicked
                                    className={`sidebarlink p-3 mt-2 d-flex align-items-center text-decoration-none ${isActive ? "activelink" : "text-dark"}`}
                                >
                                    <span className="me-3">{item.icon}</span>
                                    <span className="fw-medium">{item.name}</span>
                                    <ChevronRight size={14} className="ms-auto opacity-50" />
                                </Link>
                            );
                        })}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}