import { createSlice } from '@reduxjs/toolkit';
import { type User } from "../lib/lib";

const loadInitialUserState = (): User => {
  try {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      const parsedUser = JSON.parse(savedUser);
      return {
        id: parsedUser.id || 0,
        username: parsedUser.username || "",
        email: parsedUser.email || "",
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
  }

  return {
    id: 0,
    username: "",
    email: "",
    isAuthenticated: false,
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadInitialUserState(), 
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;