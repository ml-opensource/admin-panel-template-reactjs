import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    width: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
  },
});
