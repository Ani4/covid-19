import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Toolbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const Confirmed = styled(Paper)({
  background: "linear-gradient(to right, #2980b9, #6dd5fa)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #6dd5fa",
  color: "white",
  height: "auto",
  padding: "30px 30px",
  margin: "2rem"
});
const Recovered = styled(Paper)({
  background: "linear-gradient(to right, #56ab2f, #a8e063)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #a8e063",
  color: "white",
  height: "auto",
  padding: "30px 30px",
  margin: "2rem"
});
const Deaths = styled(Paper)({
  background: "linear-gradient(to right, #cb2d3e, #ef473a)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #e3828b",
  color: "white",
  height: "auto",
  padding: "30px 30px",
  margin: "2rem"
});
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

  useEffect(() => {
    axios.get(url).then(result => setData(result.data));
  }, [url]);
  useEffect(() => {
    axios.get(countriesUrl).then(result => {
      let data = Object.entries(result.data.countries);

      setCountry(data);
      setDefaultCountry(data.filter(item => trendCountry.includes(item[0])));
    });
  }, []);

  const handleChange = e => {
    console.log(e);
    setUrl(`https://covid19.mathdro.id/api/countries/${e}`);
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
                  country.map((item, i) => (
                    <MenuItem value={item[1]} key={i}>
                      {item[0]}
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
        {defaultCountry ? (
          defaultCountry.map((item, i) => (
            <Button
              variant="outlined"
              style={{ margin: "5px" }}
              onClick={() => handleChange(item[1])}
            >
              {item[0]}
            </Button>
          ))
        ) : (
          <></>
        )}
      </MyGrid>

      <MyGrid>
        <Confirmed
          elevation={3}
          children={
            !data ? (
              <LinearProgress />
            ) : (
              <div className="confirmed">
                <h2>CONFIRMED : </h2>
                <h3>{data.confirmed.value}</h3>
              </div>
            )
          }
        />
        <Recovered
          elevation={3}
          children={
            !data ? (
              <LinearProgress />
            ) : (
              <div className="recovered">
                <h2>RECOVERED : </h2>
                <h3>{data.recovered.value}</h3>
              </div>
            )
          }
        />
        <Deaths
          elevation={3}
          children={
            !data ? (
              <LinearProgress />
            ) : (
              <div className="deaths">
                <h2>DEATHS : </h2>
                <h3>{data.deaths.value}</h3>
              </div>
            )
          }
        />
      </MyGrid>
    </>
  );
};
