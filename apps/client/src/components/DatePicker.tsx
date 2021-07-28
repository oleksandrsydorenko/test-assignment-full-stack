import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { DATE_TIME_DEFAULT } from '../constants';

interface IDatePickerProps {
  label: string;
  value: number;
  onChange: (date: any) => void;
}

const DatePicker = ({ label, value, onChange }: IDatePickerProps) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      format={DATE_TIME_DEFAULT}
      label={label}
      margin="normal"
      value={value}
      onChange={onChange}
    />
  </MuiPickersUtilsProvider>
);

export default DatePicker;
