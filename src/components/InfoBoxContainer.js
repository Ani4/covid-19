import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { baseUrl } from "../config";
import "../styles/infobox.css";

export default function InfoBoxContainer({ country }) {
    const [casesDetails, setCasesDetails] = useState({});
    useEffect(() => {
        const fetchCountryDetails = async () => {
            let res;
            console.log(country);
            if (country === "all")
                res = await fetch(
                    `${baseUrl}/${!country ? "all" : country}`
                ).then((res) => res.json());
            else {
                res = await fetch(
                    `${baseUrl}/countries/${country}`
                ).then((res) => res.json());
            }
            console.log(res);
            setCasesDetails(res);
        };
        fetchCountryDetails();
    }, [country]);

    return (
        <div className="infoBox__stats">
            <InfoBox
                title="Coronavirus Cases"
                cases={casesDetails.todayCases}
                total={casesDetails.cases}
            />
            <InfoBox
                title="Recovered"
                cases={casesDetails.todayRecovered}
                total={casesDetails.recovered}
            />
            <InfoBox
                title="Deaths"
                cases={casesDetails.todayDeaths}
                total={casesDetails.deaths}
            />
        </div>
    );
}

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">
                    {cases > 0 ? "+" : ""}
                    {cases}
                </h2>
                <Typography color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    );
}
