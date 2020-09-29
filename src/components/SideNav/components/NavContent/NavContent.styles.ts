import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logo: {
    maxHeight: 36,
  },
}));
