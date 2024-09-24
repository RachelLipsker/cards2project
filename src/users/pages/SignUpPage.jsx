import React from 'react'
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import { useCurrentUser } from '../providers/UserProvider';
import SignupForm from '../components/SignupForm';
import useForm from '../../forms/hooks/useForm';
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/signupSchema";
import { Container } from '@mui/material';
import useUsers from '../hooks/useUsers';
import PageHeader from '../../components/PageHeader';

export default function SignUpPage() {
    const { isLoading, handleSignup } = useUsers();
    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
        handleChangeCheckBox,
    } = useForm(initialSignupForm, signupSchema, handleSignup);

    const { user } = useCurrentUser();

    if (user) return <Navigate to={ROUTES.ROOT} replace />;
    return (
        <>
            <PageHeader
                title="Welcome to signup page"
                subtitle="here you can sigunp"
            />
            <Container
                sx={{
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <SignupForm
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    validateForm={validateForm}
                    title={"register form"}
                    errors={errors}
                    data={data}
                    onInputChange={handleChange}
                    handleChangeCheckBox={handleChangeCheckBox}
                />
            </Container>
        </>)
}
