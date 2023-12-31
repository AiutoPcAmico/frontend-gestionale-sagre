import { Typography } from "@mui/material";
import { RealtimeOperatorComp } from "../../components/operator/RealtimeOperatorComp";

function GenericOperatorPage({ supCategory, supType }) {
  return (
    <div className="pages">
      <div className="pizzeria">
        <div className="paddedPage">
          <Typography fontSize={"1.5em"}>Comande {supCategory}</Typography>
          <RealtimeOperatorComp category={supCategory} type={supType} />
        </div>
      </div>
    </div>
  );
}

export { GenericOperatorPage };
