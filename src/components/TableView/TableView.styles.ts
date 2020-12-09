import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
  })
);
