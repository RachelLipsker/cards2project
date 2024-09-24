import { Button, IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';

export default function AddNewCardButton() {
    const navigate = useNavigate();
    return (
        <>
            <Button
                variant="contained"
                sx={{ m: 2, p: 5, fontSize: "35px", borderRadius: "50%", width: "75px", height: "75px", position: "fixed", right: "16px", bottom: "50px" }}
                onClick={() => navigate(ROUTES.CREATE_CARD)}>+</Button>
        </>
    )
}
