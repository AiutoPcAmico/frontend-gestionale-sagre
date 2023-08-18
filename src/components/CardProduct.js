import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DialogQuantity } from "./DialogQuantity";

function CardProduct({
  productId,
  price,
  onAdd,
  description,
  title,
  productImage,
}) {
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    try {
      setImage(require(`../images/${productImage}`));
    } catch (error) {
      console.warn("Immagine non trovata: " + productImage);
    }
  }, [productImage]);

  return (
    <Card sx={{ maxWidth: 345 }} className="singleProductCard">
      <CardMedia component="img" alt={title} height="140" image={image} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ height: "60px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ height: "50px" }}
        >
          {description}
        </Typography>
        <span>
          <b>Prezzo: {parseFloat(price).toFixed(2)} €</b>
        </span>
      </CardContent>
      <CardActions
        style={{ verticalAlign: "bottom", justifyContent: "center" }}
      >
        <Button
          size="small"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Aggiungi comanda
        </Button>
      </CardActions>

      <DialogQuantity
        isOpen={dialogOpen}
        returnMessage={(message) => {
          if (message.completed) {
            //if I saved, i'll push to the array
            var notesParsed = null;
            if (message.notes !== "") notesParsed = message.notes;
            onAdd({
              id: productId,
              quantity: parseInt(message.quantity),
              notes: notesParsed,
              price: price,
              name: title,
            });
          }
          setDialogOpen(false);
        }}
      />
    </Card>
  );
}

export { CardProduct };
