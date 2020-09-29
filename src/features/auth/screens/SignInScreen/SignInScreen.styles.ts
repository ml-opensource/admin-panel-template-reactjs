import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(5),
    },
  },
  logo: {
    maxWidth: 120,
    margin: "auto",
    marginBottom: theme.spacing(2),
    display: "block",
  },
}));
