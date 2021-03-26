import { memo } from "react";

import { Button as AntdButton } from "antd";
import { ButtonProps as AntdButtonProps } from "antd/es/button";
import classnames from "classnames/bind";
import { Link, LinkProps } from "react-router-dom";

import styles from "./Button.module.scss";

const cx = classnames.bind(styles);

interface ButtonProps extends Omit<AntdButtonProps, "href"> {
  /**
   * Turn button into link (optional)
   */
  to?: LinkProps["to"];
  /**
   * Remove horizontal padding (optional)
   */
  noPadding?: boolean;
}

const Button = memo(({ to, className, noPadding, ...rest }: ButtonProps) => {
  const buttonContent = (
    <AntdButton
      className={cx(styles.button, className, {
        noPadding,
      })}
      {...rest}
    />
  );

  if (to) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
});

export default Button;
