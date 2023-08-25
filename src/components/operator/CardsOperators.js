import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Badge } from "@mui/material";

function CardsOperators({ product, quantityInOrder, onClickDeliver }) {
  const [image, setImage] = useState();

  useEffect(() => {
    try {
      setImage(require(`../../images/${product.image}`));
    } catch (error) {
      console.warn("Immagine non trovata: " + product.image);
    }
  }, [product.image]);

  return (
    <Badge
      color="success"
      overlap="circular"
      badgeContent={quantityInOrder}
      sx={{
        "& .MuiBadge-badge": {
          fontSize: 30,
          height: 50,
          minWidth: 50,
          borderRadius: 25,
          marginTop: "4px",
        },
      }}
    >
      <Card sx={{ maxWidth: 345 }} className="singleCard">
        <CardMedia
          component="img"
          alt={product.productName + " image"}
          height="140"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            style={{ marginLeft: "auto", marginRight: "auto" }}
            size="small"
            onClick={() => {
              onClickDeliver({
                productId: product.idProduct,
              });
            }}
          >
            Consegna
          </Button>
        </CardActions>
      </Card>
    </Badge>
  );
}

export { CardsOperators };
