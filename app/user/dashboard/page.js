"use client"
import { Card, Col, Container, Row } from "react-bootstrap";
import CustomButton from "@/Components/common/CustomButton";
import { Download, HeartHandshake, Image, Images, Newspaper, NewspaperIcon, PictureInPicture, PictureInPicture2 } from "lucide-react";
import UsersPage from "@/Components/userDashboardComponents/table/userlist";
import LastThreeNews from "@/Components/userDashboardComponents/lastThreeNews";
import RecentDonation from "@/Components/userDashboardComponents/table/donationHistory";

export default function DashBoard() {

    return (
        <section>
            <Container>
                <Row className="g-2"> {/* g = Gutters gap */}
                    <Col sm={12} md={4} lg={4} className="text-center ">
                        <Card className='p-3  h-100' >
                            <span><NewspaperIcon size={40} className="text-muted" /></span>
                            <Card.Title className='display-6 fw-medium mt-3 mb-1'>100</Card.Title>
                            <Card.Text className='text-muted fw-medium small text-uppercase ls-wide'>Total News</Card.Text>
                        </Card>
                    </Col>
                    <Col sm={12} md={4} lg={4} className="text-center ">
                        <Card className='p-3  h-100' >
                            <span><HeartHandshake size={40}  className="text-muted" /></span>
                            <Card.Title className='display-6 fw-medium mt-3 mb-1'>$189</Card.Title>
                            <Card.Text className='text-muted fw-medium small text-uppercase ls-wide'>Donation</Card.Text>
                        </Card>
                    </Col>
                    <Col sm={12} md={4} lg={4} className="text-center ">
                        <Card className='p-3  h-100' >
                            <span><Images size={40} className="text-muted" /></span>
                            <Card.Title className='display-6 fw-medium mt-3 mb-1'>20</Card.Title>
                            <Card.Text className='text-muted fw-medium small text-uppercase ls-wide'>Explore</Card.Text>
                        </Card>
                    </Col>


                </Row>
            </Container>
            <div className="mt-5 mb-3">
                <h4 className="fw-bold mb-1">Recent News</h4>
                <p className="text-muted mb-0">Show more in News Section.</p>
            </div>
            <LastThreeNews />
            <RecentDonation />
            {/* <UsersPage/> */}
        </section>
    );
}