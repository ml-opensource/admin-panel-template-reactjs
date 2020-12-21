import React, { FC, useState, memo } from "react";
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
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
  const [selected, setSelected] = useState<string[]>([]);

  const classes = useStyles();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    onPaginationChange(newPage);
  };

  return (
    <Paper className={classes.paper}>
      <TableToolbar
        title={title}
        numSelected={selected.length}
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
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
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
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.email);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={event => handleClick(event, row.email)}
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </TableCell>
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
              );
            })}
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
