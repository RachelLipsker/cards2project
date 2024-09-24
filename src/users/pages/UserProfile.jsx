import React, { useEffect } from "react";
import Spinner from "../../components/Spinner";
import {
    Box,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Error from "../../components/Error";
import { useCurrentUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";

import { Avatar } from "@mui/material";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function UserProfile() {
    const { user } = useCurrentUser();
    const { getUserById, isLoading, error, profile } = useUsers();

    useEffect(() => {
        if (user) {
            getUserById(user._id)
        }
    }, [user]);
    if (!user) return <Navigate to={ROUTES.ROOT} replace />;

    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;

    return (
        <>
            <PageHeader
                title="User Profile"
                subtitle="Here you can see your account details"
                sx={{ mb: 4 }}
            />
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Avatar
                                alt={profile.image.alt}
                                src={profile.image.url}
                                sx={{ width: 200, height: 200 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper elevation={2} sx={{ p: 4 }}>
                                <Typography variant="h4" component="div" gutterBottom>
                                    {profile.name.first} {profile.name.middle}{" "}
                                    {profile.name.last}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {profile.isBusiness ? "business user" : null}
                                    {profile.isAdmin ? ", admin" : null}
                                </Typography>
                                <Divider sx={{ my: 2 }} />

                                <Typography variant="body1" gutterBottom>
                                    Email: {profile.email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Phone: {profile.phone}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Address: {profile.address.street}{" "}
                                    {profile.address.houseNumber}, {profile.address.city},{" "}
                                    {profile.address.state != "not defined" ? <>{profile.address.state} ,</> : null} {profile.address.country}
                                    {profile.address.zip == 0 ? "." : <>, {profile.address.zip} .</>}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body2" color="text.secondary">
                                    this user has been created at: {profile.createdAt}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}