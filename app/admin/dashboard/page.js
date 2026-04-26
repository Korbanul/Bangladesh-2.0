"use client"
import { Card, Col, Container, Row } from "react-bootstrap";
import { HeartHandshake, Images, NewspaperIcon } from "lucide-react";
import LastThreeNews from "@/Components/userDashboardComponents/lastThreeNews";
import RecentDonation from "@/Components/userDashboardComponents/table/donationHistory";
import { useEffect, useState } from "react";
import { getCountImageAdmin, getRecentThreeDonation, getTotalDoantionAdmin } from "@/Components/Auth/adminService";
import { useListContext } from "@/app/context/donationListContextProvider";
import "@/style/dashboard/dashboardStatCard.css"
export default function DashBoard() {

    const { fetchRecentThreeNews, recentThreeNews, totalNews, fetchTotalNewsCount } = useListContext();
    const [totalImage, setTotalImage] = useState();
    const [totalDonation, setTotalDonation] = useState();
    const [recentDonation, setRecentDonation] = useState();
    const fetchCountImage = async () => {
        try {
            const count = await getCountImageAdmin()
            setTotalImage(count)
        } catch (error) {
            console.log(error?.errorMessage)
        }
    }
    const fetchTotalDonation = async () => {
        try {
            const count = await getTotalDoantionAdmin()
            setTotalDonation(count)
        } catch (error) {
            console.log(error?.errorMessage)
        }
    }
    const fetchRecentThreeDonation = async () => {
        try {
            const count = await getRecentThreeDonation()
            setRecentDonation(count)
        } catch (error) {
            console.log(error?.errorMessage)
        }

    }


    useEffect(() => {
        fetchCountImage()
        fetchTotalDonation()
        fetchRecentThreeNews()
        fetchTotalNewsCount()
        fetchRecentThreeDonation()
    }, [])
    return (
        <section>
            <Container>
                <Row className="g-3">

                    <Col sm={12} md={4}>
                        <Card className="dashboard-card  border-0 shadow-lg bg-primary-soft">
                            <Card.Body className="text-center">
                                <div className="icon-box bg-primary-soft text-primary">
                                    <NewspaperIcon size={28} />
                                </div>

                                <h2 className="mt-3 fw-semibold text-dark">{totalNews}</h2>
                                <p className="text-muted small text-uppercase mb-0">
                                    Total News
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col sm={12} md={4}>
                        <Card className="dashboard-card  border-0 shadow-lg bg-success-soft">
                            <Card.Body className="text-center">
                                <div className="icon-box bg-success-soft text-success">
                                    <HeartHandshake size={28} />
                                </div>

                                <h2 className="mt-3 fw-semibold text-dark">
                                    {totalDonation}
                                </h2>
                                <p className="text-muted small text-uppercase mb-0">
                                    Donation
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col sm={12} md={4}>
                        <Card className="dashboard-card  border-0 shadow-lg bg-warning-soft">
                            <Card.Body className="text-center">
                                <div className="icon-box bg-warning-soft text-warning">
                                    <Images size={28} />
                                </div>

                                <h2 className="mt-3 fw-semibold text-dark">
                                    {totalImage}
                                </h2>
                                <p className="text-muted small text-uppercase mb-0">
                                    Explore
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className="mt-5 mb-3">
                <h4 className="fw-bold mb-1">Recent News</h4>
                <p className="text-muted mb-0">Show more in News Section.</p>
            </div>
            <LastThreeNews newsList={recentThreeNews} />
            <RecentDonation data={recentDonation} />

        </section>
    );
}