import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder, Order, orderSchema } from "../../shared/@types/order_type";
import { EStatus } from "../../shared/@types/status_type";

const API_URL = "http://localhost:3001";

export const getOrders = createAsyncThunk<Order[]>("/orders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/orders`);

    if (!response.data.orders) {
      return rejectWithValue("Заказы не найдены");
    }
    const validatedOrders: Order[] = response.data.orders.map((order: Order) => {
      const parsedOrder = orderSchema.parse(order);

      return {
        ...parsedOrder,
        startDate: new Date(parsedOrder.startDate).toDateString(),
        endDate: new Date(parsedOrder.endDate).toDateString(),
      };
    });

    return validatedOrders;
  } catch (error) {
    return rejectWithValue("Ошибка загрузки заказов");
  }
});

const initialState: IOrder = {
  orders: [],
  status: EStatus.EMPTY,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = EStatus.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = EStatus.SUCCESS;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = EStatus.ERROR;
      });
  },
});

export default orderSlice.reducer;
