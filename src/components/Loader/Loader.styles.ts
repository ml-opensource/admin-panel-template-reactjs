import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  fullScreen: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.grey[100],
  },
  insideElement: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
}));
