"use client"
import { Card, Col, Container, Row } from "react-bootstrap";
import CustomButton from "@/Components/common/CustomButton";
import { Download, HeartHandshake, Image, Images, Newspaper, NewspaperIcon, PictureInPicture, PictureInPicture2 } from "lucide-react";
import LastThreeNews from "@/Components/userDashboardComponents/lastThreeNews";
import RecentDonation from "@/Components/userDashboardComponents/table/donationHistory";
import { useListContext } from "@/app/context/donationListContextProvider";
import { userDonationHistoryList } from "@/Components/Auth/userService";
import { useEffect, useState } from "react";
import UserDonationHistory from "@/Components/userDashboardComponents/table/userDonationHistory";
import { getCountImage } from "@/Components/Auth/adminService";

export default function DashBoard() {
    const { userDonationList, setuserDonationList } = useListContext();
    const [totalImage, setTotalImage] = useState();
    const fetchdonationHistoryList = async () => {
        const list = await userDonationHistoryList()
        setuserDonationList(list)
    }
    const fetchCountImage = async () => {
        const count = await getCountImage()
        setTotalImage(count)
    }
    

    useEffect(() => {
        fetchdonationHistoryList()
        fetchCountImage()
    }, [])
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
                            <span><HeartHandshake size={40} className="text-muted" /></span>
                            <Card.Title className='display-6 fw-medium mt-3 mb-1'>$189</Card.Title>
                            <Card.Text className='text-muted fw-medium small text-uppercase ls-wide'>Donation</Card.Text>
                        </Card>
                    </Col>
                    <Col sm={12} md={4} lg={4} className="text-center ">
                        <Card className='p-3  h-100' >
                            <span><Images size={40} className="text-muted" /></span>
                            <Card.Title className='display-6 fw-medium mt-3 mb-1'>{totalImage}</Card.Title>
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
            <UserDonationHistory data={userDonationList} />
        </section>
    );
}