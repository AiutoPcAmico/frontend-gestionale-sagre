import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { LoadingFS } from "../LoadingFS";
import { getAllBeverages, getAllFoods } from "../../apis/indexSagreApi";
import { useSnackbar } from "notistack";
import { CardProduct } from "../CardProduct";
import "../components.css";

function PickProducts({ addProduct }) {
  const [expanded, setExpanded] = useState(false);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    //retrieving data
    setIsLoading(true);
    getAllBeverages().then((response) => {
      if (response.isError) {
        enqueueSnackbar(
          "Impossibile recuperare le bevande a sistema! " +
            response.messageError,
          {
            variant: "error",
            autoHideDuration: 4000,
            preventDuplicate: true,
          }
        );
      } else {
        enqueueSnackbar("Bevande disponibili recuperate correttamente!", {
          variant: "success",
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
        setDrinks(response.data.data);
      }
    });

    getAllFoods().then((response) => {
      if (response.isError) {
        enqueueSnackbar(
          "Impossibile recuperare i cibi a sistema! " + response.messageError,
          {
            variant: "error",
            autoHideDuration: 4000,
            preventDuplicate: true,
          }
        );
        setIsLoading(false);
      } else {
        enqueueSnackbar("Cibi disponibili recuperati correttamente!", {
          variant: "success",
          autoHideDuration: 3000,
          preventDuplicate: true,
        });

        setFoods(response.data.data);
        setIsLoading(false);
      }
    });
  }, [enqueueSnackbar]);

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Cibo</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Seleziona i cibi desiderati dal cliente
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="listOfProduct">
            {foods.length > 0 &&
              foods.map((single) => {
                return (
                  <CardProduct
                    key={single.idCibo}
                    title={single.nome}
                    description={single?.descrizione}
                    price={parseFloat(single?.prezzo)}
                    productImage={single.immagine}
                    productId={single.idCibo}
                    onAdd={(food) => {
                      addProduct({
                        type: "food",
                        element: food,
                      });
                    }}
                  />
                );
              })}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Bevande</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Seleziona le bevande desiderate dal cliente
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="listOfProduct">
            {drinks.length > 0 &&
              drinks.map((single) => {
                return (
                  <CardProduct
                    key={single.idBevanda}
                    title={single.nomeBevanda}
                    description={single?.descrizione}
                    price={parseFloat(single?.prezzo)}
                    productImage={single.immagine}
                    productId={single.idBevanda}
                    onAdd={(drink) => {
                      addProduct({
                        type: "beverage",
                        element: drink,
                      });
                    }}
                  />
                );
              })}
          </div>
        </AccordionDetails>
      </Accordion>

      <LoadingFS isOpened={isLoading} />
    </div>
  );
}

export { PickProducts };
