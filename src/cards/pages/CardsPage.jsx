import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import CardsFeedback from '../components/CardsFeedback';
import useCards from "../hooks/useCards";
import AddNewCardButton from '../components/AddNewCardButton';
import { useCurrentUser } from '../../users/providers/UserProvider';

export default function CardsPage() {
    const { cards, filterCards, error, isLoading, getAllCards, handleDelete, handleLike } =
        useCards();
    const { user } = useCurrentUser();
    useEffect(() => {
        getAllCards();
    }, []);

    return (
        <>
            <PageHeader
                title="Cards"
                subtitle="On this page you can find all bussines cards from all categories"
            />
            <CardsFeedback
                cards={filterCards}
                handleDelete={handleDelete}
                handleLike={handleLike}
                isLoading={isLoading}
                error={error}
            />

            {user && user.isBusiness ? <AddNewCardButton /> : null}
        </>
    )
}
