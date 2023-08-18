import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

function DialogDelivering({
  name,
  productName,
  quantity,
  delivered,
  onExiting,
}) {
  const [nowDelivering, setNowDelivering] = useState("0");

  useEffect(() => {
    setNowDelivering("0");
  }, [productName]);

  return (
    <div>
      <Dialog
        open={!!name}
        onClose={() => onExiting({ confirmed: false, values: null })}
      >
        <DialogTitle>Conferma consegna</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Stai per confermare la consegna di <b>{productName}</b> per la
            prenotazione di {name}.<br></br>
            <br></br> <b>Totale richiesto: </b>
            {quantity}
            <br></br> <b>Per ora consegnato: </b>
            {delivered}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newDelivered"
            label="Nuova consegna"
            InputProps={{ inputProps: { min: 0, max: quantity - delivered } }}
            type="number"
            fullWidth
            variant="standard"
            value={nowDelivering}
            onChange={(e) => {
              if (e.target.value < 0) e.target.value = 0;
              if (e.target.value > quantity - delivered)
                e.target.value = quantity - delivered;
              setNowDelivering(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onExiting({ confirmed: false, values: null })}>
            Annulla consegna
          </Button>
          <Button
            onClick={() =>
              onExiting({ confirmed: true, values: nowDelivering })
            }
            disabled={nowDelivering === "0" || nowDelivering === ""}
          >
            Consegna!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function FormDialog() {}

export { DialogDelivering };
