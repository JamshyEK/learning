import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Suspense } from "react";
import LoadingSpinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
        <ToastContainer style={{ color: "black" }} autoClose={2000} />
      </Suspense>
    </>
  );
}

export default App;
