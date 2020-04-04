import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Skeleton } from "@material-ui/lab";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
const columns = ["DATE", "CONFIRMED", "RECOVERD", "DEATH"];
export default (props) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState(
    props.selectedData[props.selectCon]
  );
  useEffect(() => {
    setTimeout(() => {
      setTableData(props.selectedData[props.selectCon].reverse());
    }, 2000);
    console.log(
      "Table data",
      tableData.sort((a, b) => new Date(a.date) < new Date(b.date))
    );
  }, [props.selectCon]);

  //   console.log(props.selectedData[props.selectCon]);
  console.log("select Countries", props.selectCon);
  return tableData ? (
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
            {tableData.map((row) => {
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
    </Paper>
  ) : (
    <Skeleton variant="rect" width="100%" height="60%" />
  );
};
