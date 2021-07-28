import React from 'react';
import { Menu as MaterialUIMenu } from '@material-ui/core';
import { MoreVertTwoTone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { IEvent } from '../ts';

interface IMenuProps {
  renderMenuItems: (callback: () => void) => JSX.Element[];
}

const useStyles = makeStyles({
  menuButton: {
    cursor: 'pointer',
  },
});

const Menu = ({ renderMenuItems }: IMenuProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const onButtonClick = (event: IEvent) => setAnchorEl(event.currentTarget);
  const onMenuClose = () => setAnchorEl(null);

  return (
    <div>
      <MoreVertTwoTone className={classes.menuButton} onClick={onButtonClick} />
      <MaterialUIMenu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        {renderMenuItems(onMenuClose)}
      </MaterialUIMenu>
    </div>
  );
};

export default Menu;
