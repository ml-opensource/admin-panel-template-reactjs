import React, { FC, memo } from "react";
import objstr from "obj-str";
import { IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useStyles } from "./TableToolbar.styles";

interface TableToolbarProps {
  numSelected: number;
  title: string;
  withFilter: boolean;
}

const TableToolbar: FC<TableToolbarProps> = ({
  numSelected,
  title,
  withFilter,
}) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={`${classes.root} ${objstr({
        [classes.highlight]: numSelected > 0,
      })}`}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {withFilter &&
        (numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        ))}
    </Toolbar>
  );
};

export default memo(TableToolbar);
