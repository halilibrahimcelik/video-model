import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
const storedAuthData = localStorage.getItem("isUserLoggedIn");
// Initial state
const initialState = {
  user: null,
  error: null,
  email: null,
  userId: null,
  isLoggedIn: storedAuthData
    ? JSON.parse(localStorage.getItem("isUserLoggedIn"))
    : null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.displayName;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.error = null;
      state.isLoggedIn = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.userId = null;
      state.isLoggedIn = true;
    },
    signOut: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

// Thunk actions
export const signUp = (email, password, firstName) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: firstName,
    });
    const updatedUser = {
      userId: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: firstName,
    };
    dispatch(setUser(updatedUser));
    localStorage.setItem("isLoggedIn", true);
  } catch (error) {
    dispatch(setError(error.message));
    toast.error(error.message, {
      position: "top-right",
      autoClose: 1200,
      className: "mt-20",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(error);
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential.user) {
      const userObj = {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };
      localStorage.setItem("isLoggedIn", true);
      dispatch(setUser(userObj));
      toast.success("Giriş başarılı", {
        position: "top-left",
        autoClose: 2000,
        className: "mt-20",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    dispatch(setError(error.message));
    console.log(error.message);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(signOut());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const listenToAuthChanges = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userObj = {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      dispatch(setUser(userObj));
      localStorage.setItem("isLoggedIn", true);
    }
    // Set loading state to false after initial check
  });
};
// Actions
export const { setUser, setError, setUploadFile } = authSlice.actions;

// Selector
export const selectUser = (state) => state.auth.user;
export const selectUserId = (state) => state.auth.userId;
export const selectUploaded = (state) => state.auth.uploaded;
export const selectLoggedIn = (state) => state.auth.isLoggedIn;
// Reducer
export default authSlice.reducer;
