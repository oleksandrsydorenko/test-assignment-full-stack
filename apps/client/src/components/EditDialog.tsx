import 'date-fns';
import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from './Button';
import DatePicker from './DatePicker';
import Select from './Select';
import { PROMOTION_TYPE, PROMOTION_USER_GROUP_NAME } from '../constants';
import { prepareSelectItems, prepareSelectValue } from '../utils';
import {
  IEvent,
  IPromotion,
  IPromotionType,
  IPromotionUserGroupName,
  PromotionTypes,
  PromotionUserGroupNames,
} from '../ts';

interface EditDialogProps {
  data: IPromotion;
  // eslint-disable-next-line react/require-default-props
  isOpened?: boolean;
  onClose: () => void;
  onSubmit: (newData: IPromotion) => void;
}

const formatDate = (date: string): number => new Date(date).getTime();
const promotionTypes = prepareSelectItems<IPromotionType>(PROMOTION_TYPE);
const promotionUserGroupNames = prepareSelectItems<IPromotionUserGroupName>(
  PROMOTION_USER_GROUP_NAME
);

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  content: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
}));

const EditDialog = ({
  data,
  isOpened = true,
  onClose,
  onSubmit,
}: EditDialogProps) => {
  const classes = useStyles();
  const [name, setName] = useState(data.name);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const [type, setType] = useState(
    prepareSelectValue<IPromotionType, PromotionTypes>(
      PROMOTION_TYPE,
      data.type
    )
  );
  const [userGroupName, setUserGroupName] = useState(
    prepareSelectValue<IPromotionUserGroupName, PromotionUserGroupNames>(
      PROMOTION_USER_GROUP_NAME,
      data.userGroupName
    )
  );

  const onNameChange = useCallback(
    ({ target }: IEvent) => target.value && setName(target.value),
    []
  );
  const onTypeChange = useCallback(
    ({ target }: IEvent) => target.value && setType(target.value),
    []
  );
  const onStartDateChange = useCallback(
    (date: string) => setStartDate(formatDate(date)),
    []
  );
  const onEndDateChange = useCallback(
    (date: string) => setEndDate(formatDate(date)),
    []
  );
  const onUserGroupChange = useCallback(
    ({ target }: IEvent) => target.value && setUserGroupName(target.value),
    []
  );

  const onSubmitForm = useCallback(
    () =>
      onSubmit({
        ...data,
        name: name || data.name,
        startDate: startDate || data.startDate,
        endDate: endDate || data.endDate,
        type: type ? PROMOTION_TYPE[type] : data.type,
        userGroupName: userGroupName
          ? PROMOTION_USER_GROUP_NAME[userGroupName]
          : data.userGroupName,
      }),
    [name, startDate, endDate, type, userGroupName]
  );

  return (
    <Dialog open={isOpened} onClose={onClose}>
      <DialogTitle className={classes.title}>Edit Promotion</DialogTitle>
      <DialogContent className={classes.content}>
        <Box display="flex" flexDirection="column">
          <TextField label="Name" value={name} onChange={onNameChange} />
          <Select
            id="promotion-types"
            items={promotionTypes}
            label="Promotion Type"
            value={type}
            onChange={onTypeChange}
          />
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={onEndDateChange}
          />
          <Select
            id="promotion-user-group-names"
            items={promotionUserGroupNames}
            label="User Group Name"
            value={userGroupName}
            onChange={onUserGroupChange}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button label="Submit" onClick={onSubmitForm} />
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
