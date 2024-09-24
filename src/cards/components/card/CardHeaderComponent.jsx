import React from 'react'
import { CardHeader, Divider, CardMedia } from "@mui/material";


export default function CardHeaderComponent({ url, alt, title, subtitle }) {
    return (
        <>
            <CardMedia
                sx={{ height: 140 }}
                image={url}
                alt={alt}
            />
            <CardHeader title={title} subheader={subtitle} sx={{ height: 120 }} />
            <Divider variant="middle" />
        </>
    )
}
