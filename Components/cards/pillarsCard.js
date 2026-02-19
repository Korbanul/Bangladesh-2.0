"use client"
import Card from 'react-bootstrap/Card';
import "@/style/Cardsection.css"

function PillarsCard({ pillarsDtails }) {
    let bgcolor=pillarsDtails.cardcolor
    return (
        <Card className='p-3 cardstyle' style={{backgroundColor:bgcolor}}>
            <Card.Img variant="top" src="./enegrylight.png" className="PillarsImg"/>  {/* if mx-auto applied image will be in center*/}
            <Card.Body>
                <Card.Title>{pillarsDtails.title}</Card.Title>
                <Card.Text>{pillarsDtails.description} </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PillarsCard;