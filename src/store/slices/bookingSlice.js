import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
  success: false
};

/**
 * Fetch authenticated user bookings.
 */
export const fetchMyBookings = createAsyncThunk(
  'bookings/fetchMyBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bookings/my');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

/**
 * Create booking for a car and date range.
 * @param {{ carId: string, startDate: string, endDate: string }} payload
 */
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post('/bookings', payload);
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

/**
 * Cancel a booking by id and patch local booking state status.
 * @param {string} bookingId
 */
export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bookings/${bookingId}/cancel`);
      return response.data.booking;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel booking');
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookingSuccess: (state) => {
      state.success = false;
    },
    clearBookingError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings = [action.payload, ...state.bookings];
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload._id
            ? { ...booking, status: action.payload.status }
            : booking
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBookingSuccess, clearBookingError } = bookingSlice.actions;

/**
 * Select bookings list for current user.
 * @param {import('../index').RootState} state
 */
export const selectBookings = (state) => state.bookings.bookings;

/**
 * Select loading flag for booking requests.
 * @param {import('../index').RootState} state
 */
export const selectBookingsLoading = (state) => state.bookings.loading;

/**
 * Select booking success flag used after createBooking.
 * @param {import('../index').RootState} state
 */
export const selectBookingSuccess = (state) => state.bookings.success;

/**
 * Select booking error value.
 * @param {import('../index').RootState} state
 */
export const selectBookingError = (state) => state.bookings.error;

export default bookingSlice.reducer;
