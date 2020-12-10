import React, { FC, memo, useState } from "react";
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FilterListIcon from "@material-ui/icons/FilterList";
import { InputAdornment, TextField } from "@material-ui/core";
import { useStyles } from "./TableView.styles";
import TableToolbar from "./TableToolbar";

interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface TableViewProps {
  tableProps?: TableProps;
  rows: Data[];
  withPagination?: boolean;
  onPaginationChange?: (newPage: number) => void;
  rowsPerPage?: number;
  count?: number;
  withSorting?: boolean;
  title?: string;
  withFilter?: boolean;
  withCheckbox?: boolean;
  withSearch?: boolean;
}

// order function starts here
const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = <T,>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};
// order function ends here

// header starts here
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "year", numeric: true, disablePadding: false, label: "Year" },
  { id: "color", numeric: false, disablePadding: false, label: "color" },
  {
    id: "pantone_value",
    numeric: false,
    disablePadding: false,
    label: "Pantone Value",
  },
];

interface TableHeadViewProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  withSorting: boolean;
  withCheckbox: boolean;
  withFilter: boolean;
}

const TableHeadView: FC<TableHeadViewProps> = ({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  withSorting,
  withCheckbox,
  withFilter,
}) => {
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {withCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
        )}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {withSorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
      {withFilter && (
        <TableRow>
          {withCheckbox && <TableCell padding="checkbox" />}
          {headCells.map(headCell => (
            <TableCell key={headCell.id}>
              <TextField
                className={classes.margin}
                id={headCell.id}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableHead>
  );
};
// header ends here

const TableView: FC<TableViewProps> = ({
  rows = [],
  tableProps,
  withPagination = false,
  onPaginationChange = () => {
    return null;
  },
  rowsPerPage = 0,
  count = 0,
  withSorting = false,
  title = "Sample Title",
  withFilter = false,
  withCheckbox = false,
  withSearch = false,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    onPaginationChange(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
          numSelected={selected.length}
          title={title}
          withSearch={withSearch}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="simple table"
            {...tableProps}
          >
            <TableHeadView
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              withSorting={withSorting}
              withCheckbox={withCheckbox}
              withFilter={withFilter}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                // .slice(
                //   withPagination ? page * rowsPerPage : 0,
                //   withPagination
                //     ? page * rowsPerPage + rowsPerPage
                //     : rows.length
                // )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {withCheckbox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                      )}
                      {Object.keys(row).map(key => (
                        <TableCell key={key} align="center">
                          {row[key as keyof Data]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {/* {withPagination && emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
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
            // onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
};

export default memo(TableView);
