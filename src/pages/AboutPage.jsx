import React from "react";
import { Box, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { useTheme } from "../providers/CustomThemeProvider";

export default function AboutPage() {
    const { isDark } = useTheme();
    return (
        <>
            <PageHeader
                title="About Page"
                subtitle="On this page you can find explanations about using the application"
            />
            <Box
                sx={{ p: 2, display: { xs: "block", md: "inline-flex" } }}
                alignItems="center"
                mt={4}>
                <Typography variant="body1" paragraph sx={{ color: isDark ? "#fff" : "inherit" }}>
                    This site displays business business cards, which display information about the business
                    The site was built in react, in the Vite environment. In order to run it after downloading from GitHub, run npm i in the terminal and then npm run dev.
                    As you can see in the example card, each card shows a title, a sub-title, and communication details with the business: cell phone, address and email. By clicking on the card you can enter the business page.
                    The website has a "light mode" and a "dark mode", by clicking on the Hadar icon you can change this and adjust the display to what is convenient for you.
                    You can register and mark cards you liked as favorites, and expect to update your profile. If you register as a 'business user' you can also create a business card for your business and publish it, and join over 200 businesses advertised on the site. You can always edit or delete the business cards you created.
                    If you want to search for a specific ticket, you can enter a keyword in the search and pull a ticket from the main ticket page, from your favorite tickets or from your tickets.
                    successfully!
                </Typography>
                <Box
                    component="img"
                    src="../../public/images/card.png"
                    alt="an example card"
                    sx={{ width: '100%', maxWidth: 300 }}
                />
            </Box>
        </>
    );
}

