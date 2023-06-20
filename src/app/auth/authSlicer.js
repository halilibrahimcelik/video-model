import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Initial state
const initialState = {
  user: null,
  error: null,
  email: null,
  userId: null,
  uploaded: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.displayName;
      state.email = action.payload.email;
      state.userId = action.payload.uid;
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
    setUploadFile: (state, action) => {
      state.uploaded = action.payload.uploaded;
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
    updateProfile(auth.currentUser, {
      displayName: firstName,
    })
      .then(() => {
        // Profile updated!
        const user = {
          userId: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: firstName,
        };
        dispatch(setUser(auth.currentUser));
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    dispatch(setError(error.message));
    console.log(error);
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      userCredential.user.displayName && dispatch(setUser(userCredential.user));
    });
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
      dispatch(setUser(user));
    } else {
      dispatch(signOut());
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

// Reducer
export default authSlice.reducer;
