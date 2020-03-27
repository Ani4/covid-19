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
  CircularProgress
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import DataShow from "./DataShow";
import TableShow from "./TableShow";

const MyGrid = styled(Grid)({
  margin: "3rem",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap"
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
const trendCountry = [
  "India",
  "Pakistan",
  "China",
  "Afghanistan",
  "US",
  "Italy",
  "Iran",
  "South Korea",
  "France",
  "Germany",
  "Malaysia",
  "Spain",
  "Thailand",
  "UK",
  "Singapore",
  "Philippines",
  "United Kingdom"
];
export default props => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [country, setCountry] = useState(null);
  const [click, setClick] = useState(false);
  const [selectedCon, setSelectedCon] = useState("");
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [url, setUrl] = useState("https://covid19.mathdro.id/api");
  let countriesUrl = "https://covid19.mathdro.id/api/countries";
  const [countryName, setCountryName] = useState("WORLD");

  useEffect(() => {
    axios.get(url).then(result => {
      setData(result.data);
      console.log(result.data);
    });
  }, [url]);
  useEffect(() => {
    axios.get(countriesUrl).then(result => {
      let data = result.data.countries;

      setCountry(data);
      setDefaultCountry(data.filter(item => trendCountry.includes(item.name)));
      console.log(data.filter(item => trendCountry.includes(item.name)));
    });
  }, [setCountry]);

  const [fullData, setFullData] = useState(null);
  useEffect(() => {
    axios
      .get(`https://pomber.github.io/covid19/timeseries.json`)
      .then(result => setFullData(result.data));
  }, []);

  const handleChange = e => {
    e = JSON.parse(e);
    console.log(e.name);
    setCountryName(e.name);
    setUrl(`https://covid19.mathdro.id/api/countries/${e.iso3}`);
    setData(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h4" color="inherit">
            COVID19
          </Typography>
          {click ? (
            <div>
              <InputLabel id="label" style={{ width: "15vw", color: "#ffe" }}>
                Country
              </InputLabel>
              <Select
                style={{ width: "15vw", color: "#ffe" }}
                labelId="label"
                id="select"
                defaultValue=""
                onChange={e => handleChange(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {country ? (
                  country.map(item => (
                    <MenuItem value={JSON.stringify(item)} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setClick(true)}
            >
              More Country
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <MyGrid>
        {data ? (
          <>
            {" "}
            <h2
              style={{ color: "#3f51b5" }}
            >{`${countryName.toUpperCase()}`}</h2>
            <p>{`Last Update: ${moment(new Date(data.lastUpdate)).format(
              "llll"
            )}`}</p>
          </>
        ) : (
          <CircularProgress />
        )}

        {/* DATA CARD  */}
        <DataShow data={data} />

        {/* TABLE RENDER */}
        {countryName !== "WORLD" ? (
          <TableShow selectedData={fullData} selectCon={countryName} />
        ) : null}
      </MyGrid>
      <MyGrid>
        {defaultCountry ? (
          defaultCountry.map((item, i) => (
            <Button
              key={i}
              variant="outlined"
              mn
              style={{ margin: "5px" }}
              onClick={() => handleChange(JSON.stringify(item))}
            >
              {item.name.toUpperCase()}
            </Button>
          ))
        ) : (
          <></>
        )}
      </MyGrid>
    </>
  );
};
