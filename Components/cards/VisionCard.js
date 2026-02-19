"use client"
import Card from 'react-bootstrap/Card';
import CustomButton from "../common/CustomButton";
import "@/style/Cardsection.css"


export default function visionCard({ visiondtails }) {
    let buttontype = visiondtails.buttontype
    let bgcolor=visiondtails.cardcolor
    return (
        <Card className='p-3 cardstyle h-100' style={{backgroundColor:bgcolor}}>
            <Card.Img variant="top" src="./enegrylight.png" className="PillarsImg" />  {/* if mx-auto applied image will be in center*/}
            <Card.Body>
                <Card.Title>{visiondtails.title}</Card.Title>
                <Card.Text>{visiondtails.description} </Card.Text>
            </Card.Body>
            <CustomButton variant={buttontype}>
                Learn More
            </CustomButton>
        </Card>
    );
}