import { Paper, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingFS } from "../LoadingFS.js";
import { getOfCategory } from "../../apis/indexSagreApi.js";
import { useSnackbar } from "notistack";
import { OperatorViewTable } from "./OperatorViewTable.js";
import { OperatorViewCards } from "./OperatorViewCards.js";

function RealtimeOperatorComp({ category, type }) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewTable, setViewTable] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const millisecondsApi = 30000;

  useEffect(() => {
    async function loadData() {
      getOfCategory(type, category).then((response) => {
        if (response.isError) {
          enqueueSnackbar(
            "Impossibile recuperare i dati! Riprova! " + response.messageError,
            {
              variant: "error",
              autoHideDuration: 5000,
              preventDuplicate: true,
            }
          );
        } else {
          enqueueSnackbar(
            "Recupero delle ordinazioni avvenuto con successo! ",
            {
              variant: "success",
              autoHideDuration: 3000,
              preventDuplicate: true,
            }
          );
          setList(response.data);
        }
      });
    }

    //first render of the page,
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });

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
                console.log(e.target.checked);
                setViewTable(e.target.checked);
              }}
            />
            <Typography>Tabella</Typography>
          </Stack>
        </div>

        {viewTable === true && <OperatorViewTable />}
        {viewTable === false && <OperatorViewCards />}
      </Paper>
      <LoadingFS isOpened={isLoading} />
    </div>
  );
}

export { RealtimeOperatorComp };
