import { login } from "@/utils/https/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  data: {
    id: null,
    pin: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    image: null,
    balance: null,
  },
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const loginThunk = createAsyncThunk("user/login", async (body, controller) => {
  try {
    const response = await login(body, controller);
    return response.data;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (prevState, action) => {
      return {
        ...prevState,
        token: action.payload.token,
        data: {
          ...prevState.data,
          id: action.payload.id,
          pin: action.payload.pin,
        },
      };
    },
    getDataProfile: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phone: action.payload.noTelp,
          email: action.payload.email,
          image: action.payload.image,
          balance: action.payload.balance,
        },
      };
    },
    editNameUser: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
      };
    },
    editPhoneUser: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          phone: action.payload,
        },
      };
    },

    editImage: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          image: action.payload,
        },
      };
    },

    editBalanceRedux: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          balance: action.payload,
        },
      };
    },
    logoutRedux: (prevState) => {
      return {
        ...prevState,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isRejected = false;
        state.isFulfilled = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFulfilled = true;
        state.token = action.payload.token || null;
        state.data = action.payload.dataUser || null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.err = action.payload;
      });
  },
});

export const userAction = { ...userSlice.actions, loginThunk };
export default userSlice.reducer;