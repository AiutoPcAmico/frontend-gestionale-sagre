import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { HomePage } from "../pages/Homepage";
import { Error404 } from "../pages/Error404";
import { ProtectedRoute } from "./ProtectedRoute";
import { AllReservations } from "../pages/cashDesk/AllReservations.js";

function RouterHandler({ selSelectedPage }) {
  return (
    <Routes>
      <Route index element={<HomePage></HomePage>} />
      <Route path="/login" element={<SignIn></SignIn>} />
      <Route
        path="/cashdesk/allreservations"
        element={
          <ProtectedRoute>
            <AllReservations />
          </ProtectedRoute>
        }
      />

      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}

export { RouterHandler };
