import React, { useEffect, useState } from "react";
import { baseUrl } from "../config";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "../util";
import { FormControl, Select, MenuItem } from "@material-ui/core";
const options = {
    height: 150,
    width: 200,
    padding: 10,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },

    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipsItem, data) {
                return numeral(tooltipsItem.value).format("+0,0");
            },
        },
    },

    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    parser: false,
                    tooltipsFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, caseType) => {
    const chartData = [];
    let lastDataPoint;

    for (const date in data[caseType]) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[caseType][date];
    }
    return chartData;
};

// https://disease.sh/v3/covid-19/historical/in?lastdays=300

export default function Graph({ country, caseType }) {
    const [countryData, setCountryData] = useState({});
    const [days, setDays] = useState(30);

    const [data, setData] = useState();

    const fetchTimeline = async () => {
        let chartData = [];

        const data = await fetch(
            `${baseUrl}/historical/${
                !country ? "all" : country
            }?lastdays=${days}`
        ).then((res) => res.json());
        setCountryData(data);
        if (country === "all" || country === undefined) {
            chartData = buildChartData(data, caseType);
        } else {
            chartData = buildChartData(data.timeline, caseType);
        }
        setData(chartData);
    };

    useEffect(() => {
        fetchTimeline();
    }, [country, caseType, days]);

    return (
        <>
            <div className="graph__header">
                <h2>
                    {country && country === "all"
                        ? "WorldWide"
                        : countryData.country}{" "}
                </h2>
                <FormControl>
                    <Select
                        value={days}
                        variant="standard"
                        onClick={(e) => {
                            setDays(e.target.value);
                        }}
                    >
                        <MenuItem value={"30"}>1 Month</MenuItem>
                        <MenuItem value={"60"}>2 Month</MenuItem>
                        <MenuItem value={"90"}>3 Month</MenuItem>
                        <MenuItem value={"120"}>4 Month</MenuItem>
                        <MenuItem value={"150"}>5 Month</MenuItem>
                        <MenuItem value={"180"}>6 Month</MenuItem>
                        <MenuItem value={"360"}>1 Year</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                {data && (
                    <Line
                        options={options}
                        data={{
                            datasets: [
                                {
                                    backgroundColor:
                                        casesTypeColors[caseType].rgba,
                                    borderColor: casesTypeColors[caseType].hex,
                                    data: data,
                                },
                            ],
                        }}
                    />
                )}
            </div>
        </>
    );
}
