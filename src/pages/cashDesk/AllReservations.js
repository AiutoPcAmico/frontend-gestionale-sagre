import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllReservations, updateIsPaid } from "../../apis/indexSagreApi";
import { LoadingFS } from "../../components/LoadingFS";
import { SnackMessage } from "../../components/SnackMessage";
import { PersonalizedTable } from "../../components/PersonalizedTable.js";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function AllReservations() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function createData(singleRes) {
    const totaleCompleto =
      (parseFloat(singleRes.totaleCibi) || 0) +
      (parseFloat(singleRes.totaleBevande) || 0);
    return {
      key: singleRes.idPrenotazione,
      idReservation: singleRes.idPrenotazione,
      dateTime: singleRes.dataOra,
      table: singleRes.tavolo,
      people: singleRes.coperti,
      name: singleRes.nominativo,
      isPaid: singleRes.isPagato === 0 ? false : true,
      isFinished: singleRes.isConcluso,
      totalPrice: totaleCompleto,
    };
  }

  async function changePaid(isPaid, row) {
    setIsLoading(true);

    const status = await updateIsPaid(isPaid, row.idReservation);
    if (status.isError) {
      enqueueSnackbar("Errore! " + status.messageError, {
        variant: "error",
        autoHideDuration: 5000,
        preventDuplicate: false,
      });
    } else {
      //finding position of id
      const index = list.indexOf(row);
      //cloning old Array
      const newArr = JSON.parse(JSON.stringify(list));
      //setting isPaid
      newArr[index].isPaid = isPaid;
      //saving
      console.log(newArr[index]);
      setList(newArr);

      enqueueSnackbar("Aggiornamento avvenuto con successo!", {
        variant: "success",
        autoHideDuration: 3000,
        preventDuplicate: false,
      });
    }
    setIsLoading(false);
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
      id: "isPaid",
      label: "Pagato",
      minWidth: 30,
      align: "center",

      type: "string",
      format: (value, row) => {
        return (
          <FormGroup>
            <FormControlLabel
              control={<Switch color="warning" />}
              checked={value}
              label={
                value ? (
                  <Typography color={"green"}>Pagato</Typography>
                ) : (
                  <Typography color={"error"}>NON Pagato</Typography>
                )
              }
              onChange={(e) => {
                changePaid(e.target.checked, row);
              }}
            />
          </FormGroup>
        );
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
      minWidth: 20,
      align: "center",
      format: (value, row) => {
        return (
          <div
            onClick={() => {
              navigate("/cashdesk/reservationdetails/" + row.idReservation);
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
          <Typography fontSize={"1.5em"}> Tutte le Prenotazioni</Typography>
          <PersonalizedTable dataTable={list} columnsTable={columns} />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/cashdesk/newreservation");
          }}
        >
          Nuova Prenotazione
        </Button>
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
