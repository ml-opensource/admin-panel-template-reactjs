import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "64px 24px 0 24px",
    position: "relative",
    zIndex: 1,
    background: theme.palette.grey[200],
  },
  container: {
    flex: "1 1 0%",
  },
}));
