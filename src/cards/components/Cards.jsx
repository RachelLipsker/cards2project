import React from 'react';
import CardComponent from './card/CardComponent';
import { Container } from '@mui/material';

export default function Cards({ cards, handleDelete, handleLike }) {

    return (
        <>
            <Container sx={{ display: "flex", flexWrap: "wrap" }}>
                {cards.map((card) => <CardComponent
                    key={card._id}
                    card={card}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                />)}
            </Container>
        </>
    )
}
