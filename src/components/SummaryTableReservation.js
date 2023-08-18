import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function formatToFloat(num) {
  return `${num.toFixed(2)} €`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function SummaryTableReservation({ foods, beverages }) {
  const [rows, setRows] = React.useState([]);
  const [invoiceSubtotal, setInvoiceSubTotal] = React.useState(0);

  React.useEffect(() => {
    setRows([]);

    const rowsFoods = foods.map((singleFood) =>
      createRow(singleFood.name, singleFood.quantity, singleFood.price)
    );

    const rowsBeverages = beverages.map((singleBeverage) =>
      createRow(
        singleBeverage.name,
        singleBeverage.quantity,
        singleBeverage.price
      )
    );

    const finalRows = rowsFoods.concat(rowsBeverages);
    setInvoiceSubTotal(subtotal(finalRows));
    setRows(finalRows);
  }, [foods, beverages]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Descrizione Prodotto</TableCell>
            <TableCell align="right">Quantità</TableCell>
            <TableCell align="right">Costo Unitario</TableCell>
            <TableCell align="right">Totale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{formatToFloat(row.unit)}</TableCell>
              <TableCell align="right">{formatToFloat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2} align="right">
              Totale comanda
            </TableCell>
            <TableCell align="right">
              {formatToFloat(invoiceSubtotal)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { SummaryTableReservation };
