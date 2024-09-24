import { Container } from '@mui/material'
import React from 'react'
import { useCurrentUser } from '../../users/providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import useForm from '../../forms/hooks/useForm';
import initialCardForm from '../helpers/initialForms/initialCardForm';
import cardSchema from '../models/cardSchema';
import CardForm from '../components/CardForm';
import useCards from '../hooks/useCards';

export default function AddCardPage() {
    const { handleAddCard } = useCards();
    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit
    } = useForm(initialCardForm, cardSchema, handleAddCard);

    const { user } = useCurrentUser();

    if (!(user?.isBusiness || user?.isAdmin)) return <Navigate to={ROUTES.ROOT} replace />;
    return (<Container
        sx={{
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <CardForm
            onSubmit={onSubmit}
            onReset={handleReset}
            validateForm={validateForm}
            title={"add card"}
            errors={errors}
            data={data}
            onInputChange={handleChange}
        />
    </Container>)
}
