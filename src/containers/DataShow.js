import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Paper, styled, Grid, LinearProgress } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const Confirmed = styled(Paper)({
  background: "linear-gradient(to right, #2980b9, #6dd5fa)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #6dd5fa",
  color: "white",
  height: window.innerWidth > "400" ? "80px" : "auto",

  padding: "20px",
  margin: "1rem"
});
const Recovered = styled(Paper)({
  background: "linear-gradient(to right, #56ab2f, #a8e063)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #a8e063",
  color: "white",
  height: window.innerWidth > "400" ? "80px" : "auto",

  padding: "20px",
  margin: "1rem"
});
const Deaths = styled(Paper)({
  background: "linear-gradient(to right, #cb2d3e, #ef473a)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #e3828b",
  color: "white",
  height: window.innerWidth > "400" ? "80px" : "auto",

  padding: "20px",
  margin: "1rem"
});
const CardOutter = styled(Grid)({
  spacing: 1,
  xs: 2,
  direction: "row",
  justifyContent: "center",
  alignItem: "center"
});
const textCenter = {
  textAlign: "center"
};
export default props => {
  return (
    <CardOutter container>
      <Grid item xs={12} sm={4}>
        <Confirmed
          elevation={3}
          children={
            !props.data ? (
              <LinearProgress />
            ) : (
              <div className="confirmed">
                <h2 style={textCenter}>
                  CONFIRMED : <span>{props.data.confirmed.value}</span>
                </h2>
              </div>
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Recovered
          elevation={3}
          children={
            !props.data ? (
              <LinearProgress />
            ) : (
              <div className="recovered">
                <h2 style={textCenter}>
                  RECOVERED : <span>{props.data.recovered.value}</span>
                </h2>
              </div>
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Deaths
          elevation={3}
          children={
            !props.data ? (
              <LinearProgress />
            ) : (
              <div className="deaths">
                <h2 style={textCenter}>
                  DEATHS : <span>{props.data.deaths.value}</span>
                </h2>
              </div>
            )
          }
        />
      </Grid>
    </CardOutter>
  );
};
