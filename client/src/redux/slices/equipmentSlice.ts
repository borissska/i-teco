import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { EStatus } from "../../shared/@types/status_type";
import { Equipment, equipmentSchema, IEquipment } from "../../shared/@types/equipments_type";

const API_URL = "http://localhost:3001";

export const getEquipment = createAsyncThunk<Equipment[]>(
  "/equipment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/equipment`) 

      if (!response.data.equipments) {
        return rejectWithValue("Оборудование не найдено");
      }

      const validatedEquipment: Equipment[] = response.data.equipments.map((equipment: Equipment) => equipmentSchema.parse(equipment));

      return validatedEquipment;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки оборудования");
    }
  }
);

const initialState: IEquipment = {
    equipment: [],
    status: EStatus.EMPTY,
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEquipment.pending, (state) => {
        state.status = EStatus.LOADING;
      })
      .addCase(getEquipment.fulfilled, (state, action: PayloadAction<Equipment[]>) => {
        state.status = EStatus.SUCCESS;
        state.equipment = action.payload;
      })
      .addCase(getEquipment.rejected, (state) => {
        state.status = EStatus.ERROR;
      });
  },
});

export default equipmentSlice.reducer;
