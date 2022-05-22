import React from "react";

interface IButton {
  content: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButton) => {
  const { content, ...rest } = props;
  return <button {...rest}>{content}</button>;
};

export default Button;
