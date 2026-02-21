# SmartMove Frontend

React + Redux Toolkit customer-facing app for browsing cars and managing bookings.

## Setup

```bash
npm install
```

## Run Dev Server

```bash
npm run dev
```

Default Vite port: `5173`

## Environment Variables

Create `.env` in `smartmove-frontend`:

```env
VITE_API_URL=http://localhost:8000/api
```

- `VITE_API_URL`: Base URL for backend API routes.

## Routes / Pages

- `/` → Home
- `/cars` → Cars listing with filters/search/sort
- `/cars/:id` → Car detail + booking form
- `/login` → User login
- `/register` → User registration
- `/bookings` → My bookings (private)
- `/profile` → Profile (private)

## Redux Store Structure

- `auth` slice
  - user, token, loading, error
  - async thunks: `loginUser`, `registerUser`
  - reducers: `logout`, `clearError`
- `cars` slice
  - cars, car, loading, error
  - async thunks: `fetchCars`, `fetchCarById`
- `bookings` slice
  - bookings, loading, error, success
  - async thunks: `fetchMyBookings`, `createBooking`, `cancelBooking`
  - reducers: `clearBookingSuccess`, `clearBookingError`

## How Auth Works

1. Login/register requests backend `/api/auth/*` endpoints.
2. On success, JWT token and user are stored in `localStorage` (`token`, `user`).
3. Axios interceptor attaches `Authorization: Bearer <token>` automatically.
4. `PrivateRoute` guards `/bookings` and `/profile`.
5. Logout clears Redux auth state and localStorage.
