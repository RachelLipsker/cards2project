import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import RightNavbar from "./right-navigation/RightNavBar";
import { MenuProvider } from "./menu/MenuProvider";

export default function Header() {
    return (
        <MenuProvider>
            <AppBar position="sticky" color="primary" elevation={10}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <LeftNavBar />
                    <RightNavbar />
                </Toolbar>
            </AppBar>
        </MenuProvider>
    );
}
