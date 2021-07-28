import React from 'react';
import MaterialUIButton from '@material-ui/core/Button';

import { IEvent } from '../ts';

interface IButtonProps {
  label: string;
  onClick: (event: IEvent) => void;
}

const Button = ({ label, onClick }: IButtonProps) => (
  <MaterialUIButton color="primary" variant="contained" onClick={onClick}>
    {label}
  </MaterialUIButton>
);

export default Button;
