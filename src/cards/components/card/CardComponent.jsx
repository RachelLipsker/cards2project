import * as React from "react";
import Card from "@mui/material/Card"
import { CardActionArea } from "@mui/material";

import CardHeaderComponent from "./CardHeaderComponent";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import ROUTES from "../../../routes/routesModel";
import { useNavigate } from "react-router-dom";

export default function CardComponent({ card, handleDelete, handleLike }) {
    const navigate = useNavigate();
    return (
        <Card sx={{ width: 250, m: 2 }}>
            <CardActionArea onClick={() => navigate(ROUTES.CARD_INFO + "/" + card._id)}>
                <CardHeaderComponent
                    url={card.image.url}
                    alt={card.image.alt}
                    title={card.title}
                    subtitle={card.subtitle} />
                <CardBody
                    phone={card.phone}
                    city={card.address.city}
                    street={card.address.street}
                    house={card.address.houseNumber}
                    bizNumber={card.bizNumber} />
            </CardActionArea>
            <CardActionBar cardId={card._id}
                handleDelete={handleDelete}
                handleLike={handleLike}
                userId={card.user_id}
                cardLikes={card.likes}
                phone={card.phone}
            />
        </Card>
    );
}
