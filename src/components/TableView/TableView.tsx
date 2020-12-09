import React, { FC, memo } from "react";
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
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
  data: Data[];
}

const TableView: FC<TableViewProps> = ({ data = [], tableProps }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
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
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.pantone_value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(TableView);
