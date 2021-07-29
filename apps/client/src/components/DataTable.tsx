/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import ActionsMenu from './ActionsMenu';
import { formatDate } from '../utils';
import { IEvent, IPromotion } from '../ts';

interface IAction {
  ({
    event,
    id,
    callback,
  }: {
    event: IEvent;
    id: string;
    callback: (event: IEvent) => void;
  }): void;
}

interface IDataTableProps {
  data: IPromotion[];
  onEditItemAction: (dataItem: IPromotion) => void;
  onDeleteItemAction: IAction;
  onDuplicateItemAction: IAction;
  fetchMore: () => void;
}

const tableColumns = [
  '#',
  'Name',
  'Type',
  'Start Date',
  'End Date',
  'User Group Name',
  'Actions',
];

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  container: {
    height: 'calc(100vh - 40px)',
  },
});

const DataTable = ({
  data,
  onEditItemAction,
  onDeleteItemAction,
  onDuplicateItemAction,
  fetchMore,
}: IDataTableProps) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  const onEditMenuItemClick = useCallback(
    ({ dataItem, callback }) =>
      (event: IEvent) => {
        onEditItemAction(dataItem);
        callback(event);
      },
    [data]
  );

  const onDeleteMenuItemClick = useCallback(
    ({ dataItem, callback }) =>
      (event: IEvent) =>
        onDeleteItemAction({ event, callback, id: dataItem.id }),
    [data]
  );

  const onDuplicateMenuItemClick = useCallback(
    ({ dataItem, callback }) =>
      (event: IEvent) =>
        onDuplicateItemAction({ event, callback, id: dataItem.id }),
    [data]
  );

  const onScroll = useCallback(
    (event: IEvent) => {
      const { offsetHeight, scrollHeight, scrollTop } = event.currentTarget;
      const scrollPosition = scrollTop + offsetHeight;

      if (scrollPosition === scrollHeight) {
        fetchMore();
      }
    },
    [data]
  );

  const menuItems = useMemo(
    () => [
      { name: 'Edit', onClick: onEditMenuItemClick },
      { name: 'Delete', onClick: onDeleteMenuItemClick },
      { name: 'Duplicate', onClick: onDuplicateMenuItemClick },
    ],
    [data]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', onScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', onScroll);
      }
    };
  }, [ref, onScroll]);

  return (
    <TableContainer className={classes.container} ref={ref}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableColumns.map((item, i) => (
              <StyledTableCell key={i} align="center">
                {item}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataItem, j) => {
            const tableBodyCells = [
              j + 1,
              dataItem.name,
              dataItem.type,
              formatDate(dataItem.startDate),
              formatDate(dataItem.endDate),
              dataItem.userGroupName,
              <ActionsMenu
                renderItems={onMenuClose =>
                  menuItems.map((menuItem, k) => (
                    <MenuItem
                      key={k}
                      onClick={menuItem.onClick({
                        dataItem,
                        callback: onMenuClose,
                      })}
                    >
                      {menuItem.name}
                    </MenuItem>
                  ))
                }
              />,
            ];

            return (
              <StyledTableRow key={j}>
                {tableBodyCells.map((item, l) => (
                  <StyledTableCell key={l} align="center">
                    {item}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(DataTable);
