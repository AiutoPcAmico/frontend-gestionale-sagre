import { Typography } from "@mui/material";
import { RealtimeOperatorComp } from "../components/operator/RealtimeOperatorComp";

function PizzeriaPage() {
  return (
    <div className="pages">
      <div className="pizzeria">
        <div className="paddedPage">
          <Typography fontSize={"16px"}>Comande Pizzeria</Typography>
          <RealtimeOperatorComp category={"pizzeria"} type={"foods"} />
        </div>
      </div>
    </div>
  );
}

export { PizzeriaPage };
