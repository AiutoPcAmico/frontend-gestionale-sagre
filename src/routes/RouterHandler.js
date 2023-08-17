import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { HomePage } from "../pages/Homepage";
import { Error404 } from "../pages/Error404";
import { ProtectedRoute } from "./ProtectedRoute";
import { AllReservations } from "../pages/cashDesk/AllReservations.js";
import { DetailsReservation } from "../pages/cashDesk/DetailsReservation";
import { NewReservation } from "../pages/cashDesk/NewReservation";
import { PizzeriaPage } from "../pages/Pizzeria";

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

      <Route
        path="/cashdesk/reservationdetails/:id"
        element={
          <ProtectedRoute>
            <DetailsReservation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cashdesk/newreservation/"
        element={
          <ProtectedRoute>
            <NewReservation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pizza"
        element={
          <ProtectedRoute>
            <PizzeriaPage />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}

export { RouterHandler };
