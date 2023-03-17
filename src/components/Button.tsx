import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { Form } from "react-router-dom";

interface ButtonProps {
  path?: string;
  active?: string;
  children: ReactNode;
  type: "submit" | "reset" | "button";
}

const Button = ({ children, active, path, type }: ButtonProps) => {
  return <button className={`btn ${active && active} `}>{children}</button>;
};

export default Button;
