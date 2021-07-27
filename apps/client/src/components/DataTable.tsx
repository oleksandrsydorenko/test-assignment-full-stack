/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Menu from './Menu';
import { formatDate } from '../utils';
import {
  IEvent,
  IPromotion,
  PromotionTypeKeys,
  PromotionUserGroupNameKeys,
} from '../ts';

interface IEditItem {
  ({
    dataToUpdate,
    event,
    id,
    callback,
  }: {
    dataToUpdate: {
      name: string;
      startDate: number;
      endDate: number;
      type: PromotionTypeKeys;
      userGroupName: PromotionUserGroupNameKeys;
    };
    event: IEvent;
    id: string;
    callback: (event: IEvent) => void;
  }): void;
}

interface IDeleteItem {
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

interface IDuplicateItem {
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
  page: number;
  total: number;
  editItem: IEditItem;
  deleteItem: IDeleteItem;
  duplicateItem: IDuplicateItem;
  fetchMore: (nextPage: number) => void;
}

const tableHeadCells = [
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
    height: '100vh',
  },
});

const DataTable = ({
  data,
  page,
  total,
  editItem,
  deleteItem,
  duplicateItem,
  fetchMore,
}: IDataTableProps) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  const onEditItemClick = useCallback(
    ({ id, dataToUpdate, callback }) =>
      (event: IEvent) =>
        editItem({ dataToUpdate, event, id, callback }),
    []
  );
  const onDeleteItemClick = useCallback(
    ({ id, callback }) =>
      (event: IEvent) =>
        deleteItem({ event, id, callback }),
    []
  );
  const onDuplicateItemClick = useCallback(
    ({ id, callback }) =>
      (event: IEvent) =>
        duplicateItem({ event, id, callback }),
    []
  );
  const onScroll = useCallback(
    (event: IEvent) => {
      const { offsetHeight, scrollHeight, scrollTop } = event.currentTarget;
      const scrollPosition = scrollTop + offsetHeight;

      if (scrollPosition === scrollHeight && page + 1 <= total) {
        fetchMore(page + 1);
      }
    },
    [page, total]
  );

  const menuItems = [
    { name: 'Edit', onClick: onEditItemClick },
    { name: 'Delete', onClick: onDeleteItemClick },
    { name: 'Duplicate', onClick: onDuplicateItemClick },
  ];

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
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadCells.map((item, i) => (
              <StyledTableCell key={i} align="center">
                {item}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, j) => {
            const tableBodyCells = [
              row.name,
              row.type,
              formatDate(row.startDate),
              formatDate(row.endDate),
              row.userGroupName,
              <Menu
                renderMenuItems={onMenuClose =>
                  menuItems.map((item, k) => (
                    <MenuItem
                      key={k}
                      onClick={item.onClick({
                        id: row.id,
                        callback: onMenuClose,
                      })}
                    >
                      {item.name}
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
