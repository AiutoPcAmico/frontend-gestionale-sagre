import { formatDateTime } from "./dates";
import { jsPDF } from "jspdf";

function generateReceipt(productsList, user, table, isPaid, dateTime) {
  var totalPrice = 0;

  const header = `
         Oratorio S. Stefano
         Festa Toviniana 2023
         Cividate Camuno
`;

  const details =
    `\n` +
    `\n Nome: ${user.slice(0, 10).padEnd(10, " ")}  Tav: ${table
      .slice(0, 5)
      .padEnd(5, " ")} ` +
    `\n------------------------------------------` +
    `\n PROD |  €/pz  | QTA' | TOTALE `;

  //generating this example
  //| 1    The big tasty Pizza              |
  //|      ET4565    500.00   2.00  1000.00 |
  //| 2    Crunchy huge Buggers             |
  //|      BG8765    250.00   2.00   500.00 |
  //| 3    1.5 l Coca-Cola pack             |
  //|      CC9874     50.00   5.00   250.00 |

  var listString = productsList.map((product, number) => {
    totalPrice = totalPrice + product.quantity * product.price;

    return (
      `\n` +
      ` ${product.name.padEnd(32, " ")}     ` +
      `\n           ${parseFloat(product.price)
        .toFixed(2)
        .toString()
        .padStart(5, " ")}€     ${product.quantity
        .toString()
        .padEnd(2, " ")}    ` +
      `${parseFloat(product.quantity * product.price)
        .toFixed(2)
        .padStart(6, " ")}€`
    );
  });

  const conclusion = `
------------------------------------------
 Totale: ${parseFloat(totalPrice)
   .toFixed(2)
   .toString()
   .padStart(6, " ")}€    Pagato: ${isPaid ? "Si" : "No"} 
                                         
------------IMPORTANTE-------------
 Scontrino NON fiscale.
 In caso di errore informare
 subito l'addetto alla cassa.
 Grazie
      ${formatDateTime(dateTime)}\n`;

  //formatting correctly
  var resultingString = "";
  listString.forEach((element) => {
    resultingString = resultingString + element;
  });

  //concatenation of various parts
  const finalString = header + details + resultingString + conclusion;
  return finalString;
}

function printReceipt(list, name, tableInfo, isPaidBool, dateTimeRes) {
  const resultingString = generateReceipt(
    list,
    name,
    tableInfo,
    isPaidBool,
    dateTimeRes
  );

  var doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 200],
    lineHeight: 1.3,
  });
  doc.setCharSpace(1);
  doc.setFontSize(8);
  doc.setFont(undefined, "bold");
  doc.text(0, 0, resultingString);
  doc.autoPrint();
  doc.output("dataurlnewwindow");
}

export { printReceipt };
