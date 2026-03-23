"use client";
import { Container, Row, Col, Card, Button, ListGroup, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { userProfile } from "@/Components/Auth/userService"; // for api call
import Swal from "sweetalert2";
import { LogoutUser } from "@/Components/Auth/authService";
import { useRouter } from "next/navigation";



export default function ProfilePage() {

    const router = useRouter();
    const handleLogout = async () => {

        try {
            const response = await LogoutUser();
            console.log("Logout Successful", response);
            await Swal.fire({
                title: " LogOut",
                icon: "success"
            })
            router.push("../")

        } catch (error) {
            console.error("Logout Failed", error)
            await Swal.fire({
                title: " Logout Failed",
                text: error.message,
                icon: "error"
            })

        }
    }


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        userProfile()
            .then(setUser)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
    if (!user) return null;
    // console.log(user);

    return (
        <Container className="py-5">
            <Row>
                {/* Sidebar */}
                <Col lg={4} className="mb-4">
                    <Card className="border-0 shadow-sm text-center p-3">
                        <Card.Body>
                            <div
                                className="rounded-circle d-inline-flex align-items-center 
                            justify-content-center "

                            >
                                <Image
                                    src="https://picsum.photos/200/200"
                                    alt="User Profile"
                                    roundedCircle
                                    height={100}
                                    width={100}
                                />
                            </div>
                            <Card.Title className="fw-bold">{user.username}</Card.Title>
                            <Card.Text className="text-muted small">{user.roles}</Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush" >
                            <ListGroup.Item className="small">
                                <span className="text-muted ">Joined: </span>
                                {user.joined ? new Date(user.joined).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: true
                                })
                                    : "—"}
                            </ListGroup.Item>
                            <ListGroup.Item className="small">

                                <ListGroup.Item className="small text-danger fw-bold  text-center" onClick={handleLogout} action>Logout</ListGroup.Item>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

                {/* Main Info */}
                <Col lg={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">Personal Information</h5>
                            <Button variant="link" className="text-decoration-none p-0">Edit</Button>
                        </Card.Header>
                        <Card.Body>
                            {[
                                ["Username", user.username],
                                ["Email", user.email],
                                ["Profession", user.profession],
                                ["Gender", user.gender],
                                ["Date of Birth", user.dob],
                            ].map(([label, value]) => (
                                <Row className="mb-3" key={label}>
                                    <Col sm={4} className="text-muted">{label}</Col>
                                    <Col sm={8} className="fw-semibold">{value || "—"}</Col>
                                </Row>
                            ))}
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0 fw-bold">Recent Activity</h5>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-muted small">No recent activity to show.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

