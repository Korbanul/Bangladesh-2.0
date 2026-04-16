"use client";
import { Col, Container, Row, Table, Image, Button } from "react-bootstrap";
import "@/style/User/donationHistory.css";


export default function PaymentMethodtable({ data = [] }) {

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Method Name" },
        { key: "logoUrl", label: "Logo" },
        { key: "active", label: "Status" },
    ];

    return (
        <section>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h2 className="fw-bold text-dark mb-3">Payment Methods</h2>

                        <Table responsive className="align-middle custom-user-table">

                            <thead>
                                <tr>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className="text-muted fw-semibold small text-uppercase py-3"
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                    <th className="text-end py-3 px-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="text-center py-4">
                                            No Payment Methods Found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item) => (
                                        <tr key={item.id}>

                                            <td className="py-3">{item.id}</td>

                                            <td className="py-3 fw-semibold">{item.name}</td>
                                  
                                            <td className="py-3">
                                                <Image
                                                    src={item.logoUrl}
                                                    alt={item.name}
                                                    width={40}
                                                    height={40}
                                                    rounded
                                                />
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge ${item.active
                                                        ? "bg-success-subtle text-success border border-success-subtle"
                                                        : "bg-danger-subtle text-danger border border-danger-subtle"
                                                        }`}
                                                >
                                                    {item.active ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="text-end py-3 px-3">
                                                <div className="d-inline-flex gap-2">
                                                    <Button size="sm" variant="outline-secondary">
                                                        Inactive
                                                    </Button>
                                                    <Button size="sm" variant="outline-danger">
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}