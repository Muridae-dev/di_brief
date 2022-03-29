import {createSlice, createAsyncThunk, isFulfilled} from "@reduxjs/toolkit";
import itemService from "./itemService";

const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Create new item
export const createItem = createAsyncThunk("items/create", async (itemData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await itemService.createItem(itemData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // Will reject and send error message as payload to the builder
        return thunkAPI.rejectWithValue(message);
    }
})

// Get user items
export const getItems = createAsyncThunk("items/getAll", async (api_url, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await itemService.getItems(token, api_url)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // Will reject and send error message as payload to the builder
        return thunkAPI.rejectWithValue(message);
    }
})


// Delete item
export const deleteItem = createAsyncThunk("items/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await itemService.deleteItem(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // Will reject and send error message as payload to the builder
        return thunkAPI.rejectWithValue(message);
    }
})

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            // CREATE ITEM
            .addCase(createItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items.push(action.payload);
                console.log(state.items);
            })
            .addCase(createItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // GET ITEMs
            .addCase(getItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })
            .addCase(getItems.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // DELETE ITEMs
            .addCase(deleteItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Filtering out the item with said ID, showing the other items
                state.items = state.items.filter((item) => item._id !== action.payload.id)
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = itemSlice.actions;
export default itemSlice.reducer;