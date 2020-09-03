import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { baseUrl } from "../config";

export default function InfoBoxContainer({ country }) {
    const [casesDetails, setCasesDetails] = useState({});
    useEffect(() => {
        const fetchCountryDetails = async () => {
            let res;
            console.log(country);
            if (country === "all")
                res = await fetch(`${baseUrl}/${country}`).then((res) =>
                    res.json()
                );
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
                cases={casesDetails.active}
                total={casesDetails.cases}
            />
            <InfoBox
                title="Recovered"
                cases={casesDetails.recovered}
                total={casesDetails.recovered}
            />
            <InfoBox
                title="Deaths"
                cases={casesDetails.deaths}
                total={casesDetails.deaths}
            />
        </div>
    );
}

function InfoBox({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    );
}
