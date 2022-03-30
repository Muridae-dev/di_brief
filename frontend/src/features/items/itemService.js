import axios from "axios";

const API_URL = "/items/";


// Create new item
const createItem = async (itemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            
        }
    }

    console.log(itemData);

    let bodyFormData = new FormData();
    bodyFormData.append("text", itemData.text)
    bodyFormData.append("picture", itemData.picture)
    bodyFormData.append("color", itemData.color)
    itemData.tags.forEach(element => bodyFormData.append("tags", element))
    const response = await axios.post(API_URL, bodyFormData, config)

    return response.data;
}

// Get only user or all items based on "alt_url"
const getItems = async (token, alt_url) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(alt_url, config)

    return response.data;
}


// Delete item
const deleteItem = async (itemId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + itemId, config)

    return response.data;
}

// Update item
const updateItem = async (itemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + itemData._id, itemData, config);

    return response.data;
}

const itemService = {
    createItem,
    getItems,
    deleteItem,
    updateItem,
}

export default itemService;