import React, { useEffect, useState } from "react";
import { baseUrl } from "../config";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
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
                    format: "MM/DD/YY",
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

// https://disease.sh/v3/covid-19/historical/in?lastdays=300
export default function Graph({ country }) {
    const [countryData, setCountryData] = useState({});
    const [days, setDays] = useState(360);
    const [data, setData] = useState();

    const buildChartData = (data, caseType = "cases") => {
        const chartData = [];
        let lastDataPoint;

        for (const date in data[caseType]) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data["cases"][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data["cases"][date];
        }
        return chartData;
    };

    useEffect(() => {
        const fetchTimeline = async () => {
            let chartData = [];

            const data = await fetch(
                `${baseUrl}/historical/${
                    !country ? "all" : country
                }?lastdays=${days}`
            ).then((res) => res.json());
            if (country === "all" || country === undefined) {
                console.log(country, data);
                chartData = buildChartData(data);
            } else {
                console.log(country, data.timeline);

                chartData = buildChartData(data.timeline);
            }
            setData(chartData);
        };
        fetchTimeline();
    }, [country]);

    return (
        <div>
            <h1>im graph</h1>
            {data && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    );
}
