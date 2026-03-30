import { Button, Card, Col, Row } from "react-bootstrap";

export default function InfoCard({ user, onEdit }) {
    const data = [
        ["Username", user.username],
        ["Email", user.email],
        ["Profession", user.profession],
        ["Gender", user.gender],
        ["Date of Birth", user.dob],
    ]
    return (<>
        <Card>
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Personal Information</h5>
                <Button variant="link" className="text-decoration-none p-0" onClick={onEdit}>
                    Edit
                </Button>
            </Card.Header>
            <Card.Body>
                {data.map(([label, value]) => (
                    <Row key={label}>
                        <Col sm={4} className="text-muted">{label}</Col>
                        <Col sm={8} className="fw-semibold">{value || "—"}</Col>
                    </Row>
                )
                )}
            </Card.Body>

        </Card>
    </>

    );
}