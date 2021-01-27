import { Button as AntDesignButton } from "antd";
import {
  ButtonType as AntDesignButtonType,
  ButtonProps as AntDesignButtonProps,
} from "antd/lib/button";

interface ButtonProps extends AntDesignButtonProps {
  type?: AntDesignButtonType;
  buttonText?: string;
  onClick?: () => void;
}

const Button = ({ type, buttonText, onClick, ...buttonProps }: ButtonProps) => {
  return (
    <AntDesignButton type={type} onClick={onClick} {...buttonProps}>
      {buttonText}
    </AntDesignButton>
  );
};

export default Button;
