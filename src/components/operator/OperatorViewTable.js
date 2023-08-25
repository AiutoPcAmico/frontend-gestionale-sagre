import CampaignIcon from "@mui/icons-material/Campaign";
import { useState } from "react";
import { MyDialogMessage } from "../MyDialogMessage";
import { PersonalizedTable } from "../PersonalizedTable";
import RoomServiceIcon from "@mui/icons-material/RoomService";

function OperatorViewTable({ listProducts, setConfirmDelivery }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: null,
  });

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
    {
      id: "productName",
      label: "Prodotto",
      type: "string",
      minWidth: 100,
    },
    {
      id: "quantity",
      label: "Rich.",
      type: "number",
      minWidth: 20,
    },
    {
      id: "delivered",
      label: "Cons.",
      type: "number",
      minWidth: 20,
    },
    {
      id: "name",
      label: "Nominativo",
      type: "string",
      minWidth: 200,
    },
    {
      id: "table",
      label: "Tavolo",
      type: "string",
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
    {
      id: "actions",
      label: "Azioni",
      format: (value, row) => {
        return (
          <div
            onClick={() => {
              setConfirmDelivery(row);
            }}
          >
            <RoomServiceIcon color="success" />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      -----------------Ciao!----------------
      <p>Questo è la visualizzazione a tabelle</p>
      <PersonalizedTable
        columnsTable={columns}
        dataTable={listProducts}
        searchVisible={false}
      />
      <MyDialogMessage
        isOpen={dialog.isOpen}
        text={dialog.message}
        title={"Note prenotazione"}
        returnMessage={() => {
          setDialog({ isOpen: false, message: null });
        }}
      />
    </div>
  );
}

export { OperatorViewTable };
