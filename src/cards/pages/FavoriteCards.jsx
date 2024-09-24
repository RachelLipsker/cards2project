import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { useCurrentUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routesModel';
import useCards from '../hooks/useCards';
import { Navigate } from 'react-router-dom';
import CardsFeedback from '../components/CardsFeedback';
import AddNewCardButton from '../components/AddNewCardButton';

export default function FavoriteCards() {
    const { user } = useCurrentUser();

    const { cards, filterCards, error, isLoading, getFavCards, handleDelete, handleLike, setCards } =
        useCards();

    useEffect(() => {
        getFavCards(user);
    }, [user]);

    const onLike = async (id, user) => {
        await handleLike(id, user);
        const newCard = cards.find(card => card._id === id);
        setCards(cards => cards.filter(card => card._id !== newCard._id && newCard.likes.includes(user._id)));
    }

    if (!user) return <Navigate to={ROUTES.ROOT} replace />;

    return (
        <>
            <PageHeader title="Favorite Cards" subtitle="welcome to favorite cards page" />

            <CardsFeedback
                cards={filterCards}
                handleDelete={handleDelete}
                handleLike={onLike}
                isLoading={isLoading}
                error={error}
            />

            {user && user.isBusiness ? <AddNewCardButton /> : null}
        </>
    )
}
