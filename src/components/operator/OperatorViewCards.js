import { useEffect, useState } from "react";
import { CardsOperators } from "./CardsOperators";
import "../components.css";
import { DialogPickDelivering } from "./DialogPickDelivering";
import { useSnackbar } from "notistack";

function OperatorViewCards({ listProducts, setConfirmDelivery }) {
  const [quantities, setQuantities] = useState([]);
  const [dialogPick, setDialogPick] = useState({
    isOpen: false,
    idProduct: null,
    type: null,
    productName: null,
    listReservations: null,
  });

  useEffect(() => {
    console.log(Object(quantities));
  }, [quantities]);

  useEffect(() => {
    if (listProducts && listProducts.length > 0) {
      const result = listProducts.reduce((prev, curr) => {
        (prev[curr.idProduct] = prev[curr.idProduct] || []).push(curr);
        return prev;
      }, {});

      console.log(typeof result);
      setQuantities(result);
    }
  }, [listProducts]);

  return (
    <div className="operatorListCards">
      {listProducts &&
        listProducts.length > 0 &&
        Object.keys(quantities).map((qKey) => {
          const sum = quantities[qKey].reduce((accumulator, object) => {
            return accumulator + object.quantity - object.delivered;
          }, 0);

          return (
            <CardsOperators
              key={quantities[qKey][0].key}
              product={quantities[qKey][0]}
              quantityInOrder={sum}
              onClickDeliver={(id) => {
                setDialogPick({
                  isOpen: true,
                  listReservations: quantities[qKey],
                  type: quantities[qKey][0].type,
                  productName: quantities[qKey][0].productName,
                });
              }}
            />
          );
        })}

      {dialogPick.isOpen && (
        <DialogPickDelivering
          isOpen={dialogPick.isOpen}
          listOfReservations={dialogPick.listReservations}
          productName={dialogPick.productName}
          setConfirmDelivery={setConfirmDelivery}
          onClose={() => {
            setDialogPick({
              isOpen: false,
              idProduct: null,
              type: null,
              listReservations: null,
            });
          }}
        />
      )}
    </div>
  );
}

export { OperatorViewCards };
