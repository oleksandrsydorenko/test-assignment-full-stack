import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IHeadingProps {
  text: string;
}

const useStyles = makeStyles({
  heading: {
    marginBottom: '20px',
  },
});

const Heading = ({ text }: IHeadingProps) => {
  const classes = useStyles();

  return (
    <Typography className={classes.heading} component="h1" variant="h3">
      {text}
    </Typography>
  );
};

export default Heading;
