import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "64px 20px 0 20px",
    position: "relative",
  },
  container: {
    flex: "1 1 0%",
  },
});
