import { memo, useState, useEffect, FC } from "react";

import notFoundImage from "@app/assets/images/no-image.png";

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

  useEffect(() => {
    setUrl(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={url}
      alt={rest.alt}
      onError={() => setUrl(defaultImg ?? notFoundImage)}
    />
  );
};

export default memo(Image);
