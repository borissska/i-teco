import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder, Order, orderSchema } from "../../shared/@types/order_type";
import { EOrderStatus, EStatus } from "../../shared/@types/status_type";

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

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }: { id: number; status: EOrderStatus }, { rejectWithValue }) => {
    try {
      await axios.patch(`${API_URL}/orders/${id}`, { status });
      return { id, status };
    } catch (error) {
      return rejectWithValue("Ошибка обновления статуса");
    }
  }
);

const initialState: IOrder = {
  orders: [],
  order_status: EStatus.EMPTY,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.order_status = EStatus.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.order_status = EStatus.SUCCESS;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.order_status = EStatus.ERROR;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<{ id: number; status: EOrderStatus }>) => {
        const order = state.orders.find((order) => order.id === action.payload.id);
        if (order) {
          order.status = action.payload.status;
        }
      });
  },
});

export default orderSlice.reducer;
