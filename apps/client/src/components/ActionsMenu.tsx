import React from 'react';
import Menu from '@material-ui/core/Menu';
import MoreVertTwoTone from '@material-ui/icons/MoreVertTwoTone';
import { makeStyles } from '@material-ui/core/styles';

import { IEvent } from '../ts';

interface IActionsMenuProps {
  renderItems: (callback: () => void) => JSX.Element[];
}

const useStyles = makeStyles({
  ActionsMenuButton: {
    cursor: 'pointer',
  },
});

const ActionsMenu = ({ renderItems }: IActionsMenuProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onOpen = (event: IEvent) => setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);

  return (
    <div>
      <MoreVertTwoTone className={classes.ActionsMenuButton} onClick={onOpen} />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {renderItems(onClose)}
      </Menu>
    </div>
  );
};

export default ActionsMenu;
