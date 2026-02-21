import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  cars: [],
  car: null,
  loading: false,
  error: null
};

/**
 * Fetch all cars using optional query filters.
 * @param {{ type?: string, fuel?: string, minPrice?: string|number, maxPrice?: string|number }} filters
 */
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      const response = await api.get('/cars', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cars');
    }
  }
);

/**
 * Fetch one car by id.
 * @param {string} id
 */
export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch car');
    }
  }
);

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

/**
 * Select car collection.
 * @param {import('../index').RootState} state
 */
export const selectCars = (state) => state.cars.cars;

/**
 * Select active car detail.
 * @param {import('../index').RootState} state
 */
export const selectCar = (state) => state.cars.car;

/**
 * Select loading flag for car requests.
 * @param {import('../index').RootState} state
 */
export const selectCarsLoading = (state) => state.cars.loading;

export default carSlice.reducer;
