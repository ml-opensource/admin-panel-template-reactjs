import { memo, useState, useEffect, FC } from "react";

import notFoundImage from "@app/assets/images/no-image.png";

import SpinWrapper from "../SpinWrapper/SpinWrapper";

interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  defaultImg?: string;
}

const Image: FC<ImageProps> = ({
  src = notFoundImage,
  defaultImg,
  ...rest
}) => {
  const [url, setUrl] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUrl(src);
  }, [src]);

  const handleError = () => {
    setUrl(defaultImg ?? notFoundImage);
    setIsLoading(false);
  };

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <SpinWrapper loading={isLoading}>
      <img
        {...rest}
        src={url}
        alt={rest.alt}
        onError={handleError}
        onLoad={handleLoaded}
      />
    </SpinWrapper>
  );
};

export default memo(Image);
