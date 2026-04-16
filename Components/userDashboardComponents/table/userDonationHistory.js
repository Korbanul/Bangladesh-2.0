import { Download } from "lucide-react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import "@/style/User/donationHistory.css";
import { useEffect, useState } from "react";

export default function UserDonationHistory({data=[]}) {
    // const fetchDonationList = async () => {
    //     try {
    //         const list = await getDonationList();
    //         setDonationList(list);
    //     } catch (error) {

    //     }
    // };
    // useEffect(() => {
    //     fetchDonationList()
    // }, [])
    // const [DonationList, setDonationList] = useState([]);
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString("en-BD", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case "COMPLETED":
                return "success";
            case "PENDING":
                return "warning";
            case "FAILED":
                return "danger";
            default:
                return "secondary";
        }
    };
    // const data=DonationList;

    return (
        <section>
            <Container>
                <Row className="mt-5">
                    <Col xs={12} className="mb-2">
                        <h2 className="fw-bold text-dark mb-1">Donation History</h2>
                    </Col>
                    <Col>
                        <Table responsive className="align-middle custom-user-table">
                            <thead>
                                <tr>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Transaction ID</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Method</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Amount</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Donor Name</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Donor Phone</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Date & Time</th>
                                    <th className="text-muted fw-semibold small text-uppercase py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="text-center text-muted py-4">
                                            No donations found.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item) => (
                                        <tr key={item.transactionId}>
                                            <td className="py-3">{item.transactionId}</td>

                                            {/* Method: logo + name */}
                                            <td className="py-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    {item.method?.logoUrl && (
                                                        <img
                                                            src={item.method.logoUrl}
                                                            alt={item.method.name}
                                                            style={{ width: 24, height: 24, objectFit: "contain" }}
                                                        />
                                                    )}
                                                    <span>{item.method?.name ?? "N/A"}</span>
                                                </div>
                                            </td>

                                            <td className="py-3">{item.amount} ৳</td>
                                            <td className="py-3">{item.donorName?.trim() || "Guest"}</td>
                                            <td className="py-3">{item.donorPhone?.trim() || "—"}</td>
                                            <td className="py-3">{formatDate(item.donationDateTime)}</td>

                                            {/* Status badge */}
                                            <td className="py-3">
                                                <Badge bg={getStatusVariant(item.status)}>
                                                    {item.status}
                                                </Badge>
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