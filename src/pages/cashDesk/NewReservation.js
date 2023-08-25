import { Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/dates";
import { PickProducts } from "../../components/cashdesk/PickProducts";
import { SummaryTableReservation } from "../../components/cashdesk/SummaryTableReservation";
import { LoadingFS } from "../../components/LoadingFS";
import { addCompleteReservation } from "../../apis/indexSagreApi";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    var oldArray = [];
    oldArray = JSON.parse(JSON.stringify(reservation.foods));

    //check if already exists
    const pos = oldArray.map((e) => e.idFood).indexOf(product.element.id);
    if (pos === -1) {
      //if not yet in reservation
      oldArray.push({
        notes: product.element.notes,
        quantity: product.element.quantity,
        idFood: product.element.id,
      });
    } else {
      //if already added to the reservation and i need only to modify the quantity
      oldArray[pos].quantity = product.element.quantity;
    }

    setReservation((prevState) => ({
      ...prevState,
      foods: oldArray,
    }));

    //using array for the calculator price
    const arrayRequired = JSON.parse(JSON.stringify(foodsRequired));
    //check if already exists
    const positionOnRequired = foodsRequired
      .map((e) => e.id)
      .indexOf(product.element.id);
    if (positionOnRequired === -1) {
      arrayRequired.push({
        id: product.element.id,
        quantity: product.element.quantity,
        price: product.element.price,
        name: product.element.name,
      });
    } else {
      arrayRequired[positionOnRequired].quantity = product.element.quantity;
    }

    setFoodsRequired(arrayRequired);
  }

  function addBeverage(product) {
    var oldArray = [];
    oldArray = JSON.parse(JSON.stringify(reservation.beverages));
    //check if already exists
    const posOnOld = reservation.beverages
      .map((e) => e.idBeverage)
      .indexOf(product.element.id);

    if (posOnOld === -1) {
      oldArray.push({
        notes: product.element.notes,
        quantity: product.element.quantity,
        idBeverage: product.element.id,
      });
    } else {
      oldArray[posOnOld].quantity = product.element.quantity;
    }

    setReservation((prevState) => ({
      ...prevState,
      beverages: oldArray,
    }));

    //using array for the calculator price
    const arrayRequired = JSON.parse(JSON.stringify(beveragesRequired));
    //check if already exists
    const positionOnRequired = beveragesRequired
      .map((e) => e.id)
      .indexOf(product.element.id);
    if (positionOnRequired === -1) {
      arrayRequired.push({
        id: product.element.id,
        quantity: product.element.quantity,
        price: product.element.price,
        name: product.element.name,
      });
    } else {
      arrayRequired[positionOnRequired].quantity = product.element.quantity;
    }

    setBeveragesRequired(arrayRequired);
  }

  async function sendData() {
    setIsLoading(true);
    const response = await addCompleteReservation(reservation);

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
      navigate("cashdesk/allreservations");

      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log({ reservation, foodsRequired, beveragesRequired });
  }, [reservation, foodsRequired, beveragesRequired]);

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
