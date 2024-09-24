import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import CardsFeedback from '../components/CardsFeedback';
import useCards from "../hooks/useCards";
import AddNewCardButton from '../components/AddNewCardButton';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';

export default function MyCards() {
    const { cards, filterCards, error, isLoading, getmyCards, handleDelete, handleLike } =
        useCards();
    const { user } = useCurrentUser();
    useEffect(() => {
        getmyCards();
    }, []);

    if (!(user && (user.isBusiness || user.isAdmin))) return <Navigate to={ROUTES.ROOT} replace />;
    return (
        <>
            <PageHeader title="My Cards" subtitle="welcome to my cards page" />
            <CardsFeedback
                cards={filterCards}
                handleDelete={handleDelete}
                handleLike={handleLike}
                isLoading={isLoading}
                error={error}
            />

            <AddNewCardButton />
        </>
    )
}
