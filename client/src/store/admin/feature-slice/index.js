import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const removeFeatureImage = createAsyncThunk(
  "/feature/removeFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/feature/remove/${id}`
    );

    return response.data;
  }
);

const adminFeatureSlice = createSlice({
  name: "adminFeatureSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(removeFeatureImage.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      });
  },
});

// export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminFeatureSlice.reducer;
