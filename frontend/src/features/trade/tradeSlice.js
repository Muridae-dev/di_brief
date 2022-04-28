import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import tradeService from "./tradeService";

const initialState = {
    trades: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Create new trade
export const createTrade = createAsyncThunk("trade/create", async (tradeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await tradeService.createTrade(tradeData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // Will reject and send error message as payload to the builder
        return thunkAPI.rejectWithValue(message);
    }
})


// Get trades
export const getTrade = createAsyncThunk("trade/get", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await tradeService.getTrade(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // Will reject and send error message as payload to the builder
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTrade = createAsyncThunk("trade/delete", async (id, thunkAPI) => {
    try {
        console.log("deleteTrade ran")
        const token = thunkAPI.getState().auth.user.token;
        return await tradeService.deleteTrade(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        // Will reject and send error message as payload to the builder
        return thunkAPI.rejectWithValue(message);
    }
})

export const tradeSlice = createSlice({
    name: "trade",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            //CREATE TRADE
            .addCase(createTrade.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTrade.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trades.push(action.payload);
                console.log(state.trades);
            })
            .addCase(createTrade.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //GET TRADES
            .addCase(getTrade.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrade.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trades = action.payload;
            })
            .addCase(getTrade.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })

            //DELETE TRADES
            .addCase(deleteTrade.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTrade.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trades.filter((trade) => trade._id !== action.payload.id);
            })
            .addCase(deleteTrade.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = tradeSlice.actions;
export default tradeSlice.reducer;