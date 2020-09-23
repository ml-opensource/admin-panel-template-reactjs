import React, { FC, memo } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./Loader.styles";

interface LoaderProps {
  isFullScreen?: boolean;
}
const Loader: FC<LoaderProps> = ({ isFullScreen }) => {
  const classes = useStyles();

  return (
    <div className={isFullScreen ? classes.fullScreen : classes.insideElement}>
      <CircularProgress />
    </div>
  );
};

export default memo(Loader);
