import React, { FC, memo } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import objstr from "obj-str";
import { useStyles } from "./Loader.styles";

interface LoaderProps {
  isFullScreen: boolean;
}
const Loader: FC<LoaderProps> = ({ isFullScreen }) => {
  const classes = useStyles();

  return (
    <div
      className={objstr({
        [classes.fullScreen]: isFullScreen,
        [classes.insideElement]: !isFullScreen,
      })}
    >
      <CircularProgress />
    </div>
  );
};

export default memo(Loader);
