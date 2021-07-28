import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialUISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { IEvent, ISelectItem } from '../ts';

interface ISelectProps {
  id: string;
  items: ISelectItem[];
  label: string;
  value: string | null;
  onChange: (event: IEvent) => void;
}

const useStyles = makeStyles({
  formControl: {
    marginTop: 15,
    marginBottom: 10,
    minWidth: 200,
  },
});

const DataGenerator = ({ id, items, label, value, onChange }: ISelectProps) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={id}>{label}</InputLabel>
      <MaterialUISelect labelId={id} value={value} onChange={onChange}>
        {items.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem key={i} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </MaterialUISelect>
    </FormControl>
  );
};

export default DataGenerator;
