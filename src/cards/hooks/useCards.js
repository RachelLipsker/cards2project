import { useCallback, useEffect, useState } from "react";
import { useSnack } from "../../providers/SnackbarProvider";
import useAxios from "../../hooks/useAxios";
import { changeLikeStatus, createCard, deleteCard, editCard, getCard, getCards, getMyCards } from "../services/cardsApiService";
import normalizeCard from "../helpers/normalization/normalizeCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function useCards() {
    const navigate = useNavigate();
    const [cards, setCards] = useState(null);
    const [card, setCard] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [query, setQuery] = useState("");
    const [filterCards, setFilterCards] = useState(null);
    const [searchParams] = useSearchParams();
    const setSnack = useSnack();
    useAxios();

    useEffect(() => {
        setQuery(searchParams.get("q") ?? "");
    }, [searchParams]);

    useEffect(() => {
        if (cards) {
            setFilterCards(
                cards.filter(
                    card =>
                        card.title.includes(query) || String(card.bizNumber).includes(query) || card.subtitle.includes(query)
                )
            )
            setIsLoading(false);
        }
    }, [cards, query])

    const getAllCards = useCallback(async () => {
        try {
            const data = await getCards();
            setCards(data);
            setSnack("success", "All cards are here!");
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
    }, []);

    const getCardById = useCallback(async (id) => {
        try {
            const data = await getCard(id)
            setCard(data);
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, []);

    const getmyCards = useCallback(async () => {
        try {
            const data = await getMyCards();
            setCards(data);
            setSnack("success", "your cards are here!");
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
    }, []);

    const handleDelete = useCallback(async (id) => {
        try {
            console.log(cards);
            const deldetedCard = await deleteCard(id);
            setSnack("success", "the card has been deleted");
            setCards(cards => cards.filter(card => card._id !== deldetedCard._id));
            console.log(cards);
        } catch (e) {
            setError(err.message);
            setSnack("error", err.message);
        }
    }, []);

    const handleAddCard = useCallback(async (cardDetails) => {
        setIsLoading(true);
        try {
            const normalCard = normalizeCard(cardDetails);
            const data = await createCard(normalCard);
            setSnack("success", "the card has been created successfully");
            navigate(ROUTES.MY_CARDS);
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, [])

    const handleUpdateCard = useCallback(
        async (cardId, cardFromClient) => {
            setIsLoading(true);
            try {
                const card = await editCard(cardId, normalizeCard(cardFromClient));
                setCard(card);
                setSnack("success", "The business card has been successfully updated");
                setTimeout(() => {
                    navigate(ROUTES.MY_CARDS);
                }, 300);
            } catch (err) {
                setError(err.message);
                setSnack("error", err.message);
            }
            setIsLoading(false);
        },
        [setSnack, navigate]
    );

    const getFavCards = useCallback(async (user) => {
        setIsLoading(true);
        try {
            await getAllCards();
            setCards(cards => cards.filter(card => !!card.likes.find(id => id === user._id)))
            setSnack("success", "your favorite cards are here");
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
    }, [])

    const handleLike = useCallback(async (id, user) => {
        try {
            if (user) {
                await changeLikeStatus(id);
            } else {
                navigate(ROUTES.LOGIN);
            }
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
    }, []);

    return {
        cards,
        card,
        error,
        isLoading,
        filterCards,
        getAllCards,
        getCardById,
        handleDelete,
        handleAddCard,
        getmyCards,
        handleUpdateCard,
        getFavCards,
        handleLike,
        setCards
    };
}
