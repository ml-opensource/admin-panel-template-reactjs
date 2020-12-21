import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles(theme => ({
  paper: {
    width: "400px",
    margin: `${theme.spacing(8)}px auto`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    "&:hover": {
      background: green.A400,
    },
  },
}));
