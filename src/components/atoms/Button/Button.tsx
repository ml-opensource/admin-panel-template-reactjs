import { Button as AntDesignButton } from "antd";
import {
  ButtonType as AntDesignButtonType,
  ButtonProps as AntDesignButtonProps,
} from "antd/lib/button";

interface ButtonProps extends AntDesignButtonProps {
  type?: AntDesignButtonType;
  buttonText?: string;
}

const Button = ({ type, buttonText, ...buttonProps }: ButtonProps) => {
  return (
    <AntDesignButton type={type} {...buttonProps}>
      {buttonText}
    </AntDesignButton>
  );
};

export default Button;
