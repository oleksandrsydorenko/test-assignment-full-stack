/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { IPromotion } from '../ts';

interface IDataTableProps {
  data: IPromotion[];
  page: number;
  total: number;
  fetchMore: (nextPage: number) => void;
}

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

const DataTable = ({ data, page, total, fetchMore }: IDataTableProps) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const tableHeadCells = [
    'Name',
    'Type',
    'Start Date',
    'End Date',
    'User Group Name',
    'Actions',
  ];

  useEffect(() => {
    const onScroll = (e: any) => {
      const { offsetHeight, scrollHeight, scrollTop } = e.currentTarget;
      const scrollPosition = scrollTop + offsetHeight;

      if (scrollPosition === scrollHeight && page + 1 <= total) {
        fetchMore(page + 1);
      }
    };

    if (ref.current) {
      ref.current.addEventListener('scroll', onScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', onScroll);
      }
    };
  }, [page, ref, total]);

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
              row.startDate,
              row.endDate,
              row.userGroupName,
              'Action',
            ];

            return (
              <StyledTableRow key={j}>
                {tableBodyCells.map((item, k) => (
                  <StyledTableCell key={k}>{item}</StyledTableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
