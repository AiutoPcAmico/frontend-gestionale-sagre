import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { HomePage } from "../pages/Homepage";
import { Error404 } from "../pages/Error404";
import { ProtectedRoute } from "./ProtectedRoute";
import { AllReservations } from "../pages/cashDesk/AllReservations.js";
import { DetailsReservation } from "../pages/cashDesk/DetailsReservation";
import { NewReservation } from "../pages/cashDesk/NewReservation";
import { GenericOperatorPage } from "../pages/operator/GenericOperatorPage";

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
            <GenericOperatorPage
              key={"pizzeria"}
              supCategory={"pizzeria"}
              supType={"foods"}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gastronomy"
        element={
          <ProtectedRoute>
            <GenericOperatorPage
              key={"cucina"}
              supCategory={"cucina"}
              supType={"foods"}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/grill"
        element={
          <ProtectedRoute>
            <GenericOperatorPage
              key={"griglia"}
              supCategory={"griglia"}
              supType={"foods"}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bar"
        element={
          <ProtectedRoute>
            <GenericOperatorPage
              key={"bar"}
              supCategory={"bar"}
              supType={"beverages"}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/drinkscounter"
        element={
          <ProtectedRoute>
            <GenericOperatorPage
              key={"bancone"}
              supCategory={"bancone"}
              supType={"beverages"}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plate"
        element={
          <ProtectedRoute>
            <GenericOperatorPage
              key={"piastra"}
              supCategory={"piastra"}
              supType={"foods"}
            />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}

export { RouterHandler };
