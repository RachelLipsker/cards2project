import React from 'react'
import { Typography, CardContent } from "@mui/material";


export default function CardBody({ phone, city, street, house, bizNumber }) {
    return (
        <>
            <CardContent sx={{ height: 90 }} >
                <Typography variant="body2" color="text.secondary">
                    <strong>Phone: </strong>
                    {phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Address: </strong>
                    {city} {street} {house}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Card Number: </strong>
                    {bizNumber}
                </Typography>
            </CardContent>
        </>
    )
}
