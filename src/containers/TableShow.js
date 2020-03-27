import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Paper,
  Button,
  styled,
  Grid,
  LinearProgress,
  InputLabel,
  Select,
  AppBar,
  MenuItem,
  ButtonGroup,
  Typography,
  Toolbar,
  Table,
  TablePagination,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  CircularProgress
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});
const columns = ["DATE", "CONFIRMED", "RECOVERD", "DEATH"];
export default props => {
  const classes = useStyles();
  const [tableData, setTableData] = useState(
    props.selectedData[props.selectCon]
  );
  useEffect(() => {
    setTableData(props.selectedData[props.selectCon].reverse());
    console.log(
      "Table data",
      tableData.sort((a, b) => new Date(a.date) < new Date(b.date))
    );
  }, [props.selectCon]);

  //   console.log(props.selectedData[props.selectCon]);
  console.log("select Countries", props.selectCon);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={"center"}
                  style={{ minWidth: "auto" }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                  <TableCell>
                    {moment(new Date(row["date"])).format("ll")}
                  </TableCell>
                  <TableCell>{row["confirmed"]}</TableCell>
                  <TableCell>{row["recovered"]}</TableCell>
                  <TableCell>{row["deaths"]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};
