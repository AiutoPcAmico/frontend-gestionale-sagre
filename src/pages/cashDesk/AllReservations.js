import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllReservations } from "../../apis/indexSagreApi";
import { LoadingFS } from "../../components/LoadingFS";
import { SnackMessage } from "../../components/SnackMessage";
import { AllReservationsTable } from "../../components/AllReservationsTable.js";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { useNavigate } from "react-router-dom";

function AllReservations() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  function createData(singleRes) {
    const totaleCompleto =
      (parseFloat(singleRes.totaleCibi) || 0) +
      (parseFloat(singleRes.totaleBevande) || 0);
    return {
      idReservation: singleRes.idPrenotazione,
      dateTime: singleRes.dataOra,
      table: singleRes.tavolo,
      people: singleRes.coperti,
      name: singleRes.nominativo,
      isPaied: singleRes.isPagato,
      isFinished: singleRes.isConcluso,
      totalPrice: totaleCompleto,
    };
  }

  const columns = [
    {
      id: "dateTime",
      label: "Data e Ora",
      type: "dateTime",
      minWidth: 100,
      format: (value) => {
        const data = new Date(value);
        return (
          data.toLocaleDateString("it-IT") +
          " " +
          data.toLocaleTimeString("it-IT")
        );
      },
    },

    { id: "name", label: "Nominativo", minWidth: 170, type: "string" },
    {
      id: "table",
      label: "Tavolo",
      minWidth: 10,
      type: "string",
      align: "center",
    },
    {
      id: "people",
      label: "Coperti",
      minWidth: 10,
      type: "number",
      align: "center",
    },
    {
      id: "isFinished",
      label: "Conclusa",
      minWidth: 30,
      type: "string",
      align: "center",

      format: (value) => {
        if (value === 1) return "Si";
        else return "";
      },
    },
    {
      id: "isPaied",
      label: "Pagato",
      minWidth: 30,
      align: "center",

      type: "string",
      format: (value) => {
        if (value === 1) return <Typography color={"green"}>Si</Typography>;
        else return <Typography color={"error"}>No</Typography>;
      },
    },

    {
      id: "totalPrice",
      label: "Totale",
      minWidth: 50,
      align: "right",
      format: (value) => {
        const converted = parseFloat(value);
        return converted?.toFixed(2) + " €";
      },
    },
    {
      id: "",
      label: "Azioni",
      minWidth: 50,
      format: (value, idReservation) => {
        return (
          <div
            onClick={() => {
              navigate("/cashdesk/reservationDetail/" + idReservation);
            }}
          >
            <SavedSearchIcon color="primary" />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    getAllReservations().then((response) => {
      if (response.isError === false) {
        //is ok, i'll save all the data
        //preparing list
        const formattedData = response.data.data.map((single) => {
          return createData(single);
        });

        setList(formattedData);
      } else {
        setErrorMessage(response.messageError);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="pages">
      <div className="cashDesk">
        <div className="paddedPage">
          <Typography>Pippo!</Typography>
          <AllReservationsTable dataTable={list} columnsTable={columns} />
        </div>
      </div>
      <LoadingFS isOpened={isLoading} />
      <SnackMessage
        duration={5000}
        isOpened={!!errorMessage}
        message={errorMessage}
        setIsOpened={() => {
          setErrorMessage(null);
        }}
        type={"error"}
      />
    </div>
  );
}

export { AllReservations };
