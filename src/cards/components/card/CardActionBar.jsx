import React, { useCallback, useEffect, useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, CardActions } from "@mui/material";
import { useCurrentUser } from '../../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routesModel';


export default function CardActionBar({ cardId, handleDelete, userId, cardLikes, handleLike, phone }) {
    const { user } = useCurrentUser();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(() => {
        if (!user) {
            return false;
        } else {
            return !!cardLikes.find(id => id === user._id)
        }
    });

    const likeCard = () => {
        handleLike(cardId, user);
        setLiked(prev => !prev);
    }

    return (
        <>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                    {user && (userId == user._id || user.isAdmin) ? <> <IconButton onClick={() => handleDelete(cardId)}>
                        <DeleteIcon />
                    </IconButton>
                        <IconButton onClick={() => navigate(ROUTES.EDIT_CARD + "/" + cardId)}>
                            <ModeEditIcon />
                        </IconButton></> : null}
                </Box>
                <Box>
                    <a href={"tel:" + phone}>
                        <IconButton>
                            <CallIcon />
                        </IconButton>
                    </a>
                    <IconButton onClick={likeCard}>
                        <FavoriteIcon style={{ color: liked ? "red" : "inherit" }} />
                    </IconButton>
                </Box>
            </CardActions >
        </>)

}
