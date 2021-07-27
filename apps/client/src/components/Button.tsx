import React, { MouseEvent } from 'react';
import { Button as MaterialUIButton } from '@material-ui/core';

interface IButtonProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ label, onClick }: IButtonProps) => (
  <MaterialUIButton color="primary" variant="contained" onClick={onClick}>
    {label}
  </MaterialUIButton>
);

export default Button;
