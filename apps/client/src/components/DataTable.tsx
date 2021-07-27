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
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { IPromotion } from '../ts';

interface IDataTableProps {
  data: {
    currentPage: number;
    promotions: IPromotion[];
    totalPages: number;
  };
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
  wrapper: {
    height: '100vh',
  },
});

const DataTable = ({ data, fetchMore }: IDataTableProps) => {
  const classes = useStyles();
  const ref: any = useRef(null);
  const tableHead = [
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

      if (
        scrollTop + offsetHeight === scrollHeight &&
        data.currentPage + 1 <= data.totalPages
      ) {
        console.log(data.totalPages);
        console.log(data.currentPage + 1);
        fetchMore(data.currentPage + 1);
      }
    };

    ref.current.addEventListener('scroll', onScroll);

    return () => {
      ref.current.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <TableContainer className={classes.wrapper} ref={ref}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((item, i) => (
              <StyledTableCell key={i} align="center">
                {item}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.promotions.map((row, j) => {
            const tableBody = [
              row.name,
              row.type,
              row.startDate,
              row.endDate,
              row.userGroupName,
              'Action',
            ];

            return (
              <StyledTableRow key={j}>
                {tableBody.map((item, k) => (
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
