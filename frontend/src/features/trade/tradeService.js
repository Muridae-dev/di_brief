import axios from "axios";

const API_URL = "/trade/";

// Create trade request
const createTrade = async (tradeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    console.log(tradeData);
    const response = await axios.post(API_URL, tradeData, config)

    return tradeData;
}

// Get trades
const getTrade = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);
    
    return response.data;
}

const tradeService = {
    createTrade,
    getTrade
}

export default tradeService;