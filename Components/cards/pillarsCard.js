"use client"
import Card from 'react-bootstrap/Card';
import "@/style/Cardsection.css"

function PillarsCard({ pillarsDtails }) {
    let bgcolor = pillarsDtails.cardcolor
    return (
        <Card className='p-3 cardstyle' style={{ backgroundColor: bgcolor }}>
            <Card.Img variant="top" src="./enegrylight.png" className="PillarsImg" />  {/* if mx-auto applied image will be in center*/}
            
            {/* If i use card.Body then the alignment of the image and title, description mismatch */}

            <Card.Title className='mt-3'>
                {pillarsDtails.title}
            </Card.Title>

            <Card.Text className="text-muted">
                {pillarsDtails.description}
            </Card.Text>
        </Card>
    );
}

export default PillarsCard;