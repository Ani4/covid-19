import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
let casesTypeColors = {
    cases: {
        hex: "#cc1034",
        multipler: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multipler: 1200,
    },
    deaths: {
        hex: "#fb443",
        multipler: 2000,
    },
};
export const showDataOnMap = (data, caseType = "cases") => {
    return data.map((country) => (
        <Circle
            center={[country.center.lat, country.center.lng]}
            fillOpacity={0.4}
            color={casesTypeColors[caseType].hex}
            fillColor={casesTypeColors[caseType].hex}
            radius={
                Math.sqrt(country[caseType]) *
                casesTypeColors[caseType].multipler
            }
        >
            <Popup>
                <div className="popup__container">
                    <div
                        className="popup__flag"
                        style={{ backgroundImage: `url(${country.flag})` }}
                    ></div>
                    <div className="popup__name">
                        <strong>{country.name}</strong>
                    </div>
                    <div className="popup__confirmed">
                        Confirmed: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="popup__recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="popup__deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));
};
