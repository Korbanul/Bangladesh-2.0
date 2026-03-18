import { Download, Edit, Mail, MoreHorizontal, Shield, Trash2 } from "lucide-react";
import { Badge, Col, Container, Dropdown, Row, Table } from "react-bootstrap";

import "@/style/User/donationHistory.css"
import CustomButton from "@/Components/common/CustomButton";
export default function DonationHistory() {
    const donationData = [
        { date: "Jan 2, 2026", transactionId: "#8829310 ", amount: 1000, method: "Bkash", purposeFund: "Education Fund", status: "Success", reciept: "" },
        { date: "Feb 24, 2026", transactionId: "#8829311 ", amount: 500, method: "Bkash", purposeFund: "Education Fund", status: "Success", reciept: "" },
        { date: "Mar 17, 2026", transactionId: "#8829312 ", amount: 4090, method: "Bkash", purposeFund: "Education Fund", status: "Success", reciept: "" }

    ];
    return (
        <section>
            <Container>
                <Row className="mt-5">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mb-2">
                        <h2 className="fw-bold text-dark mb-1">Donation History</h2>
                    </Col>
                    <Col>
                        <Table responsive className="align-middle custom-user-table">
                            <thead>
                                <tr>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Date</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Transaction ID</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Method</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Amount</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Status</th>
                                    <th className="text-muted fw-semibold small text-uppercase text-end py-3 px-3">
                                        Receipt
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {donationData.map((data) => (
                                    <tr key={data.transactionId}>
                                        <td className="py-3">{data.date}</td>
                                        <td className="py-3">{data.transactionId}</td>
                                        <td className="py-3">{data.method}</td>
                                        <td className="py-3">{data.amount} Taka</td>
                                        <td className="py-3">
                                            <span className="badge bg-success-subtle text-success border border-success-subtle">
                                                {data.status}
                                            </span>
                                        </td>

                                        <td className="text-end py-3 px-3">
                                            <div className="d-inline-flex align-items-center"> {/* Wraps button to fix baseline issues */}
                                                <CustomButton variant="outline-primary" size="sm">
                                                    <Download size={14} />
                                                </CustomButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}