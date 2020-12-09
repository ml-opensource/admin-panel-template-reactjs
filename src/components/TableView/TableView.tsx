import React, { FC, memo, useState } from "react";
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./TableView.styles";

interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface TableViewProps {
  tableProps: TableProps;
  rows: Data[];
}

const TableView: FC<TableViewProps> = ({ rows = [], tableProps }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-label="simple table"
          {...tableProps}
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Pantone Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                  <TableCell align="right">{row.color}</TableCell>
                  <TableCell align="right">{row.pantone_value}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default memo(TableView);
