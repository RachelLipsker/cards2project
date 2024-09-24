import { useTheme } from "../../../providers/CustomThemeProvider";
import { Box, IconButton } from "@mui/material";
import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import NotLogged from "./NotLogged";
import Logged from "./Logged";
import Search from "./Search";
import MoreButton from "./MoreButton";

export default function RightNavbar() {
    const { user } = useCurrentUser();
    const { isDark, toggleDarkMode } = useTheme();
    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
            }}
        >
            <Search />

            <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {user ? <Logged /> : <> <NotLogged /> <MoreButton /> </>}

        </Box>
    );
}
