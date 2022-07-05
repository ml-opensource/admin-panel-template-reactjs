import { memo } from "react";

import { Button as AntdButton } from "antd";
import { ButtonProps as AntdButtonProps } from "antd/es/button";
import cx from "classnames";
import { Link, LinkProps } from "react-router-dom";

import { isURL } from "@app/helpers/util.helper";

interface ButtonProps extends Omit<AntdButtonProps, "href"> {
  /**
   * Turn button into link, accepts internal and external links (optional)
   */
  to?: LinkProps["to"];
  /**
   * Remove horizontal padding (optional)
   */
  noPadding?: boolean;
}

const Button = memo(({ to, className, noPadding, ...rest }: ButtonProps) => {
  const isExternalLink = typeof to === "string" && isURL(to);

  const buttonContent = (
    <AntdButton
      className={cx(className, {
        "p-0": noPadding,
      })}
      {...(isExternalLink && {
        href: to as string,
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...rest}
    />
  );

  // Only wrap in react router link, if internal link
  if (!isExternalLink && to) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
});

export default Button;
