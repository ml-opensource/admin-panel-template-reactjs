import { makeStyles } from "@material-ui/core/styles";
// eslint-disable-next-line no-restricted-imports
import grey from "@material-ui/core/colors/grey";

export const useStyles = makeStyles({
  fullScreen: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: grey[100],
  },
  insideElement: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
