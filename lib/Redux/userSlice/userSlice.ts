import { authService } from "@/services/Authservice";
import { User } from "@/types/auth.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.isAuthenticated();
      return user;
      //eslint-disable-next-line
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
