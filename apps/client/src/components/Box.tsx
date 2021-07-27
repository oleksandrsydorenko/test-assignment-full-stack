import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IDataGeneratorProps {
  render: () => JSX.Element;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

const DataGenerator = ({ render }: IDataGeneratorProps) => {
  const classes = useStyles();

  return <Box className={classes.wrapper}>{render()}</Box>;
};

export default DataGenerator;
