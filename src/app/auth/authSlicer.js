import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.config";

// Initial state
const initialState = {
  user: null,
  error: null,
  email: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.firstName;
      state.email = action.payload.email;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.user = null;
    },
    signOut: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

// Thunk actions
export const signUp = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    dispatch(setUser(userCredential.user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    console.log(userCredential);
    dispatch(setUser(userCredential.user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await auth().signOut();
    dispatch(signOut());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Actions
export const { setUser, setError } = authSlice.actions;

// Selector
export const selectUser = (state) => state.auth.user;
// Reducer
export default authSlice.reducer;
