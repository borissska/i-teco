import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { EEquipmentStatus, EStatus } from "../../shared/@types/status_type";
import { Equipment, equipmentSchema, IEquipment } from "../../shared/@types/equipments_type";

const API_URL = "http://localhost:3001";

export const getEquipment = createAsyncThunk<Equipment[]>(
  "/equipment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/equipment`);

      if (!response.data.equipments) {
        return rejectWithValue("Оборудование не найдено");
      }

      const validatedEquipment: Equipment[] = response.data.equipments.map((equipment: Equipment) =>
        equipmentSchema.parse(equipment)
      );

      return validatedEquipment;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки оборудования");
    }
  }
);

export const updateEquipmentStatus = createAsyncThunk(
  "equipment/updateStatus",
  async ({ id, status }: { id: number; status: EEquipmentStatus }, { rejectWithValue }) => {
    try {
      await axios.patch(`${API_URL}/equipment/${id}`, { status });
      console.log("Данные отправлены", id, status)
      return { id, status };
    } catch (error) {
      return rejectWithValue("Ошибка обновления статуса");
    }
  }
);

const initialState: IEquipment = {
  equipment: [],
  equipment_status: EStatus.EMPTY,
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEquipment.pending, (state) => {
        state.equipment_status = EStatus.LOADING;
      })
      .addCase(getEquipment.fulfilled, (state, action: PayloadAction<Equipment[]>) => {
        state.equipment_status = EStatus.SUCCESS;
        state.equipment = action.payload;
      })
      .addCase(getEquipment.rejected, (state) => {
        state.equipment_status = EStatus.ERROR;
      })
      .addCase(
        updateEquipmentStatus.fulfilled,
        (state, action: PayloadAction<{ id: number; status: EEquipmentStatus }>) => {
          const equipment = state.equipment.find((equipment) => equipment.id === action.payload.id);
          if (equipment) {
            equipment.status = action.payload.status;
          }
        }
      );
  },
});

export default equipmentSlice.reducer;
