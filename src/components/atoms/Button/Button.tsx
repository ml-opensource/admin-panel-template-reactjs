import { Button as AntDesignButton } from "antd";
import { ButtonProps as AntDesignButtonProps } from "antd/lib/button";
import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends Omit<AntDesignButtonProps, "href"> {
  /**
   * Turn button into link (optional)
   */
  to?: LinkProps["to"];
}

const Button = ({ to, ...buttonProps }: ButtonProps) => {
  const buttonContent = <AntDesignButton {...buttonProps} />;

  if (to) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
};

export default Button;
