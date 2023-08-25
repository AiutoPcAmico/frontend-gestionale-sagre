import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { PersonalizedTable } from "../PersonalizedTable.js";
import CampaignIcon from "@mui/icons-material/Campaign";
import RoomServiceIcon from "@mui/icons-material/RoomService";

import { useState } from "react";

function DialogPickDelivering({
  isOpen,
  onClose,
  listOfReservations,
  productName,
}) {
  const [dialogSecondary, setDialogSecondary] = useState({
    isOpen: false,
    message: null,
  });

  const columns = [
    //dateTime
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
    //name
    {
      id: "name",
      label: "Nominativo",
      minWidth: 100,
      maxWidth: 130,
      type: "string",
    },
    //table
    {
      id: "table",
      label: "Tav.",
      minWidth: 10,
      type: "string",
      align: "center",
    },

    //quantity required
    {
      id: "quantity",
      label: "Qta. Ric.",
      minWidth: 30,
      type: "number",
      align: "center",
    },
    //delivered
    {
      id: "delivered",
      label: "Qta. Con.",
      minWidth: 30,
      type: "number",
      align: "center",
    },
    //actions
    {
      id: "notes",
      label: "Azioni",
      minWidth: 20,
      align: "center",
      format: (notes, row) => {
        return (
          <div className="multipleActions">
            <div style={{ width: "50%" }}>
              {notes && (
                <div
                  onClick={() => {
                    setDialogSecondary({
                      isOpen: true,
                      message: notes,
                    });
                  }}
                >
                  <CampaignIcon color="error" />
                </div>
              )}
            </div>
            <div
              onClick={() => {
                setDialogSecondary({
                  isOpen: true,
                  message: notes,
                });
              }}
            >
              <RoomServiceIcon color="success" />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <Dialog fullWidth={true} maxWidth={"lg"} open={isOpen}>
      <DialogTitle>
        Seleziona le consegne di {productName}
        <b></b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Selezuiona le consegne desiderate</DialogContentText>
      </DialogContent>

      <PersonalizedTable
        dataTable={listOfReservations}
        searchVisible={false}
        columnsTable={columns}
      />
      <DialogActions>
        <Button
          onClick={() => {
            onClose({
              completed: false,
              data: null,
            });
          }}
        >
          Annulla
        </Button>

        <Button
          onClick={() => {
            onClose({
              completed: true,
              data: 1,
            });
          }}
        >
          Chiudi
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { DialogPickDelivering };
