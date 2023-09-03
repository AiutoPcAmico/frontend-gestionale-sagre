import { Paper, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { PersonalizedTable } from "../../components/PersonalizedTable";
import { useEffect, useState } from "react";
import {
  getDispensingOfReservation,
  getPreparationOfReservation,
} from "../../apis/indexSagreApi";
import { LoadingFS } from "../../components/LoadingFS";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useSnackbar } from "notistack";
import { MyDialogMessage } from "../../components/MyDialogMessage";
import { formatDateTime } from "../../utils/dates";

function DetailsReservation() {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [preparations, setPreparations] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generalDetails, setGeneralDetails] = useState({
    name: "",
    dateTime: "",
    table: "",
    isPaid: false,
  });

  const [dialog, setDialog] = useState({
    isOpen: false,
    message: "",
  });

  function createDataFood(singleRes) {
    return {
      key: singleRes.nome,
      idReservation: singleRes.idPrenotazione,
      dateTime: singleRes.dataOra,
      table: singleRes.tavolo,
      quantity: singleRes.quantita,
      delivered: singleRes.consegnate,
      productName: singleRes.nome,
      isFinished: singleRes.isTerminato,
      notes: singleRes.notePreparazione,
      name: singleRes.nominativo,
    };
  }

  function createDataBeverages(singleRes) {
    return {
      key: singleRes.nomeBevanda,
      idReservation: singleRes.idPrenotazione,
      dateTime: singleRes.dataOra,
      table: singleRes.tavolo,
      quantity: singleRes.quantita,
      delivered: singleRes.consegnate,
      productName: singleRes.nomeBevanda,
      isFinished: singleRes.isTerminato,
      notes: singleRes.noteErogazione,
      name: singleRes.nominativo,
    };
  }

  //retriving data
  useEffect(() => {
    setIsLoading(true);
    const id = parseInt(params.id);
    if (!isNaN(id)) {
      getPreparationOfReservation(id).then((response) => {
        if (response.isError) {
          if (response.status === 404) {
            enqueueSnackbar(
              "Nessuna preparazione associata alla prenotazione!",
              {
                variant: "warning",
                autoHideDuration: 4000,
                preventDuplicate: true,
              }
            );
          } else {
            enqueueSnackbar(
              "Errore durante il recupero delle preparazioni: " +
                response.messageError,
              {
                variant: "error",
                autoHideDuration: 4000,
                preventDuplicate: true,
              }
            );
          }
          setIsLoading(false);
        } else {
          enqueueSnackbar("Preparazioni recuperate con successo!", {
            variant: "success",
            autoHideDuration: 4000,
            preventDuplicate: true,
          });

          const formattedData = response.data.data.map((single) => {
            return createDataFood(single);
          });
          setGeneralDetails({
            name: formattedData[0].name,
            dateTime: formattedData[0].dateTime,
            table: formattedData[0].table,
          });
          setPreparations(formattedData);
          setIsLoading(false);
        }
      });

      getDispensingOfReservation(id).then((response) => {
        if (response.isError) {
          if (response.status === 404) {
            enqueueSnackbar("Nessuna erogazione associata alla prenotazione!", {
              variant: "warning",
              autoHideDuration: 4000,
              preventDuplicate: true,
            });
          } else {
            enqueueSnackbar(
              "Errore nel recupero delle erogazioni: " + response.messageError,
              {
                variant: "error",
                autoHideDuration: 4000,
                preventDuplicate: true,
              }
            );
          }
          setIsLoading(false);
        } else {
          const formattedData = response.data.data.map((single) => {
            return createDataBeverages(single);
          });

          setGeneralDetails({
            name: formattedData[0].name,
            dateTime: formattedData[0].dateTime,
            table: formattedData[0].table,
          });
          setBeverages(formattedData);
          enqueueSnackbar("Erogazioni recuperate con successo!", {
            variant: "success",
            autoHideDuration: 4000,
            preventDuplicate: true,
          });
          setIsLoading(false);
        }
      });
    } else {
      enqueueSnackbar("Errore: l'ID passato non è numerico!", {
        variant: "error",
        autoHideDuration: 4000,
        preventDuplicate: true,
      });
      setIsLoading(false);
    }
  }, [enqueueSnackbar, params.id]);

  const columns = [
    {
      id: "productName",
      label: "Prodotto",
      type: "string",
      minWidth: 150,
    },
    {
      id: "quantity",
      label: "Richieste",
      type: "number",
      minWidth: 20,
    },
    {
      id: "delivered",
      label: "Consegnati",
      type: "number",
      minWidth: 20,
    },
    {
      id: "isFinished",
      label: "Terminato",
      type: "number",
      minWidth: 20,
      format: (value) => {
        if (value === 1) {
          return "Si";
        } else {
          return "No";
        }
      },
    },
    {
      id: "notes",
      label: "Note",
      minWidth: 20,
      format: (value) => {
        if (value) {
          return (
            <div
              onClick={() => {
                setDialog({
                  isOpen: true,
                  message: value,
                });
              }}
            >
              <CampaignIcon color="error" />
            </div>
          );
        }
      },
    },
  ];

  return (
    <div className="pages">
      <div className="paddedPage ">
        <Typography fontSize={"1.5em"}>Dettagli Prenotazione</Typography>

        <Paper className="whiteBlockFormatted">
          <div className="">
            <div className="values">
              <Typography>Nominativo:&nbsp;&nbsp;&nbsp;</Typography>
              <TextField
                id="nominativo_details"
                value={generalDetails.name}
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "300px" }}
              />
            </div>
            <div className="values">
              <Typography>Data e Ora:&nbsp;&nbsp;&nbsp;</Typography>
              <TextField
                id="dataOra_details"
                value={formatDateTime(generalDetails.dateTime)}
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "300px" }}
              />
            </div>
          </div>
          <div className="">
            <div className="values">
              <Typography>Tavolo:&nbsp;&nbsp;</Typography>
              <TextField
                id="tavolo_details"
                value={generalDetails.table}
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "300px" }}
              />
            </div>
            <div className="values">
              <Typography>Prodotti:&nbsp;&nbsp;</Typography>
              <TextField
                id="prodotti_count_details"
                value={`Cibo: ${preparations.length} - Bevande: ${beverages.length}`}
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "300px" }}
              />
            </div>
          </div>
        </Paper>
        <Paper
          sx={{ width: "90%", overflow: "hidden", minHeight: "300px" }}
          elevation={3}
          className="resDetails"
        >
          <div>
            <h2>Cibo</h2>{" "}
            <PersonalizedTable
              columnsTable={columns}
              dataTable={preparations}
              searchVisible={false}
            />
          </div>
          <div>
            <h2>Bevande</h2>{" "}
            <PersonalizedTable
              columnsTable={columns}
              dataTable={beverages}
              searchVisible={false}
            />
          </div>
        </Paper>
      </div>

      <LoadingFS isOpened={isLoading} />
      <MyDialogMessage
        isOpen={dialog.isOpen}
        returnMessage={(value) => {
          setDialog({ ...dialog, isOpen: false });
        }}
        text={dialog.message}
        title={"Nota di preparazione"}
        onlyOk={true}
      />
    </div>
  );
}
export { DetailsReservation };
