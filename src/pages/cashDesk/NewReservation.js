import { Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/dates";
import { PickProducts } from "../../components/cashdesk/PickProducts";
import { SummaryTableReservation } from "../../components/SummaryTableReservation";
import { LoadingFS } from "../../components/LoadingFS";
import { addCompleteReservation } from "../../apis/indexSagreApi";
import { useSnackbar } from "notistack";

function NewReservation() {
  const [reservation, setReservation] = useState({
    name: "",
    table: "",
    coverCharge: 0,
    isPayed: true,
    beverages: [],
    foods: [],
  });
  const { enqueueSnackbar } = useSnackbar();
  const [beveragesRequired, setBeveragesRequired] = useState([]);
  const [foodsRequired, setFoodsRequired] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date] = useState(new Date());
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (
      reservation.name === "" ||
      reservation.table === "" ||
      reservation.coverCharge === "" ||
      (reservation.foods.length === 0 && reservation.beverages.length === 0)
    ) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [
    reservation.name,
    reservation.table,
    reservation.coverCharge,
    reservation.foods,
    reservation.beverages,
  ]);

  function addFood(product) {
    console.log({ product });
    var oldArray = [];
    oldArray = JSON.parse(JSON.stringify(reservation.foods));
    oldArray.push({
      notes: product.element.notes,
      quantity: product.element.quantity,
      idFood: product.element.id,
    });

    setReservation((prevState) => ({
      ...prevState,
      foods: oldArray,
    }));

    setFoodsRequired((prevArray) => [
      ...prevArray,
      {
        id: product.element.id,
        quantity: product.element.quantity,
        price: product.element.price,
        name: product.element.name,
      },
    ]);
  }

  function addBeverage(product) {
    var oldArray = [];
    oldArray = JSON.parse(JSON.stringify(reservation.beverages));
    oldArray.push({
      notes: product.element.notes,
      quantity: product.element.quantity,
      idBeverage: product.element.id,
    });

    setReservation((prevState) => ({
      ...prevState,
      beverages: oldArray,
    }));

    setBeveragesRequired((prevArray) => [
      ...prevArray,
      {
        id: product.element.id,
        quantity: product.element.quantity,
        price: product.element.price,
        name: product.element.name,
      },
    ]);
  }

  async function sendData() {
    setIsLoading(true);
    const response = await addCompleteReservation(reservation);

    console.log(response.isError);
    if (response.isError) {
      enqueueSnackbar(
        "Errore durante il salvataggio! Riprova! " + response.messageError,
        {
          variant: "error",
          autoHideDuration: 4000,
          preventDuplicate: true,
        }
      );
      setIsLoading(false);
    } else {
      enqueueSnackbar("Salvataggio avvenuto con successo!", {
        variant: "success",
        autoHideDuration: 4000,
        preventDuplicate: true,
      });

      setIsLoading(false);
    }
  }

  return (
    <div className="pages">
      <div className="paddedPage">
        <h2>Nuova prenotazione!</h2>
        <Paper
          className="whiteBlockFormatted"
          style={{ padding: "20px 5px 20px 5px" }}
        >
          <div style={{ width: "100%" }}>
            <h2> Dettagli Prenotazione</h2>
            <i color="red">Tutti i campi sono obbligatori!</i>
          </div>

          <div className="newReservation">
            <div className="values">
              <Typography>Nominativo:&nbsp;&nbsp;&nbsp;</Typography>
              <TextField
                id="nominativo_new"
                value={reservation.name}
                error={reservation.name === ""}
                variant="outlined"
                label="Richiesto"
                required
                sx={{ width: "300px" }}
                onChange={(e) => {
                  setReservation((props) => ({
                    ...props,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="values">
              <Typography>Data e Ora:&nbsp;&nbsp;&nbsp;</Typography>
              <TextField
                id="dataora_new"
                value={formatDateTime(date)}
                variant="filled"
                required
                label={"Autogenerato"}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "300px" }}
              />
            </div>
          </div>
          <div className="">
            <div className="values">
              <Typography>Tavolo:&nbsp;&nbsp;&nbsp;</Typography>
              <TextField
                id="tavolo_new"
                value={reservation.table}
                error={reservation.table === ""}
                variant="outlined"
                required
                label={"Richiesto"}
                sx={{ width: "300px" }}
                onChange={(e) => {
                  setReservation((props) => ({
                    ...props,
                    table: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="values">
              <Typography>Coperti:&nbsp;&nbsp;</Typography>
              <TextField
                id="coperti_new"
                value={reservation.coverCharge}
                error={reservation.coverCharge === ""}
                required
                variant="outlined"
                label={"Richiesto"}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                sx={{ width: "300px" }}
                onChange={(e) => {
                  if (e.target.value < 0) e.target.value = 0;

                  setReservation((props) => ({
                    ...props,
                    coverCharge: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </Paper>
        <Paper className="whiteBlockFormatted">
          <h3>Dettagli Prenotazione</h3>
          <div>
            <PickProducts
              addProduct={(product) => {
                if (product.type === "food") {
                  addFood(product);
                }
                if (product.type === "beverage") {
                  addBeverage(product);
                }
              }}
            />
          </div>
        </Paper>
        <Paper>
          <SummaryTableReservation
            foods={foodsRequired}
            beverages={beveragesRequired}
          />
        </Paper>
      </div>
      <Button
        variant="contained"
        disabled={!canSave}
        onClick={() => {
          sendData();
        }}
      >
        Conferma la comanda
      </Button>
      <LoadingFS isOpened={isLoading} />
    </div>
  );
}

export { NewReservation };
