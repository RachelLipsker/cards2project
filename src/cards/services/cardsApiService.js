import axios from "axios";

const apiUrl = "https://cards-sever.onrender.com/cards";


export const getCards = async () => {
    try {
        let response = await axios.get(apiUrl);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const getCard = async (id) => {
    try {
        let response = await axios.get(apiUrl + "/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const getMyCards = async () => {
    try {
        let response = await axios.get(apiUrl + "/my-cards");
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const deleteCard = async (id) => {
    try {
        let response = await axios.delete(apiUrl + "/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const createCard = async (card) => {
    try {
        let response = await axios.post(apiUrl, card);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}



export const changeLikeStatus = async (id) => {
    try {
        let response = await axios.patch(apiUrl + "/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}


export const editCard = async (id, card) => {
    try {
        let response = await axios.put(apiUrl + "/" + id, card);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

