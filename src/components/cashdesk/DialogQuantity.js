import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogQuantity({ isOpen, returnMessage }) {
  const [quantity, setQuantity] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <span>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          returnMessage({ completed: false, quantity: null, notes: null });
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Aggiungi alla commessa</DialogTitle>
        <center>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <span className="dialogElement">
                Inserire la quantità desiderata del prodotto: &nbsp;&nbsp;&nbsp;
                <TextField
                  id="quantita_prodotto"
                  style={{ width: "50px" }}
                  label="Number"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(e) => {
                    if (e.target.value < 0) e.target.value = 0;
                    setQuantity(e.target.value);
                  }}
                />
              </span>
              ~~~~~~~~~~~~~~~~~~
              <span className="dialogElement">
                Inserire eventuali note per la singola preparazione:
              </span>
              <span>
                <TextField
                  style={{ width: "100%" }}
                  id="standard-multiline-flexible"
                  label="Multiline"
                  multiline
                  value={notes}
                  maxRows={2}
                  variant="standard"
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                />
              </span>
            </DialogContentText>
          </DialogContent>
        </center>
        <DialogActions>
          <Button
            onClick={() => {
              returnMessage({ completed: false, quantity: null, notes: null });
            }}
          >
            Annulla
          </Button>

          <Button
            disabled={quantity <= 0}
            onClick={() => {
              returnMessage({
                completed: true,
                quantity: quantity,
                notes: notes,
              });
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export { DialogQuantity };
