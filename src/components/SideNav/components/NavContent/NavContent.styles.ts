import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
  },
  logo: {
    maxHeight: 36,
  },
}));
