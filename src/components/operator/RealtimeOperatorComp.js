import { Paper, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingFS } from "../LoadingFS.js";
import { deliverProduct, getOfCategory } from "../../apis/indexSagreApi.js";
import { useSnackbar } from "notistack";
import { OperatorViewTable } from "./OperatorViewTable.js";
import { OperatorViewCards } from "./OperatorViewCards.js";
import { DialogDelivering } from "./DialogDelivering.js";

function RealtimeOperatorComp({ category, type }) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewTable, setViewTable] = useState(false);
  const [delivering, setDelivering] = useState({
    idReservation: null,
    idProduct: null,
    productType: null,
    quantity: null,
    delivered: null,
    nowDelivered: null,
    nameUser: null,
    productName: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const millisecondsApi = 10000;

  async function newDeliver(result) {
    if (result.confirmed) {
      setIsLoading(true);
      console.log("nuovo delivering! " + result.values);
      const resultUpdating = await deliverProduct(
        delivering.productType,
        result.values,
        delivering.idProduct,
        delivering.idReservation
      );
      if (resultUpdating.isError) {
        enqueueSnackbar(
          "Impossibile aggiornare la consegna! Riprova! " +
            resultUpdating.messageError,
          {
            variant: "error",
            autoHideDuration: 5000,
            preventDuplicate: true,
          }
        );
      } else {
        enqueueSnackbar(
          "Consegna effettuata con successo!Tra pochi istanti sparirà, se terminata",
          {
            variant: "success",
            autoHideDuration: 5000,
            preventDuplicate: true,
          }
        );
      }
      setIsLoading(false);
    } else {
      enqueueSnackbar("Nessuna azione eseguita. Annullo.", {
        variant: "default",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    }
    setDelivering({
      idReservation: null,
      idProduct: null,
      productType: null,
      quantity: null,
      delivered: null,
      nowDelivered: null,
      nameUser: null,
      productName: null,
    });
  }

  useEffect(() => {
    console.log(delivering);
  }, [delivering]);

  useEffect(() => {
    function createData(singleRes) {
      return {
        key: singleRes.nomeProdotto + singleRes.idPrenotazione,
        idReservation: singleRes.idPrenotazione,
        dateTime: singleRes.dataOra,
        table: singleRes.tavolo,
        quantity: singleRes.quantita,
        delivered: singleRes.consegnate,
        productName: singleRes.nomeProdotto,
        isFinished: singleRes.isTerminato,
        notes: singleRes.note,
        name: singleRes.nominativo,
        idProduct: singleRes.idProdotto,
        image: singleRes.immagine,
        type: type,
      };
    }

    async function loadData() {
      console.log("UPDATE");
      getOfCategory(type, category).then((response) => {
        if (response.isError) {
          if (response.status === 404) {
            enqueueSnackbar(
              "Non sono state trovate comande. Verifica e riprova più tardi! ",
              {
                variant: "warning",
                autoHideDuration: 5000,
                preventDuplicate: true,
              }
            );
          } else {
            enqueueSnackbar(
              "Impossibile recuperare i dati! Riprova! " +
                response.messageError,
              {
                variant: "error",
                autoHideDuration: 5000,
                preventDuplicate: true,
              }
            );
          }
        } else {
          enqueueSnackbar("Aggiornamento... ", {
            variant: "success",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });

          const correctList = response.data.data.map((single) =>
            createData(single)
          );

          setList(correctList);
          setIsLoading(false);
        }
      });
    }

    //first render of the page,
    setIsLoading(true);
    loadData();

    const interval = setInterval(async () => {
      await loadData();
    }, millisecondsApi);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [category, enqueueSnackbar, type]);

  return (
    <div style={{ width: "100%" }}>
      <Paper className="whiteBlockFormatted" style={{ marginLeft: "5%" }}>
        <div className="headerOperator">
          <Typography>Seleziona la vista desiderata:</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Cards prodotto</Typography>
            <Switch
              inputProps={{ "aria-label": "ant design" }}
              checked={viewTable}
              onChange={(e) => {
                setViewTable(e.target.checked);
              }}
            />
            <Typography>Tabella</Typography>
          </Stack>
        </div>

        {viewTable === true && (
          <OperatorViewTable
            listProducts={list}
            setConfirmDelivery={(row) => {
              console.log(row);
              setDelivering({
                idReservation: row.idReservation,
                idProduct: row.idProduct,
                quantity: row.quantity,
                delivered: row.delivered,
                productType: type,
                nameUser: row.name,
                productName: row.productName,
                nowDelivered: null,
              });
            }}
          />
        )}
        {viewTable === false && <OperatorViewCards listProducts={list} />}
      </Paper>
      <DialogDelivering
        delivered={delivering.delivered}
        productName={delivering.productName}
        quantity={delivering.quantity}
        name={delivering.nameUser}
        onExiting={newDeliver}
      />
      <LoadingFS isOpened={isLoading} />
    </div>
  );
}

export { RealtimeOperatorComp };
