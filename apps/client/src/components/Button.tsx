import React, { MouseEvent } from 'react';
import { Button as MaterialButton } from '@material-ui/core';

interface IButtonProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ label, onClick }: IButtonProps) => (
  <MaterialButton color="primary" variant="contained" onClick={onClick}>
    {label}
  </MaterialButton>
);

export default Button;
