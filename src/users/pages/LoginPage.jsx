import React from 'react'
import PageHeader from '../../components/PageHeader'
import { Link, Navigate } from "react-router-dom";
import ROUTES from '../../routes/routesModel';
import { useCurrentUser } from '../providers/UserProvider';
import useForm from '../../forms/hooks/useForm';
import loginSchema from '../models/loginSchema';
import initialLoginForm from '../helpers/initialForms/initialLoginForm';
import { Button, Container, Grid } from '@mui/material';
import Form from '../../forms/components/Form';
import Input from '../../forms/components/Input';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useUsers from '../hooks/useUsers';
import Spinner from '../../components/Spinner';

export default function LoginPage() {
    const { isLoading, handleLogin } = useUsers();

    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialLoginForm, loginSchema, handleLogin);

    const { user } = useCurrentUser();

    if (user) return <Navigate to={ROUTES.ROOT} replace />;
    return (
        <>
            <PageHeader
                title="Welcome to Login page"
                subtitle="here you can log in"
            />
            <Container>

                <Container
                    sx={{
                        paddingTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Form
                        title="login"
                        styles={{ maxWidth: "450px" }}
                        to={ROUTES.ROOT}
                        onSubmit={onSubmit}
                        onReset={handleReset}
                        validateForm={validateForm}
                    >
                        <Input
                            label="email"
                            name="email"
                            type="email"
                            error={errors.email}
                            onChange={handleChange}
                            data={data}
                        />
                        <Input
                            label="password"
                            name="password"
                            type="password"
                            error={errors.password}
                            onChange={handleChange}
                            data={data}
                        />
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                component={Link}
                                to={ROUTES.SIGNUP}
                                startIcon={<AccountBoxIcon />}
                                sx={{ width: "100%" }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Form>
                </Container>
            </Container>
        </>
    )
}
