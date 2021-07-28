import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Button from './Button';

interface IDataGeneratorProps {
  onClick: () => void;
}

const useStyles = makeStyles({
  header: {
    marginBottom: 20,
  },
});

const DataGenerator = ({ onClick }: IDataGeneratorProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.header} component="h1" variant="h3">
        Push the button
      </Typography>
      <Button label="Generate Data" onClick={onClick} />
    </>
  );
};

export default DataGenerator;
