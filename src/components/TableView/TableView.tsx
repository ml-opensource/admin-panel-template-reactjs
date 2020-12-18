import React, { FC, useState, memo } from "react";
// import { useLocation, useHistory } from "react-router-dom";
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from "@material-ui/core";
// import qs from "query-string";
import Avatar from "@material-ui/core/Avatar";
import { useStyles } from "./TableView.styles";
import { Rows } from "./TableView.types.example";
import { ColumnsOptionProps } from "./TableView.types";
import TableToolbar from "./TableToolbar";

interface TableViewProps {
  title?: string;
  columns: (string | ColumnsOptionProps)[];
  rows: Rows[];
  tableProps?: TableProps;
  // paginationProps starts here
  withPagination?: boolean;
  onPaginationChange?: (newPage: number) => void;
  rowsPerPage?: number;
  count?: number;
  // paginationProps ends here
  withSearch?: boolean;
}

const TableView: FC<TableViewProps> = ({
  title = "Table Example",
  columns,
  rows,
  tableProps,
  withPagination = false,
  onPaginationChange = () => {
    return null;
  },
  rowsPerPage = 0,
  count = 0,
  withSearch = false,
}) => {
  const [page, setPage] = useState(0);
  // const [selected, setSelected] = useState<string[]>([]);

  // const location = useLocation();
  // const history = useHistory();

  // const handleTableChange = (newPage: number) => {
  //   const currentSearch = qs.parse(location.search);
  //   const values = {
  //     ...currentSearch,
  //     page: newPage + 1,
  //     orderBy: "name-asc",
  //     name: "a",
  //     id: "0",
  //   };

  //   history.push({
  //     pathname: location.pathname,
  //     search: qs.stringify(values, { arrayFormat: "comma" }),
  //   });
  // };

  const classes = useStyles();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // handleTableChange(newPage);
    onPaginationChange(newPage);
  };

  return (
    <Paper className={classes.paper}>
      <TableToolbar
        title={title}
        // numSelected={selected.length}
        numSelected={0}
        withSearch={withSearch}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-label="simple table"
          {...tableProps}
        >
          <TableHead>
            <TableRow>
              {columns.map(column =>
                typeof column === "string" ? (
                  <TableCell align="left" key={column}>
                    {column}
                  </TableCell>
                ) : (
                  <TableCell align="left" key={column.id}>
                    {column.label}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {columns.map(column =>
                  typeof column === "string" ? (
                    <TableCell key={column} align="left">
                      {row[column as keyof Rows]}
                    </TableCell>
                  ) : (
                    <TableCell key={column.id} align="left">
                      {column.isImage ? (
                        <Avatar
                          src={`${row[column.id as keyof Rows]}`}
                          alt={column.label}
                        />
                      ) : (
                        row[column.id as keyof Rows]
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {withPagination && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      )}
    </Paper>
  );
};

export default memo(TableView);
