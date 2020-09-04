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
import "leaflet/dist/leaflet.css";
import Graph from "./components/Graph";
import Map from "./components/Map";
function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("all");
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 0, lon: 0 });
    const [zoom, setZoom] = useState(2);
    const [caseType, setCaseType] = useState("cases");

    useEffect(() => {
        const switchCountry = async () => {
            await fetch(`${baseUrl}/countries`)
                .then((res) => res.json())
                .then((res) => {
                    const countries = res.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                        center: {
                            lat: country.countryInfo.lat,
                            lng: country.countryInfo.long,
                        },
                        cases: country.cases,
                        deaths: country.deaths,
                        recovered: country.recovered,
                        flag: country.countryInfo.flag,
                    }));
                    setTableData(res);
                    setCountries(countries);
                });
        };
        switchCountry();
        if (country === "all" || country === undefined) {
            setMapCenter({ lat: 35, lng: 35 });
            setZoom(1.5);
        } else {
            const countryCoordinate = countries.find(
                (data) => data.value === country
            );
            console.log({ countryCoordinate });
            setMapCenter(countryCoordinate.center);
            setZoom(4);
        }
    }, [country]);
    const handleSwitch = async (event) => {
        setCountry(!event.target.value ? "all" : event.target.value);
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
                <InfoBoxConatiner
                    country={country}
                    setCaseType={setCaseType}
                />
                <Map
                    countries={countries}
                    center={mapCenter}
                    zoom={zoom}
                    caseType={caseType}
                />
            </div>
            <div className="app__right">
                <Card>
                    <CardContent>
                        <h2>Live country Data</h2>
                        <Table countries={tableData} />
                        <h2>Graph Data</h2>
                        <Graph country={country} caseType={caseType} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default App;
