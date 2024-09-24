import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm';
import initialCardForm from '../helpers/initialForms/initialCardForm';
import cardSchema from '../models/cardSchema';
import mapCardToModel from '../helpers/normalization/mapCardToModel';
import { Container } from '@mui/material';
import useCards from '../hooks/useCards';
import CardForm from '../components/CardForm';
import { useCurrentUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routesModel';
import Spinner from '../../components/Spinner';

export default function EditCardPage() {
    const { id } = useParams();
    const { user } = useCurrentUser();
    const { handleUpdateCard, getCardById, card } = useCards();
    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialCardForm, cardSchema, (data) =>
        handleUpdateCard(id, data)
    );
    useEffect(() => {
        if (card) {
            setData(mapCardToModel(card));
        } else {
            getCardById(id);
        }
    }, [card]);

    if (!user || (card && card.user_id != user._id) /*|| !user.isAdmin*/) return <Navigate to={ROUTES.ROOT} replace />

    return (
        <>
            <Container
                sx={{
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CardForm
                    title="edit card"
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    errors={errors}
                    validateForm={validateForm}
                    onInputChange={handleChange}
                    data={data}
                />
            </Container>
        </>)
}
