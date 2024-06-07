import { createSlice } from '@reduxjs/toolkit';

export const fetchInventoryData = () => async dispatch => {
    try {
        const response = await fetch('http://localhost:5000/api/inventory');
        const data = await response.json();
        dispatch(setInventoryData(data));
    } catch (err) {
        console.error(err);
    }
};

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        data: [],
    },
    reducers: {
        setInventoryData: (state, action) => {
        state.data = action.payload;
        },
    },
});

export const { setInventoryData } = inventorySlice.actions;
export default inventorySlice.reducer;