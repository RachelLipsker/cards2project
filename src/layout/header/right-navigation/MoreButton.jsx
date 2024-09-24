import { Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import { useMenu } from '../menu/MenuProvider';

export default function MoreButton() {
    const setOpen = useMenu();
    return (
        <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
            <IconButton
                onClick={() => setOpen(true)}
                size="large"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
                <MoreVertIcon />
            </IconButton>
        </Box>)
}
