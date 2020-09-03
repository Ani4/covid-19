import React, { useState, useEffect } from "react";
import { baseUrl } from "./config";
import {
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core";
import Table from "./components/Table";
import InfoBoxConatiner from "./components/InfoBoxContainer";
import "./App.css";
import Graph from "./components/Graph";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("all");
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const switchCountry = async () => {
            await fetch(`${baseUrl}/countries`)
                .then((res) => res.json())
                .then((res) => {
                    const countries = res.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    setTableData(res);
                    setCountries(countries);
                });
        };
        switchCountry();
    }, [country]);
    const handleSwitch = async (event) => {
        setCountry(event.target.value);
    };

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 InfoTracker</h1>
                    <FormControl className="app__dropdown">
                        <Select
                            value={country}
                            variant="outlined"
                            onClick={handleSwitch}
                        >
                            <MenuItem value="all">WorldWide</MenuItem>
                            {countries.map((country) => (
                                <MenuItem
                                    value={country.value}
                                    key={country.value}
                                >
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <InfoBoxConatiner country={country} />
                <div className="map">IM THE MAP</div>
            </div>
            <Card className="app__right">
                <CardContent>
                    <h2>Live country Data</h2>
                    <Table countries={tableData} />
                    <h2>Graph Data</h2>
                    <Graph country={country} />
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
