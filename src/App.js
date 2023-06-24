import { useDispatch } from "react-redux";
import AppRouter from "./router/AppRouter";
import { useEffect } from "react";
import { listenToAuthChanges } from "./app/auth/authSlicer";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(listenToAuthChanges());
  // }, [dispatch]);
  return <AppRouter />;
}

export default App;
