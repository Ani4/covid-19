import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { baseUrl } from "../config";
import "../styles/infobox.css";

export default function InfoBoxContainer({ country, setCaseType }) {
    const [active, setActive] = useState(0);
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
                title="Confirmed Cases"
                cases={casesDetails.todayCases}
                total={casesDetails.cases}
                type="cases"
                setCaseType={setCaseType}
                activeNo={0}
                setActive={setActive}
                activeStyle={active === 0 ? "infoBox--selected" : ""}
            />
            <InfoBox
                title="Recovered Cases"
                cases={casesDetails.todayRecovered}
                total={casesDetails.recovered}
                type="recovered"
                setCaseType={setCaseType}
                activeNo={1}
                setActive={setActive}
                activeStyle={active === 1 ? "infoBox--selected" : ""}
            />
            <InfoBox
                title="Deaths Cases"
                cases={casesDetails.todayDeaths}
                total={casesDetails.deaths}
                type="deaths"
                setCaseType={setCaseType}
                activeNo={2}
                setActive={setActive}
                activeStyle={active === 2 ? "infoBox--selected" : ""}
            />
        </div>
    );
}

function InfoBox({
    title,
    cases,
    total,
    type,
    setCaseType,
    setActive,
    activeStyle,
    activeNo,
}) {
    return (
        <Card
            className={`infoBox infoBox__${type} ${activeStyle}`}
            style={{ borderTop: "10px" }}
            onClick={() => {
                setCaseType(type);
                setActive(activeNo);
            }}
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox__header__${type}`}>
                    {cases > 0 ? "+" : ""}
                    {cases}
                </h2>
                <Typography color="textSecondary">{total}</Typography>
            </CardContent>
        </Card>
    );
}
