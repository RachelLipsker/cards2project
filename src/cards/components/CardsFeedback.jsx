import React from "react";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { Typography } from "@mui/material";
import Cards from "./Cards";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function CardsFeedback({ isLoading, cards, error, handleDelete, handleLike }) {
    const { isDark } = useTheme();
    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    if (cards && cards.length === 0)
        return (
            <Typography m={2} sx={{ color: isDark ? "#fff" : "inherit" }}>
                Oops... it seems there are no business cards to display
            </Typography>
        );

    if (cards)
        return (
            <Cards
                cards={cards}
                handleDelete={handleDelete}
                handleLike={handleLike}
            />
        );

    return null;
}
