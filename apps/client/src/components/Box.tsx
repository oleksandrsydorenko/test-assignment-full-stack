import React from 'react';
import { Box as MaterialUIBox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IBoxProps {
  render: () => JSX.Element;
}

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

const Box = ({ render }: IBoxProps) => {
  const classes = useStyles();

  return <MaterialUIBox className={classes.box}>{render()}</MaterialUIBox>;
};

export default Box;
