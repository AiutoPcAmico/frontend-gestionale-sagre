import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/Login";
import { HomePage } from "../pages/Homepage";
import { Error404 } from "../pages/Error404";
import { ProtectedRoute } from "./ProtectedRoute";
import { AllReservations } from "../pages/cashDesk/AllReservations.js";
import { DetailsReservation } from "../pages/cashDesk/DetailsReservation";
import { NewReservation } from "../pages/cashDesk/NewReservation";
import { GenericOperatorPage } from "../pages/operator/GenericOperatorPage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function RouterHandler({ selSelectedPage }) {
  const pagesFromDB = useSelector((state) => state.sessionInfo.pages);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    //formatting data for pages
    if (pagesFromDB && pagesFromDB.length > 0) {
      var formattedData = [];
      pagesFromDB.forEach((element) => {
        formattedData.push({
          name: element.nome,
          key: element.idPagina,
          path: element.percorso,
          type: element.tipo,
        });
      });
    }

    setPages(formattedData);
  }, [pagesFromDB]);

  return (
    <Routes>
      <Route key={"index"} index element={<HomePage></HomePage>} />
      <Route key={"login"} path="/login" element={<SignIn></SignIn>} />

      {pages &&
        pages.map((single) => {
          switch (single.path) {
            case "/cashdesk/allreservations":
              return (
                <Route
                  key={single.key}
                  path={single.path}
                  element={
                    <ProtectedRoute>
                      <AllReservations />
                    </ProtectedRoute>
                  }
                />
              );
            case "/cashdesk/reservationdetails/:id":
              return (
                <Route
                  key={single.key}
                  path={single.path}
                  element={
                    <ProtectedRoute>
                      <DetailsReservation />
                    </ProtectedRoute>
                  }
                />
              );
            case "/cashdesk/newreservation":
              return (
                <Route
                  key={single.key}
                  path={single.path}
                  element={
                    <ProtectedRoute>
                      <NewReservation />
                    </ProtectedRoute>
                  }
                />
              );

            default:
              return (
                <Route
                  path={single.path}
                  key={single.key}
                  element={
                    <ProtectedRoute>
                      <GenericOperatorPage
                        key={single.key}
                        supCategory={single.name}
                        supType={single.type}
                      />
                    </ProtectedRoute>
                  }
                />
              );
          }
        })}

      <Route key={"404"} path="/*" element={<Error404 />} />
    </Routes>
  );
}

export { RouterHandler };
